import Link from 'next/link';
import { FaLeaf, FaStar, FaHeart } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="container mx-auto px-4 lg:px-10 py-10">

        {/* Hero */}
        <section className="text-center mb-16 px-4">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-3">Our Story</p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Fashion That Speaks<br className="hidden sm:block" /> For You
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Lizz Shop was born from a passion for style and a belief that everyone deserves to look and feel their best — without breaking the bank.
          </p>
        </section>

        {/* Values */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {[
            { icon: FaLeaf, title: 'Sustainable', desc: 'We source ethically and care about our planet. Every product is chosen with sustainability in mind.' },
            { icon: FaStar, title: 'Premium Quality', desc: 'From fabric to finish, we never compromise on quality. Every stitch is crafted to last.' },
            { icon: FaHeart, title: 'Made with Love', desc: 'We pour our heart into every collection, curating pieces that make you feel confident and beautiful.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-sm text-center">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="text-gray-800 dark:text-gray-200" size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </section>

        {/* Story */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-10 shadow-sm mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-3">Since 2024</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-4">The Lizz Journey</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                What started as a small passion project in Mumbai has grown into a full-fledged fashion destination loved by thousands across India. We started with a simple idea — make great fashion accessible to everyone.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Today, Lizz Shop offers hundreds of curated styles for men and women, with new arrivals every week. We are committed to delivering not just clothes, but confidence.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '10K+', label: 'Happy Customers' },
                { number: '500+', label: 'Products' },
                { number: '4.8★', label: 'Average Rating' },
                { number: '100%', label: 'Secure Payments' },
              ].map(({ number, label }) => (
                <div key={label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 text-center">
                  <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">{number}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {[
            { title: 'Our Mission', text: 'To inspire and empower our customers by offering a curated selection of fashion that reflects their unique style and values — at prices that make sense.' },
            { title: 'Our Vision', text: 'To become India\'s most loved fashion brand, recognized for quality, customer satisfaction, and a shopping experience that feels personal and joyful.' },
          ].map(({ title, text }) => (
            <div key={title} className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">{text}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="text-center bg-black dark:bg-white rounded-2xl py-12 px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white dark:text-black mb-4">Ready to explore?</h2>
          <p className="text-gray-400 dark:text-gray-600 mb-8 text-sm sm:text-base">Discover our latest collections and find your perfect style.</p>
          <Link href="/content" className="bg-white dark:bg-black text-black dark:text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
            Shop Now
          </Link>
        </section>
      </div>
    </div>
  );
}
