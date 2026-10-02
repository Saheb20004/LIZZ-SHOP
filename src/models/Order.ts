import { Schema, model, models, type Model, type Types } from 'mongoose';

interface OrderItemRecord {
  _id?: Types.ObjectId;
  product_id?: string;
  product_name: string;
  product_image: string;
  quantity: number;
  price: number;
}

interface OrderRecord {
  user_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
  shipping_address: {
    full_name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
  };
  stripe_payment_intent?: string;
  items: OrderItemRecord[];
  createdAt?: Date;
}

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

const OrderSchema = new Schema<OrderRecord>({
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

export const Order: Model<OrderRecord> =
  (models.Order as Model<OrderRecord> | undefined) ?? model<OrderRecord>('Order', OrderSchema);
