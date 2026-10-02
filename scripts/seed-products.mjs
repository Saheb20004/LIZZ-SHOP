import mongoose from 'mongoose';
import { readFile } from 'node:fs/promises';

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('Set MONGODB_URI before seeding the product catalog.');

const source = new URL('../src/data/products.json', import.meta.url);
const products = JSON.parse(await readFile(source, 'utf8'));

try {
  await mongoose.connect(uri);
  const collection = mongoose.connection.collection('products');
  const operations = products.map((product) => ({
    updateOne: {
      filter: { legacy_id: String(product.id) },
      update: {
        $set: {
          name: product.name,
          description: product.description,
          price: product.finalPrice,
          original_price: product.originalPrice,
          image: product.image,
          images: [product.image],
          category: 'general',
          stock: 50,
          rating: product.rating ?? 0,
          review_count: 0,
        },
        $setOnInsert: { legacy_id: String(product.id) },
      },
      upsert: true,
    },
  }));

  const result = await collection.bulkWrite(operations);
  console.log(`MongoDB catalog seeded: ${result.upsertedCount} inserted, ${result.modifiedCount} updated.`);
} finally {
  await mongoose.disconnect();
}
