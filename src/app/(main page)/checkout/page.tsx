'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useCart } from '@/context/CartContext';
import { FaLock, FaCreditCard } from 'react-icons/fa';
import { toast } from 'sonner';
import Link from 'next/link';
import { ShippingAddress } from '@/types';

const INITIAL_ADDRESS: ShippingAddress = {
  full_name: '', address: '', city: '', state: '', zip: '', country: 'India', phone: '',
};

export default function CheckoutPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(INITIAL_ADDRESS);
  const [loading, setLoading] = useState(false);

  const shipping = cartTotal > 999 ? 0 : 99;
  const tax = Math.round(cartTotal * 0.10);
  const total = cartTotal + shipping + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) { toast.error('Please login to checkout'); router.push('/login'); return; }
    if (cartItems.length === 0) { toast.error('Your cart is empty'); return; }

    setLoading(true);
    try {
      // 1. Save order to MongoDB first
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subtotal: cartTotal,
          shipping_cost: shipping,
          tax,
          total,
          shipping_address: shippingAddress,
          stripe_payment_intent: 'pending',
          items: cartItems.map((item) => ({
            product_id: item.id,
            product_name: item.name,
            product_image: item.image,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });
      if (!orderRes.ok) throw new Error('Failed to create order');

      // 2. Create Stripe Checkout Session
      const sessionRes = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems, shippingAddress, subtotal: cartTotal, shipping, tax, total }),
      });
      const { url, error } = await sessionRes.json();
      if (error) throw new Error(error);

      // 3. Clear cart and redirect to Stripe
      clearCart();
      window.location.href = url;
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 pt-20">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
        <Link href="/content" className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-xl font-semibold">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="container mx-auto px-4 lg:px-10 py-10">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Checkout</h1>
        <form onSubmit={handleCheckout}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'full_name', placeholder: 'Full Name', colSpan: true },
                    { name: 'phone', placeholder: 'Phone Number', colSpan: true },
                    { name: 'address', placeholder: 'Street Address', colSpan: true },
                    { name: 'city', placeholder: 'City' },
                    { name: 'state', placeholder: 'State' },
                    { name: 'zip', placeholder: 'PIN Code' },
                  ].map(({ name, placeholder, colSpan }) => (
                    <input
                      key={name}
                      type="text"
                      name={name}
                      placeholder={placeholder}
                      value={shippingAddress[name as keyof ShippingAddress]}
                      onChange={handleChange}
                      required
                      className={`${colSpan ? 'md:col-span-2' : ''} w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white`}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <FaCreditCard /> Payment
                </h2>
                <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <FaLock className="text-blue-600 shrink-0" />
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    You&apos;ll be redirected to Stripe&apos;s secure payment page. Use test card <strong>4242 4242 4242 4242</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm h-fit sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400 truncate mr-2">{item.name} × {item.quantity}</span>
                    <span className="font-medium text-gray-900 dark:text-white shrink-0">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 py-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span><span className="text-gray-900 dark:text-white">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : 'text-gray-900 dark:text-white'}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Tax (10%)</span><span className="text-gray-900 dark:text-white">₹{tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-xl text-gray-900 dark:text-white pt-4 border-t border-gray-100 dark:border-gray-800 mb-6">
                <span>Total</span><span>₹{total.toFixed(2)}</span>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                <FaLock size={14} />
                {loading ? 'Redirecting to Stripe...' : `Pay ₹${total.toFixed(2)}`}
              </button>
              <p className="text-xs text-center text-gray-400 mt-3">
                By placing your order you agree to our{' '}
                <Link href="/terms" className="underline">Terms</Link> &{' '}
                <Link href="/privacy" className="underline">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
