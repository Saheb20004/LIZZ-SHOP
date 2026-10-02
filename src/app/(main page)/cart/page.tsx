'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft } from 'react-icons/fa';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const shipping = cartTotal > 999 ? 0 : cartTotal > 0 ? 99 : 0;
  const tax = cartTotal * 0.10;
  const total = cartTotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="container mx-auto px-4 lg:px-10 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/content" className="text-gray-500 hover:text-black dark:hover:text-white transition-colors">
            <FaArrowLeft />
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Shopping Cart</h1>
          <span className="text-gray-400 text-lg">({cartItems.length} items)</span>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-7xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Your cart is empty</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">Looks like you haven&apos;t added anything yet.</p>
            <Link href="/content" className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.id}`} className="font-semibold text-gray-900 dark:text-white hover:underline truncate block">
                      {item.name}
                    </Link>
                    <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">₹{item.price}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                          <FaMinus size={12} />
                        </button>
                        <span className="px-3 py-1.5 font-semibold text-sm text-gray-900 dark:text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                          <FaPlus size={12} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors p-1.5">
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-gray-900 dark:text-white">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm h-fit sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Order Summary</h2>
              <div className="space-y-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span><span className="font-medium text-gray-900 dark:text-white">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Tax (10%)</span><span className="font-medium text-gray-900 dark:text-white">₹{tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white mt-4 mb-6">
                <span>Total</span><span>₹{total.toFixed(2)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-green-600 mb-4 text-center">Add ₹{(999 - cartTotal).toFixed(0)} more for FREE shipping!</p>
              )}
              <Link href="/checkout" className="block w-full bg-black dark:bg-white text-white dark:text-black text-center py-4 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                Proceed to Checkout
              </Link>
              <Link href="/content" className="block text-center text-sm text-gray-500 dark:text-gray-400 mt-3 hover:text-black dark:hover:text-white transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
