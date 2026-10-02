'use client';

import { useEffect, useState } from 'react';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import NewArrivalsSection from '@/components/home/NewArrivalsSection';
import MarqueeBanner from '@/components/home/MarqueeBanner';
import { Product } from '@/types';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch('/api/products').then((response) => response.ok ? response.json() : []).then(setProducts).catch(() => setProducts([]));
  }, []);

  return (
    <main>
      <HeroSection />
      <MarqueeBanner />
      <CategoriesSection />
      <NewArrivalsSection products={products} />
    </main>
  );
}
