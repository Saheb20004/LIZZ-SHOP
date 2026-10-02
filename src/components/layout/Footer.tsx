import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="container mx-auto px-6 lg:px-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10">

        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-2xl font-extrabold tracking-widest mb-4">LIZZ</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            Premium fashion for men and women. Quality and style at every step.
          </p>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors"><FaFacebook size={20} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-400 transition-colors"><FaTwitter size={20} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors"><FaInstagram size={20} /></a>
            <a href="https://github.com/Saheb20004/LIZZ-SHOP" target="_blank" rel="noopener noreferrer" aria-label="LIZZ-SHOP on GitHub" className="text-gray-400 hover:text-white transition-colors"><FaGithub size={20} /></a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-5 text-gray-300">Shop</h4>
          <ul className="space-y-3">
            {[
              { label: "Men's Collection", href: '/content?category=men' },
              { label: "Women's Collection", href: '/content?category=women' },
              { label: 'Accessories', href: '/content?category=accessories' },
              { label: 'New Arrivals', href: '/content' },
              { label: 'About Us', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ].map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-5 text-gray-300">Support</h4>
          <ul className="space-y-3">
            {[
              { label: 'FAQ', href: '/faq' },
              { label: 'Shipping & Returns', href: '/shipping' },
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Service', href: '/terms' },
              { label: 'My Orders', href: '/orders' },
            ].map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-5 text-gray-300">Contact</h4>
          <ul className="space-y-4">
            <li>
              <a href="mailto:raut.hit2024@gmail.com" className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                <FaEnvelope className="mt-0.5 shrink-0" />
                <span>raut.hit2024@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="tel:+918597583529" className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                <FaPhone className="mt-0.5 shrink-0" />
                <span>+91 8597 583529</span>
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <FaMapMarkerAlt className="mt-0.5 shrink-0" />
              <span>Deulbarh, Marishda, Purba Medinipur, 721427</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-5 px-6 lg:px-10">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            © {new Date().getFullYear()} Lizz Shop. All rights reserved. Made with ❤️ in India.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Terms</Link>
            <Link href="/shipping" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
