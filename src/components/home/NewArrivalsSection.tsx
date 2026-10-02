'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

interface Props { products: Product[]; }

export default function NewArrivalsSection({ products }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.arrivals-title', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.7, ease: 'power3.out',
      });

      gsap.from('.arrival-card', {
        scrollTrigger: { trigger: scrollRef.current, start: 'top 85%' },
        x: 60, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="arrivals-title flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-2">Just In</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">New Arrivals</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll('left')} className="p-3 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <FaChevronLeft size={16} />
            </button>
            <button onClick={() => scroll('right')} className="p-3 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <FaChevronRight size={16} />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
          {products.map((product) => (
            <div key={product.id} className="arrival-card flex-none w-60 md:w-72">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
