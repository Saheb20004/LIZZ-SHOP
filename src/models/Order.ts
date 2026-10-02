import { Schema, model, models } from 'mongoose';

const OrderItemSchema = new Schema({
  product_id: String,
  product_name: { type: String, required: true },
  product_image: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const ShippingAddressSchema = new Schema({
  full_name: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  country: String,
  phone: String,
}, { _id: false });

const OrderSchema = new Schema({
  user_id: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  subtotal: { type: Number, required: true },
  shipping_cost: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  shipping_address: ShippingAddressSchema,
  stripe_payment_intent: String,
  items: [OrderItemSchema],
}, { timestamps: true });

export const Order = models.Order || model('Order', OrderSchema);
