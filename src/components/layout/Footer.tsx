import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="container mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h3 className="text-2xl font-extrabold tracking-widest mb-4">LIZZ</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            Discover a curated collection of fashion crafted for your lifestyle. Quality and style at every step.
          </p>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors"><FaFacebook size={20} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-400 transition-colors"><FaTwitter size={20} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors"><FaInstagram size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-5 text-gray-300">Shop</h4>
          <ul className="space-y-3">
            {[
              { label: "Men's Collection", href: '/content?category=men' },
              { label: "Women's Collection", href: '/content?category=women' },
              { label: 'New Arrivals', href: '/content' },
              { label: 'Sale', href: '/content?sale=true' },
            ].map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-5 text-gray-300">Support</h4>
          <ul className="space-y-3">
            {[
              { label: 'FAQ', href: '/faq' },
              { label: 'Shipping & Returns', href: '/shipping' },
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Service', href: '/terms' },
              { label: 'About Us', href: '/about' },
            ].map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-5 text-gray-300">Contact</h4>
          <ul className="space-y-4">
            <li>
              <a href="mailto:support@lizzshop.com" className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                <FaEnvelope className="mt-0.5 shrink-0" />
                <span>support@lizzshop.com</span>
              </a>
            </li>
            <li>
              <a href="tel:+911234567890" className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                <FaPhone className="mt-0.5 shrink-0" />
                <span>+91 12345 67890</span>
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <FaMapMarkerAlt className="mt-0.5 shrink-0" />
              <span>Mumbai, Maharashtra, India</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6 text-center">
        <p className="text-xs text-gray-500">© {new Date().getFullYear()} Lizz Shop. All rights reserved. Made with ❤️ in India.</p>
      </div>
    </footer>
  );
}
