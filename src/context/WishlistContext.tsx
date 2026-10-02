'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import { WishlistItem } from '@/types';

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isItemInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      toast.success(`${item.name} added to wishlist`);
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prev) => prev.filter((i) => i.id !== id));
  };

  const isItemInWishlist = (id: string) => wishlistItems.some((i) => i.id === id);

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isItemInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
