'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

export default function ContentPage() {
  const [visibleCount, setVisibleCount] = useState(10);
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetch('/api/products').then((response) => response.ok ? response.json() : []).then(setProducts).catch(() => setProducts([]));
    setCategory(new URLSearchParams(window.location.search).get('category')?.toLowerCase() ?? '');
  }, []);

  const filteredProducts = category
    ? products.filter((product) => product.category?.toLowerCase() === category)
    : products;
  const categoryTitle = category === 'men' ? "Men's Collection" : category === 'women' ? "Women's Collection" : category === 'accessories' ? 'Accessories' : 'All Products';

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen px-4 lg:px-10 pt-24 pb-16">
      <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-2">{categoryTitle}</h1>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-10">Shop our latest collection.</p>

      {filteredProducts.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 py-12">{products.length === 0 ? 'Products are being prepared. Please check back soon.' : 'No products in this collection yet.'}</p>}

      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {filteredProducts.slice(0, visibleCount).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {visibleCount < filteredProducts.length && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisibleCount(filteredProducts.length)}
            className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
}
