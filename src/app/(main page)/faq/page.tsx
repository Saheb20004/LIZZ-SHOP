// src/app/faq/page.tsx
'use client';

import { useState } from 'react';

const faqData = [
  {
    question: "What is your shipping policy?",
    answer: "We offer standard and express shipping options. All orders are processed within 1-2 business days. You will receive a tracking number as soon as your order ships."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, we will send you a confirmation email with a tracking number. You can use this number on our website's tracking page or the carrier's website to check the status of your delivery."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns of unused items in their original condition within 30 days of delivery. Please visit our Shipping & Returns page for detailed instructions on how to initiate a return."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, including Visa, MasterCard, American Express, and Discover. We also accept payments through PayPal."
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach our customer support team via the Contact Us page on our website, or by sending an email to your_email@example.com."
  }
];

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-gray-800">
          {question}
        </span>
        <svg
          className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <p className="mt-4 text-gray-600 leading-relaxed">
          {answer}
        </p>
      )}
    </div>
  );
};

export default function FAQPage() {
  return (
    <div className="bg-gray-100 min-h-screen">

      <main className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h1>

          <div className="bg-white p-6 rounded-lg shadow-md">
            {faqData.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      </main>

    </div>
  );
}