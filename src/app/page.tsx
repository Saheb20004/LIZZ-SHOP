import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import NewArrivalsSection from '@/components/home/NewArrivalsSection';
import MarqueeBanner from '@/components/home/MarqueeBanner';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <MarqueeBanner />
      <CategoriesSection />
      <NewArrivalsSection />
    </main>
  );
}
