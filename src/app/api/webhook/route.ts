import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { connectDB } from '@/lib/mongodb';
import { Order } from '@/models/Order';
import { sendOrderConfirmationEmail } from '@/lib/email/order-confirmation';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) return NextResponse.json({ error: 'Webhook is not configured' }, { status: 500 });

  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  if (!sig) return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status !== 'paid' || !session.metadata?.order_id || !session.payment_intent) {
      return NextResponse.json({ received: true });
    }
    await connectDB();
    const order = await Order.findOneAndUpdate(
      { _id: session.metadata.order_id, user_id: session.metadata.user_id, status: 'pending' },
      { $set: { status: 'processing', stripe_payment_intent: String(session.payment_intent) } },
      { new: true }
    ).lean();

    if (order && session.customer_details?.email) {
      try {
        await sendOrderConfirmationEmail(
          { ...order, id: order._id.toString(), created_at: order.createdAt },
          session.customer_details.email
        );
      } catch (error) {
        console.error('Order confirmation email failed:', error instanceof Error ? error.message : 'Unknown error');
      }
    }
  }

  return NextResponse.json({ received: true });
}
