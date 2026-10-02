'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { Order } from '@/types';
import { toast } from 'sonner';
import { FaBoxOpen, FaCheckCircle } from 'react-icons/fa';

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  processing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  shipped: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  delivered: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function OrdersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoaded, isSignedIn } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      toast.success('Payment successful! Your order has been placed. 🎉');
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) { router.push('/login'); return; }

    fetch('/api/orders')
      .then((r) => r.json())
      .then((data) => { setOrders(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [isLoaded, isSignedIn]);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="w-10 h-10 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="container mx-auto px-4 lg:px-10 py-10">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-24">
            <FaBoxOpen className="mx-auto text-gray-300 dark:text-gray-700 mb-6" size={64} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No orders yet</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">Start shopping to see your orders here.</p>
            <Link href="/content" className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-4 p-5 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500" size={18} />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Order ID</p>
                      <p className="font-bold text-gray-900 dark:text-white text-sm">#{order.id.slice(-8).toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
                    <p className="font-bold text-gray-900 dark:text-white">₹{order.total.toFixed(2)}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide ${STATUS_STYLES[order.status]}`}>
                    {order.status}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex flex-wrap gap-4">
                    {(order.items || []).map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                          <Image src={item.product_image} alt={item.product_name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.product_name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity} · ₹{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Delivered to</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {order.shipping_address.full_name}, {order.shipping_address.address}, {order.shipping_address.city} - {order.shipping_address.zip}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
