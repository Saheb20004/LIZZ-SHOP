export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number;
  image: string;
  images?: string[];
  category: string;
  stock: number;
  rating: number;
  review_count?: number;
  created_at?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface ShippingAddress {
  full_name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  shipping_address: ShippingAddress;
  stripe_payment_intent: string;
  created_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  price: number;
}

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
  created_at: string;
}
