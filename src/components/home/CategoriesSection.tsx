'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { label: "Men's Collection", href: '/content?category=men', image: '/categories/man.jpg', color: 'from-blue-900/60' },
  { label: "Women's Collection", href: '/content?category=women', image: '/categories/woman.jpg', color: 'from-rose-900/60' },
  { label: 'Accessories', href: '/content?category=accessories', image: '/categories/acc.jpg', color: 'from-amber-900/60' },
];

export default function CategoriesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cat-title', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 50, opacity: 0, duration: 0.8, ease: 'power3.out',
      });

      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 85%' },
          y: 80, opacity: 0, duration: 0.8, delay: i * 0.15, ease: 'power3.out',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="categories" ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="cat-title text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-2">Browse By</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">Categories</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.label}
              href={cat.href}
              ref={(el) => { if (el) cardsRef.current[i] = el as unknown as HTMLDivElement; }}
              className="group relative h-80 md:h-96 rounded-2xl overflow-hidden block"
            >
              <Image src={cat.image} alt={cat.label} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent`} />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{cat.label}</h3>
                <span className="text-sm text-white/80 border-b border-white/60 pb-0.5 group-hover:border-white transition-colors">
                  Shop Now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
