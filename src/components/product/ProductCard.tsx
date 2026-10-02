'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaRegHeart, FaHeart, FaStar } from 'react-icons/fa';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

interface Props { product: Product; }

export default function ProductCard({ product }: Props) {
  const { isItemInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const wishlisted = isItemInWishlist(product.id);
  const discount = Math.round(((product.original_price - product.price) / product.original_price) * 100);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({ id: product.id, name: product.name, price: product.price, image: product.image });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
  };

  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <Link href={`/product/${product.id}`} className="block relative h-64 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow transition-transform hover:scale-110"
        >
          {wishlisted ? <FaHeart className="text-red-500" size={16} /> : <FaRegHeart className="text-gray-500" size={16} />}
        </button>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 dark:text-white truncate hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-1 mb-3">
          <FaStar className="text-amber-400" size={12} />
          <span className="text-xs text-gray-500 dark:text-gray-400">{product.rating} ({product.review_count ?? 0})</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">₹{product.price}</span>
            {product.original_price > product.price && (
              <span className="text-sm text-gray-400 line-through">₹{product.original_price}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-black dark:bg-white text-white dark:text-black text-xs font-semibold px-4 py-2 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
