import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/mongodb';
import { Order } from '@/models/Order';
import { sendOrderConfirmationEmail } from '@/lib/email/order-confirmation';

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const orders = await (Order.find as any)({ user_id: userId }).sort({ createdAt: -1 }).lean();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normalized = orders.map((o: any) => ({
    ...o,
    id: o._id.toString(),
    created_at: o.createdAt,
    items: (o.items || []).map((i: any) => ({ ...i, id: i._id?.toString() })),
  }));

  return NextResponse.json(normalized);
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  const body = await req.json();

  const order = await Order.create({ ...body, user_id: userId });
  const orderObj = {
    ...order.toObject(),
    id: order._id.toString(),
    created_at: order.createdAt,
  };

  // Send confirmation email directly
  try {
    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress;

    if (email) {
      // In dev/test: Resend only allows sending to your own verified email
      // unless you have a verified domain. Use onboarding@resend.dev as from.
      await sendOrderConfirmationEmail(orderObj, email);
    }
  } catch (emailErr) {
    console.error('Email send error:', emailErr);
    // Don't fail the order if email fails
  }

  return NextResponse.json(orderObj);
}
