import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/mongodb';
import { Order } from '@/models/Order';

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  const orders = await Order.find({ user_id: userId }).sort({ createdAt: -1 }).limit(50).lean();

  const normalized = orders.map((o) => ({
    ...o,
    id: o._id.toString(),
    created_at: o.createdAt,
    items: (o.items || []).map((i) => ({ ...i, id: i._id?.toString() })),
  }));

  return NextResponse.json(normalized);
}
