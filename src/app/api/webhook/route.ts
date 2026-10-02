import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { connectDB } from '@/lib/mongodb';
import { Order } from '@/models/Order';
import { sendOrderConfirmationEmail } from '@/lib/email/order-confirmation';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET === 'whsec_your_webhook_secret') {
    return NextResponse.json({ received: true });
  }

  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    await connectDB();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const order = await (Order.findOneAndUpdate as any)(
      { stripe_payment_intent: session.payment_intent },
      { status: 'processing' },
      { new: true }
    ).lean();

    if (order && session.customer_details?.email) {
      await sendOrderConfirmationEmail(
        { ...order, id: order._id.toString(), created_at: order.createdAt },
        session.customer_details.email
      );
    }
  }

  return NextResponse.json({ received: true });
}
