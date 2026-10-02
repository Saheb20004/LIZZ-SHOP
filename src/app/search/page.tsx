'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import productsJson from '@/data/products.json';
import { Product } from '@/types';

const allProducts: Product[] = productsJson.map((p) => ({
  ...p,
  id: String(p.id),
  price: p.finalPrice,
  original_price: p.originalPrice,
  category: 'general',
  stock: 50,
  review_count: 0,
}));

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = allProducts.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen px-4 lg:px-10 pt-24 pb-16">
      <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-2">
        Search Results for &quot;{query}&quot;
      </h1>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-10">{results.length} results found.</p>

      {results.length > 0 ? (
        <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-gray-500 dark:text-gray-400">No products found matching your search.</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 dark:bg-gray-950" />}>
      <SearchContent />
    </Suspense>
  );
}
