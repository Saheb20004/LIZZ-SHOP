import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { stripe } from '@/lib/stripe';
import { connectDB } from '@/lib/mongodb';
import { Order } from '@/models/Order';
import catalog from '@/data/products.json';

export const runtime = 'nodejs';

const MAX_ITEMS = 30;
const MAX_QUANTITY = 10;

type CartEntry = { id: string; quantity: number };
type Address = { full_name: string; address: string; city: string; state: string; zip: string; country: string; phone: string };

function isAddress(value: unknown): value is Address {
  if (!value || typeof value !== 'object') return false;
  const address = value as Record<string, unknown>;
  return ['full_name', 'address', 'city', 'state', 'zip', 'country', 'phone']
    .every((field) => typeof address[field] === 'string' && (address[field] as string).trim().length > 0 && (address[field] as string).length <= 250);
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { cartItems, shippingAddress }: { cartItems: CartEntry[]; shippingAddress: Address } = await req.json();
    if (!Array.isArray(cartItems) || cartItems.length === 0 || cartItems.length > MAX_ITEMS || !isAddress(shippingAddress)) {
      return NextResponse.json({ error: 'Invalid cart or shipping address' }, { status: 400 });
    }

    const productById = new Map(catalog.map((product) => [String(product.id), product]));
    const items = [];
    for (const entry of cartItems) {
      if (!entry || typeof entry.id !== 'string' || !Number.isInteger(entry.quantity) || entry.quantity < 1 || entry.quantity > MAX_QUANTITY) {
        return NextResponse.json({ error: 'Invalid cart item' }, { status: 400 });
      }
      const product = productById.get(entry.id);
      if (!product) return NextResponse.json({ error: 'A product in your cart is unavailable' }, { status: 400 });
      items.push({
        product_id: entry.id,
        product_name: product.name,
        product_image: product.image,
        quantity: entry.quantity,
        price: product.finalPrice,
      });
    }

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 999 ? 0 : 99;
    const tax = Math.round(subtotal * 0.1);
    const total = subtotal + shipping + tax;
    const user = await currentUser();
    const email = user?.emailAddresses.find((entry) => entry.id === user.primaryEmailAddressId)?.emailAddress;
    if (!email) return NextResponse.json({ error: 'Your account needs a verified email to place an order' }, { status: 400 });

    await connectDB();
    const order = await Order.create({
      user_id: userId,
      status: 'pending',
      subtotal,
      shipping_cost: shipping,
      tax,
      total,
      shipping_address: shippingAddress,
      items,
    });

    try {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
      if (!baseUrl) throw new Error('NEXT_PUBLIC_APP_URL is not configured');
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        customer_email: email,
        line_items: [
          ...items.map((item) => ({
            price_data: {
              currency: 'inr',
              product_data: { name: item.product_name },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
          })),
          ...(shipping ? [{ price_data: { currency: 'inr' as const, product_data: { name: 'Shipping' }, unit_amount: shipping * 100 }, quantity: 1 }] : []),
          ...(tax ? [{ price_data: { currency: 'inr' as const, product_data: { name: 'Tax' }, unit_amount: tax * 100 }, quantity: 1 }] : []),
        ],
        client_reference_id: order.id,
        metadata: { order_id: order.id, user_id: userId },
        payment_intent_data: { metadata: { order_id: order.id, user_id: userId } },
        success_url: `${baseUrl}/orders?success=true`,
        cancel_url: `${baseUrl}/checkout`,
      });
      if (!session.url) throw new Error('Stripe did not return a checkout URL');
      return NextResponse.json({ url: session.url, orderId: order.id });
    } catch (error) {
      await Order.deleteOne({ _id: order._id, status: 'pending' });
      throw error;
    }
  } catch (error) {
    console.error('Checkout session creation failed:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Unable to start checkout. Please try again.' }, { status: 500 });
  }
}
