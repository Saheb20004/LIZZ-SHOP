import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { cartItems, shippingAddress, subtotal, shipping, tax, total } = await req.json();

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const lineItems = cartItems.map((item: { name: string; image: string; price: number; quantity: number }) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
          images: [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: 'inr',
          product_data: { name: 'Shipping', images: [] },
          unit_amount: Math.round(shipping * 100),
        },
        quantity: 1,
      });
    }

    if (tax > 0) {
      lineItems.push({
        price_data: {
          currency: 'inr',
          product_data: { name: 'Tax (10%)', images: [] },
          unit_amount: Math.round(tax * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
      metadata: {
        shipping_address: JSON.stringify(shippingAddress),
        subtotal: String(subtotal),
        shipping_cost: String(shipping),
        tax: String(tax),
        total: String(total),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Stripe session error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
