'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaRegHeart, FaStar, FaShoppingCart, FaShieldAlt, FaTruck, FaUndo } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Product } from '@/types';
import { toast } from 'sonner';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isItemInWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${encodeURIComponent(id)}`)
      .then((response) => response.ok ? response.json() : null)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoaded(true));
  }, [id]);

  if (!loaded) return <div className="min-h-screen bg-gray-50 dark:bg-gray-950" />;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
        <h1 className="text-3xl font-bold mb-4">Product not found</h1>
        <Link href="/content" className="text-sm underline">Browse all products</Link>
      </div>
    );
  }

  const wishlisted = isItemInWishlist(product.id);
  const discount = Math.round(((product.original_price - product.price) / product.original_price) * 100);
  const images = product.images?.length ? product.images : [product.image];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
    }
    toast.success(`${quantity}x ${product.name} added to cart`);
  };

  const toggleWishlist = () => {
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({ id: product.id, name: product.name, price: product.price, image: product.image });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="container mx-auto px-4 lg:px-10 py-10">
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex gap-2">
          <Link href="/" className="hover:text-black dark:hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/content" className="hover:text-black dark:hover:text-white">Products</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white truncate max-w-xs">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-10 shadow-sm">
          {/* Images */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[500px]">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`flex-none w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-black dark:border-white' : 'border-transparent'}`}
                >
                  <Image src={img} alt="" width={64} height={64} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
            <div className="relative flex-1 h-80 md:h-[500px] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image src={images[selectedImage]} alt={product.name} fill className="object-cover" priority />
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1,2,3,4,5].map((s) => (
                  <FaStar key={s} size={16} className={s <= Math.round(product.rating) ? 'text-amber-400' : 'text-gray-300'} />
                ))}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{product.rating} ({product.review_count ?? 0} reviews)</span>
            </div>

            <div className="flex items-end gap-3 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-white">₹{product.price}</span>
              {product.original_price > product.price && (
                <span className="text-xl text-gray-400 line-through mb-1">₹{product.original_price}</span>
              )}
              {discount > 0 && (
                <span className="text-sm font-semibold text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-lg mb-1">
                  Save ₹{product.original_price - product.price}
                </span>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{product.description}</p>

            <p className={`text-sm font-semibold mb-4 ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {product.stock > 0 ? `✓ In Stock (${product.stock} left)` : '✗ Out of Stock'}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Qty:</span>
              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">−</button>
                <span className="px-4 py-2 font-semibold text-gray-900 dark:text-white">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-4 py-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">+</button>
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-40"
              >
                <FaShoppingCart />
                Add to Cart
              </button>
              <button
                onClick={toggleWishlist}
                className={`p-4 rounded-xl border-2 transition-colors ${wishlisted ? 'border-red-500 text-red-500' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-red-400 hover:text-red-400'}`}
              >
                {wishlisted ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: FaTruck, label: 'Free Delivery', sub: 'Orders over ₹999' },
                { icon: FaUndo, label: 'Easy Returns', sub: '7-day return policy' },
                { icon: FaShieldAlt, label: 'Secure Payment', sub: '100% protected' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <Icon className="text-gray-700 dark:text-gray-300 mb-1" size={18} />
                  <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">{label}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
