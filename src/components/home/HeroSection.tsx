'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight, FaArrowDown } from 'react-icons/fa';
import gsap from 'gsap';

const slides = [
  { src: '/hero/hero1.jpg', id: '1', title: 'New Season', subtitle: 'Men\'s Collection 2025' },
  { src: '/hero/hero2.jpg', id: '2', title: 'Effortless Style', subtitle: 'Women\'s Essentials' },
  { src: '/hero/hero3.jpg', id: '3', title: 'Bold & Free', subtitle: 'Street Fashion' },
  { src: '/hero/hero4.jpg', id: '4', title: 'Premium Quality', subtitle: 'Crafted for You' },
  { src: '/hero/hero5.jpg', id: '5', title: 'Timeless Looks', subtitle: 'Classic Wardrobe' },
  { src: '/hero/hero6.jpg', id: '6', title: 'Summer Vibes', subtitle: 'Fresh Arrivals' },
  { src: '/hero/hero7.jpg', id: '7', title: 'Be Iconic', subtitle: 'Limited Edition' },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const animateText = () => {
    if (!textRef.current) return;
    gsap.fromTo(
      textRef.current.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );
  };

  const goTo = (index: number) => {
    setCurrent((index + slides.length) % slides.length);
    animateText();
  };

  useEffect(() => {
    animateText();
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      animateText();
    }, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const slide = slides[current];

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Images */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image src={s.src} alt={s.title} fill className="object-cover" priority={i === 0} />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 z-10">
        <div ref={textRef}>
          <p className="text-sm md:text-base uppercase tracking-[0.3em] text-gray-300 mb-3">{slide.subtitle}</p>
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-6 leading-none">{slide.title}</h1>
          <div className="flex gap-4 justify-center">
            <Link
              href={`/product/${slide.id}`}
              className="bg-white text-black px-8 py-3 rounded-full font-semibold text-sm hover:bg-gray-200 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/content"
              className="border border-white text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-white/10 transition-colors"
            >
              Explore All
            </Link>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => goTo(current - 1)}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/40 transition-colors"
      >
        <FaChevronLeft size={20} />
      </button>
      <button
        onClick={() => goTo(current + 1)}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/40 transition-colors"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/50'}`}
          />
        ))}
      </div>

      {/* Scroll Down */}
      <a
        href="#categories"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/70 hover:text-white flex flex-col items-center gap-1 text-xs animate-bounce"
      >
        <FaArrowDown size={16} />
        <span>Scroll</span>
      </a>
    </section>
  );
}
