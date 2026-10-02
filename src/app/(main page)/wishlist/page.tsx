// src/app/wishlist/page.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { FaTrash, FaShoppingCart } from 'react-icons/fa'; // Icons from react-icons/fa

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart(); 

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    removeFromWishlist(product.id);
  };

  return (
    <div className="bg-gray-900 min-h-screen py-16 text-white">
      <div className="container mx-auto mt-16 px-4 md:px-0">
        <h1 className="text-4xl font-extrabold text-center text-white mb-10">Your Wishlist</h1>
        
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-800 rounded-xl shadow-lg">
            <p className="text-xl text-gray-400 mb-4">Your wishlist is empty. Start adding some items!</p>
            <Link href="/content" className="text-blue-600 hover:underline font-medium">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {wishlistItems.map((product) => (
              <div 
                key={product.id} 
                className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 transition-all duration-300 hover:shadow-xl"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="rounded-lg object-cover flex-shrink-0"
                />
                
                <div className="flex-grow flex flex-col items-center md:items-start text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                  <p className="text-xl font-semibold text-gray-400 mt-2">₹{product.price}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="px-6 py-3 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition-colors shadow-md flex items-center justify-center space-x-2"
                  >
                    <FaShoppingCart className="text-lg" />
                    <span>Add to Cart</span>
                  </button>
                  <button 
                    onClick={() => removeFromWishlist(product.id)}
                    className="px-6 py-3 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600 transition-colors shadow-md flex items-center justify-center space-x-2"
                  >
                    <FaTrash className="text-lg" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}