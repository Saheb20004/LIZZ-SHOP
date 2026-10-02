'use client';

import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
  { q: 'What is your shipping policy?', a: 'We offer free shipping on orders over ₹999. Standard delivery takes 3-5 business days. Express delivery (1-2 days) is available at checkout.' },
  { q: 'How can I track my order?', a: 'Once your order ships, you\'ll receive an email with a tracking number. You can also view your order status in the My Orders section after logging in.' },
  { q: 'What is your return policy?', a: 'We accept returns of unused items in original condition within 7 days of delivery. Initiate a return from your Orders page or contact our support team.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards (Visa, Mastercard, Amex), UPI, Net Banking, and Wallets via Stripe\'s secure payment gateway.' },
  { q: 'Are my payment details safe?', a: 'Absolutely. All payments are processed through Stripe, which is PCI DSS Level 1 certified — the highest level of payment security.' },
  { q: 'How do I contact customer support?', a: 'You can reach us via the Contact page, email raut.hit2024@gmail.com, or call +91 8597 583529. We respond within 24 hours.' },
  { q: 'Can I change or cancel my order?', a: 'Orders can be modified or cancelled within 1 hour of placement. After that, the order enters processing and cannot be changed.' },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 dark:border-gray-800 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{q}</span>
        <FaChevronDown
          size={14}
          className={`text-gray-400 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40 pb-5' : 'max-h-0'}`}>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="container mx-auto px-4 lg:px-10 py-10 max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-3">Help Center</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Frequently Asked Questions</h1>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm px-6 sm:px-10">
          {faqs.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)}
        </div>
      </div>
    </div>
  );
}
