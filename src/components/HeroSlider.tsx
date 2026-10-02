// src/components/HeroSlider.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-scroll';
import NextLink from 'next/link'; // Import Link from next/link

const originalHeroData = [
  { src: '/hero/hero1.jpg', productID: '1'},
  { src: '/hero/hero2.jpg', productID: '2'},
  { src: '/hero/hero3.jpg', productID: '3'},
  { src: '/hero/hero4.jpg', productID: '4'},
  { src: '/hero/hero5.jpg', productID: '5'},
  { src: '/hero/hero6.jpg', productID: '6'},
  { src: '/hero/hero7.jpg', productID: '7'},
];

const images = [
  ...originalHeroData.slice(-3),
  ...originalHeroData,
  ...originalHeroData.slice(0, 3),
];

const SLIDE_INTERVAL = 5000;
const IMAGES_PER_VIEW = 3;

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(IMAGES_PER_VIEW);
  const isTransitioningRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setCurrentSlide((prevSlide) => prevSlide + 1);
  };

  const prevSlide = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setCurrentSlide((prevSlide) => prevSlide - 1);
  };

  useEffect(() => {
    const handleTransitionEnd = () => {
      if (!containerRef.current) return;
      isTransitioningRef.current = false;
      if (currentSlide >= originalHeroData.length + IMAGES_PER_VIEW) {
        containerRef.current.style.transition = 'none';
        setCurrentSlide(IMAGES_PER_VIEW);
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.transition = 'transform 0.7s ease-in-out';
          }
        }, 10);
      } else if (currentSlide < IMAGES_PER_VIEW) {
        containerRef.current.style.transition = 'none';
        setCurrentSlide(originalHeroData.length + currentSlide);
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.transition = 'transform 0.7s ease-in-out';
          }
        }, 10);
      }
    };
    
    if (containerRef.current) {
      containerRef.current.addEventListener('transitionend', handleTransitionEnd);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('transitionend', handleTransitionEnd);
      }
    };
  }, [currentSlide]);

  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const totalSliderWidth = `calc(${images.length} * (100% / ${IMAGES_PER_VIEW}))`;
  const transformValue = `translateX(-${currentSlide * (100 / IMAGES_PER_VIEW)}%)`;

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black">
      <div className="absolute inset-0 flex items-center justify-between z-10 px-8">
        <button
          onClick={prevSlide}
          className="bg-white/50 text-gray-800 p-3 rounded-full shadow-lg transition-transform hover:scale-110"
        >
          <FaChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="bg-white/50 text-gray-800 p-3 rounded-full shadow-lg transition-transform hover:scale-110"
        >
          <FaChevronRight size={24} />
        </button>
      </div>

      <div 
        ref={containerRef}
        className="flex w-full h-full transition-transform duration-700 ease-in-out" 
        style={{ transform: transformValue, width: totalSliderWidth }}
      >
        {images.map((image, index) => (
          <div key={index} className="relative w-1/3 h-full flex-none cursor-pointer">
            <NextLink href={`/product/${image.productID}`}>
              <Image
                src={image.src}
                alt={`Hero banner ${index + 1}`}
                fill
                priority={index >= IMAGES_PER_VIEW && index < IMAGES_PER_VIEW * 2}
                className="object-cover"
              />
            </NextLink>
          </div>
        ))}
      </div>
      {/* Updated Button */}
      <div className="absolute bottom-12 inset-x-0 flex justify-center z-20">
        <Link to="featured-categories" smooth={true} duration={500} offset={-70}>
          <button className="bg-white text-gray-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors shadow-lg animate-bounce">
            Explore All
          </button>
        </Link>
      </div>
    </div>
  );
}