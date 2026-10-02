'use client';

import { createContext, useState, useContext, ReactNode, useCallback, useRef } from 'react';
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
  const cartRef = useRef<CartItem[]>([]);

  const addToCart = useCallback((item: CartItem) => {
    const existing = cartRef.current.find((i) => i.id === item.id);

    if (existing) {
      toast.success(`${item.name} quantity updated`);
    } else {
      toast.success(`${item.name} added to cart`, {
        description: `₹${item.price}`,
        action: { label: 'View Cart', onClick: () => (window.location.href = '/cart') },
      });
    }

    setCartItems((prev) => {
      const ex = prev.find((i) => i.id === item.id);
      const next = ex
        ? prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { ...item, quantity: 1 }];
      cartRef.current = next;
      return next;
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    toast.info('Item removed from cart');
    setCartItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      cartRef.current = next;
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    cartRef.current = [];
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) { removeFromCart(id); return; }
    setCartItems((prev) => {
      const next = prev.map((i) => i.id === id ? { ...i, quantity } : i);
      cartRef.current = next;
      return next;
    });
  }, [removeFromCart]);

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
