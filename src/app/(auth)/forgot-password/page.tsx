'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSignIn } from '@clerk/nextjs';
import { FaEnvelope } from 'react-icons/fa';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const { isLoaded, signIn } = useSignIn();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setLoading(true);
    try {
      await signIn.create({ identifier: email });
      await signIn.prepareFirstFactor({ strategy: 'reset_password_email_code' });
      setSent(true);
      toast.success('Reset link sent! Check your email.');
    } catch {
      // Avoid exposing whether an email address is registered.
      setSent(true);
      toast.success('If an account exists for that address, reset instructions are on the way.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-extrabold tracking-widest text-gray-900 dark:text-white">LIZZ</Link>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Reset your password</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
          {sent ? (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">📧</div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Check your email</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">We sent a password reset link to <strong>{email}</strong></p>
              <Link href="/login" className="text-sm font-semibold text-black dark:text-white hover:underline">Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-5">
              <p className="text-sm text-gray-500 dark:text-gray-400">Enter your email and we&apos;ll send you a reset link.</p>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !isLoaded}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                <Link href="/login" className="font-semibold text-black dark:text-white hover:underline">Back to Login</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
