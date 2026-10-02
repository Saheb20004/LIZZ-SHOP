import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import NewArrivalsSection from '@/components/home/NewArrivalsSection';
import MarqueeBanner from '@/components/home/MarqueeBanner';
import productsJson from '@/data/products.json';
import { Product } from '@/types';

const products: Product[] = productsJson.map((p) => ({
  ...p,
  id: String(p.id),
  price: p.finalPrice,
  original_price: p.originalPrice,
  category: 'general',
  stock: 50,
  review_count: 0,
}));

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <MarqueeBanner />
      <CategoriesSection />
      <NewArrivalsSection products={products} />
    </main>
  );
}
