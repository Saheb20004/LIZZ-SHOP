'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

export default function ContentPage() {
  const [visibleCount, setVisibleCount] = useState(10);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products').then((response) => response.ok ? response.json() : []).then(setProducts).catch(() => setProducts([]));
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen px-4 lg:px-10 pt-24 pb-16">
      <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-2">All Products</h1>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-10">Shop our latest collection.</p>

      {products.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 py-12">Products are being prepared. Please check back soon.</p>}

      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {products.slice(0, visibleCount).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {visibleCount < products.length && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisibleCount(products.length)}
            className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
}
