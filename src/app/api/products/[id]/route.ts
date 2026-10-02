import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models/Product';

export const runtime = 'nodejs';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const product = await Product.findOne({ $or: [{ legacy_id: id }, ...( /^[a-f\d]{24}$/i.test(id) ? [{ _id: id }] : [])] }).lean();
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    const data = product as unknown as Record<string, unknown>;
    return NextResponse.json({ ...data, id: String(data.legacy_id ?? data._id), _id: undefined, legacy_id: undefined, __v: undefined });
  } catch (error) {
    console.error('Product request failed:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Unable to load product' }, { status: 503 });
  }
}
