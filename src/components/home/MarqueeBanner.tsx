'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const items = ['FREE SHIPPING OVER ₹999', '★ NEW ARRIVALS WEEKLY', 'EASY RETURNS', '★ SECURE PAYMENTS', 'EXCLUSIVE DEALS', '★ PREMIUM QUALITY'];

export default function MarqueeBanner() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 20,
        ease: 'none',
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  const doubled = [...items, ...items];

  return (
    <div className="bg-black text-white py-3 overflow-hidden">
      <div ref={trackRef} className="flex whitespace-nowrap" style={{ width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span key={i} className="text-xs font-semibold tracking-widest uppercase mx-8">{item}</span>
        ))}
      </div>
    </div>
  );
}
