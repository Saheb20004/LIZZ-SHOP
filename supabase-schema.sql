-- ============================================
-- LIZZ SHOP — Supabase Schema (Clerk Auth)
-- Run this in Supabase SQL Editor
-- ============================================

create extension if not exists "uuid-ossp";

-- ============================================
-- PRODUCTS
-- ============================================
create table if not exists public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price numeric(10,2) not null,
  original_price numeric(10,2) not null,
  image text not null,
  images text[] default '{}',
  category text not null default 'general',
  stock integer not null default 0,
  rating numeric(3,1) default 0,
  review_count integer default 0,
  created_at timestamptz default now()
);

alter table public.products enable row level security;

drop policy if exists "Products are publicly readable" on public.products;
create policy "Products are publicly readable" on public.products
  for select using (true);

-- ============================================
-- ORDERS (user_id is Clerk text ID)
-- ============================================
create table if not exists public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id text not null,
  status text not null default 'pending' check (status in ('pending','processing','shipped','delivered','cancelled')),
  subtotal numeric(10,2) not null,
  shipping_cost numeric(10,2) not null default 0,
  tax numeric(10,2) not null default 0,
  total numeric(10,2) not null,
  shipping_address jsonb not null,
  stripe_payment_intent text,
  created_at timestamptz default now()
);

alter table public.orders enable row level security;

-- Allow all operations (Clerk handles auth, not Supabase RLS)
drop policy if exists "Allow all order operations" on public.orders;
create policy "Allow all order operations" on public.orders
  for all using (true) with check (true);

-- ============================================
-- ORDER ITEMS
-- ============================================
create table if not exists public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade,
  product_id text,
  product_name text not null,
  product_image text not null,
  quantity integer not null,
  price numeric(10,2) not null
);

alter table public.order_items enable row level security;

drop policy if exists "Allow all order item operations" on public.order_items;
create policy "Allow all order item operations" on public.order_items
  for all using (true) with check (true);

-- ============================================
-- SEED PRODUCTS
-- ============================================
insert into public.products (name, description, price, original_price, image, category, stock, rating, review_count) values
('Stylish T-shirt', 'A comfortable and stylish t-shirt made from 100% organic cotton.', 599, 1000, '/img1.jpg', 'men', 50, 4.2, 128),
('Classic Jeans', 'Durable and classic fit jeans, perfect for everyday wear.', 599, 1499, '/img2.jpg', 'men', 30, 4.5, 256),
('Leather Jacket', 'A high-quality leather jacket that combines style with comfort.', 599, 1999, '/img3.jpg', 'men', 20, 3.9, 89),
('T-shirt Standing', 'Premium quality standing collar t-shirt.', 599, 999, '/img4.jpg', 'men', 45, 4.1, 67),
('Floral Dress', 'Beautiful floral print dress for all occasions.', 599, 999, '/img5.jpg', 'women', 35, 4.5, 312),
('Summer Top', 'Light and breezy summer top in multiple colors.', 599, 999, '/img6.jpg', 'women', 60, 4.3, 198),
('Denim Jacket', 'Classic denim jacket with modern cut.', 599, 1999, '/img7.jpg', 'women', 25, 4.5, 145),
('Casual Shirt', 'Versatile casual shirt for any occasion.', 599, 999, '/img8.jpg', 'men', 40, 4.2, 203),
('Ethnic Kurta', 'Traditional ethnic kurta with modern design.', 599, 1499, '/img9.jpg', 'men', 55, 4.4, 178),
('Party Dress', 'Elegant party dress for special occasions.', 599, 999, '/img10.jpg', 'women', 30, 4.5, 421)
on conflict do nothing;
