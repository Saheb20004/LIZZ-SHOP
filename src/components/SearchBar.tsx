// src/components/SearchBar.tsx
'use client';

import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Search query search page redirect 
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative hidden md:block" style={{ width: '400px' }}>
      <input
        type="text"
        placeholder="Search by products"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 pr-4 py-2 rounded-lg bg-gray-800 border-2 border-gray-700 focus:outline-none focus:border-blue-500 w-full text-white placeholder-gray-400"
      />
      <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
        <FaSearch />
      </button>
    </form>
  );
}