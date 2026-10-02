'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { FaTrash, FaShoppingCart, FaHeart } from 'react-icons/fa';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: { id: string; name: string; price: number; image: string }) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
    removeFromWishlist(product.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="container mx-auto px-4 lg:px-10 py-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-8">My Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-24">
            <FaHeart className="mx-auto text-gray-200 dark:text-gray-800 mb-6" size={64} />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">Your wishlist is empty</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm sm:text-base">Save items you love and come back to them anytime.</p>
            <Link href="/content" className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {wishlistItems.map((product) => (
              <div key={product.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden group">
                <div className="relative h-52 sm:h-60 overflow-hidden">
                  <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate mb-1">{product.name}</h3>
                  <p className="text-lg font-bold text-gray-900 dark:text-white mb-4">₹{product.price}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                    >
                      <FaShoppingCart size={14} />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="p-2.5 rounded-xl border border-red-200 dark:border-red-900 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
