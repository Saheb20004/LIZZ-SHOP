// src/app/about/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-gray-100 min-h-screen">

      <main className="container mx-auto px-4 py-24 md:py-32">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 animate-fadeInUp">
            Our Story, Our Passion
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fadeInUp delay-100">
            Welcome to a brand built on a commitment to quality, creativity, and community. We are more than just a store; we are a destination.
          </p>
        </section>

        {/* Our Story Section */}
        <section className="bg-white p-12 rounded-lg shadow-md mb-16 animate-fadeInUp delay-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            The Journey of [Your Store Name]
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <Image
                src="/hero/hero-banner.jpg" 
                alt="Our Story"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-gray-700 leading-relaxed mb-4">
                Our story began in [Year] with a simple idea: to bring unique and high-quality products to people who appreciate craftsmanship and attention to detail. From a small, humble beginning, we have grown into a brand that stands for excellence and authenticity.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Every product in our collection is handpicked with care, ensuring it meets our high standards for quality, design, and ethical sourcing. We believe that what you buy should not only look good but also feel good.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-10 rounded-lg shadow-md animate-fadeInUp delay-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To inspire and empower our customers by offering a curated selection of products that reflect their unique style and values. We aim to be a positive force in the community through sustainable practices and exceptional service.
            </p>
          </div>
          <div className="bg-white p-10 rounded-lg shadow-md animate-fadeInUp delay-400">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To become a leading brand recognized for its unwavering commitment to quality, customer satisfaction, and ethical business practices. We envision a world where shopping is a meaningful and joyful experience.
            </p>
          </div>
        </section>

        {/* Meet the Team Section (Placeholder) */}
        <section className="text-center mb-16 animate-fadeInUp delay-500">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Meet the Team
          </h2>
          <div className="flex flex-wrap justify-center gap-12">
            {/* Team Member 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md w-64 text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-gray-300 mb-4"></div>
              <h4 className="text-lg font-bold text-gray-900">John Doe</h4>
              <p className="text-sm text-gray-500">Founder & CEO</p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md w-64 text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-gray-300 mb-4"></div>
              <h4 className="text-lg font-bold text-gray-900">Jane Smith</h4>
              <p className="text-sm text-gray-500">Head of Operations</p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md w-64 text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-gray-300 mb-4"></div>
              <h4 className="text-lg font-bold text-gray-900">Peter Jones</h4>
              <p className="text-sm text-gray-500">Creative Director</p>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="text-center animate-fadeInUp delay-600">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Explore Our World
          </h2>
          <Link href="/content" passHref>
            <button
              className="bg-gray-800 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Shop Our Products
            </button>
          </Link>
        </section>
      </main>

    </div>
  );
}