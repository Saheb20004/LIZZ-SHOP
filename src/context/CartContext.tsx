'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from 'sonner';
import { CartItem } from '@/types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        toast.success(`${item.name} quantity updated`);
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      toast.success(`${item.name} added to cart`, {
        description: `₹${item.price}`,
        action: { label: 'View Cart', onClick: () => (window.location.href = '/cart') },
      });
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    toast.info('Item removed from cart');
  };

  const clearCart = () => setCartItems([]);

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) { removeFromCart(id); return; }
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const cartTotal = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
