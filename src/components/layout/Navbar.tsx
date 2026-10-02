'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useUser, SignOutButton } from '@clerk/nextjs';
import { FaRegHeart, FaShoppingCart, FaBars, FaTimes, FaSun, FaMoon, FaSignOutAlt, FaBoxOpen, FaUser } from 'react-icons/fa';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import SearchBar from '@/components/SearchBar';

const navLinks = [
  { label: 'MEN', href: '/content?category=men' },
  { label: 'WOMEN', href: '/content?category=women' },
  { label: 'PLUS SIZE', href: '/content?category=plus-size' },
  { label: 'ACCESSORIES', href: '/content?category=accessories' },
];

export default function Navbar() {
  const { wishlistItems } = useWishlist();
  const { cartCount } = useCart();
  const { isSignedIn } = useUser();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white dark:bg-gray-950 shadow-md' : 'bg-black/20 backdrop-blur-md'
    }`}>
      <div className="px-6 lg:px-10 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-white tracking-widest shrink-0">
          LIZZ
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href} className="text-sm font-semibold text-white/80 hover:text-white transition-colors tracking-wide">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="flex-1 max-w-xs hidden md:block">
          <SearchBar />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 text-white">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
          )}

          {/* Wishlist */}
          <Link href="/wishlist" className="relative p-2 hover:text-gray-300 transition-colors">
            <FaRegHeart size={20} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative p-2 hover:text-gray-300 transition-colors">
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {isSignedIn ? (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/orders" className="flex items-center gap-1 text-sm hover:text-gray-300 transition-colors">
                <FaBoxOpen size={16} />
                <span>Orders</span>
              </Link>
              <SignOutButton redirectUrl="/">
                <button className="flex items-center gap-1 text-sm hover:text-gray-300 transition-colors">
                  <FaSignOutAlt size={16} />
                  <span>Logout</span>
                </button>
              </SignOutButton>
            </div>
          ) : (
            <Link href="/login" className="hidden md:flex items-center gap-1 text-sm hover:text-gray-300 transition-colors">
              <FaUser size={16} />
              <span>Login</span>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-950 text-white px-6 pb-6 flex flex-col gap-4">
          <SearchBar />
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="text-sm font-semibold tracking-wide hover:text-gray-300">
              {l.label}
            </Link>
          ))}
          {isSignedIn ? (
            <>
              <Link href="/orders" onClick={() => setMobileOpen(false)} className="text-sm hover:text-gray-300">My Orders</Link>
              <SignOutButton redirectUrl="/">
                <button className="text-sm text-left hover:text-gray-300">Logout</button>
              </SignOutButton>
            </>
          ) : (
            <Link href="/login" onClick={() => setMobileOpen(false)} className="text-sm hover:text-gray-300">Login / Sign Up</Link>
          )}
        </div>
      )}
    </header>
  );
}
