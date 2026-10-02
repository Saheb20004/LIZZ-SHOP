import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  legacy_id: { type: String, unique: true, sparse: true },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  original_price: { type: Number, required: true },
  image: { type: String, required: true },
  images: [String],
  category: { type: String, default: 'general' },
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  review_count: { type: Number, default: 0 },
}, { timestamps: true });

export const Product = models.Product || model('Product', ProductSchema);
