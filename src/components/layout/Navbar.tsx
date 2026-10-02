'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useUser, SignOutButton } from '@clerk/nextjs';
import { FaRegHeart, FaShoppingCart, FaBars, FaTimes, FaSun, FaMoon, FaSignOutAlt, FaBoxOpen, FaUser, FaChevronDown } from 'react-icons/fa';
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
  const { user, isSignedIn } = useUser();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    const handler = () => setUserMenuOpen(false);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white dark:bg-gray-950 shadow-md' : 'bg-black/30 backdrop-blur-md'
    }`}>
      <div className="px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between gap-3">

        {/* Logo */}
        <Link href="/" className="text-xl sm:text-2xl font-extrabold text-white tracking-widest shrink-0">
          LIZZ
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-5">
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href} className="text-xs font-bold text-white/80 hover:text-white transition-colors tracking-widest">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="flex-1 max-w-xs hidden md:block">
          <SearchBar />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 text-white">

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <FaSun size={17} /> : <FaMoon size={17} />}
            </button>
          )}

          {/* Wishlist */}
          <Link href="/wishlist" className="relative p-2 hover:text-gray-300 transition-colors">
            <FaRegHeart size={19} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative p-2 hover:text-gray-300 transition-colors">
            <FaShoppingCart size={19} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-green-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth — Desktop */}
          {isSignedIn && user ? (
            <div className="relative hidden md:block" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                {user.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt={user.fullName || 'User'}
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-white/50 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <FaUser size={14} />
                  </div>
                )}
                <FaChevronDown size={10} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 top-12 w-52 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.fullName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.emailAddresses[0]?.emailAddress}</p>
                  </div>
                  <Link href="/orders" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <FaBoxOpen size={14} /> My Orders
                  </Link>
                  <SignOutButton redirectUrl="/">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <FaSignOutAlt size={14} /> Sign Out
                    </button>
                  </SignOutButton>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="hidden md:flex items-center gap-1.5 text-sm font-semibold hover:text-gray-300 transition-colors">
              <FaUser size={15} />
              <span>Login</span>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FaTimes size={19} /> : <FaBars size={19} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-gray-950 text-white px-5 pb-6 flex flex-col gap-4 border-t border-white/10">
          <div className="pt-4">
            <SearchBar />
          </div>
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="text-sm font-bold tracking-widest hover:text-gray-300">
              {l.label}
            </Link>
          ))}
          <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
            {isSignedIn && user ? (
              <>
                <div className="flex items-center gap-3">
                  {user.imageUrl && (
                    <Image src={user.imageUrl} alt={user.fullName || ''} width={36} height={36} className="rounded-full" />
                  )}
                  <div>
                    <p className="text-sm font-semibold">{user.fullName}</p>
                    <p className="text-xs text-gray-400">{user.emailAddresses[0]?.emailAddress}</p>
                  </div>
                </div>
                <Link href="/orders" onClick={() => setMobileOpen(false)} className="text-sm hover:text-gray-300 flex items-center gap-2">
                  <FaBoxOpen size={13} /> My Orders
                </Link>
                <SignOutButton redirectUrl="/">
                  <button className="text-sm text-red-400 text-left flex items-center gap-2">
                    <FaSignOutAlt size={13} /> Sign Out
                  </button>
                </SignOutButton>
              </>
            ) : (
              <Link href="/login" onClick={() => setMobileOpen(false)} className="text-sm hover:text-gray-300">Login / Sign Up</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
