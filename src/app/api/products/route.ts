import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models/Product';

export const runtime = 'nodejs';

function serialize(product: Record<string, unknown>) {
  return {
    ...product,
    id: String(product.legacy_id ?? product._id),
    price: Number(product.price),
    original_price: Number(product.original_price),
    _id: undefined,
    legacy_id: undefined,
    __v: undefined,
  };
}

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(products.map((product) => serialize(product as Record<string, unknown>)));
  } catch (error) {
    console.error('Product list request failed:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Unable to load products' }, { status: 503 });
  }
}
