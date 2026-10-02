import mongoose from 'mongoose';
import { readFile } from 'node:fs/promises';

async function getMongoUri() {
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI;
  try {
    const envFile = await readFile(new URL('../.env.local', import.meta.url), 'utf8');
    const line = envFile.split(/\r?\n/).find((entry) => /^\s*(?:export\s+)?MONGODB_URI\s*=/.test(entry));
    const value = line?.replace(/^\s*(?:export\s+)?MONGODB_URI\s*=\s*/, '').trim();
    if (value) return value.replace(/^(['"])(.*)\1$/, '$2');
  } catch {}
  throw new Error('Set MONGODB_URI in the environment or .env.local before seeding.');
}

const photos = {
  men: [
    'photo-1529139574466-a303027c1d8b',
    'photo-1617137968427-85924c800a22',
    'photo-1516257984-b1b4d707412e',
    'photo-1598033129183-c4f50c736f10',
    'photo-1716951918731-77d7682b4e63',
  ],
  women: [
    'photo-1496747611176-843222e1e57c',
    'photo-1539109136881-3be0616acf4b',
    'photo-1515886657613-9f3515b0c78f',
    'photo-1483985988355-763728e1935b',
    'photo-1515372039744-b8f02a3ae446',
  ],
  accessories: [
    'photo-1523275335684-37898b6baf30',
    'photo-1548036328-c9fa89d128fa',
    'photo-1572635196237-14b3f281503f',
    'photo-1584917865442-de89df76afd3',
    'photo-1611652022419-a9419f74343d',
  ],
};

const productTypes = {
  men: ['Cotton T-Shirt', 'Oxford Shirt', 'Denim Jacket', 'Everyday Hoodie', 'Slim Fit Chinos'],
  women: ['Linen Dress', 'Relaxed Blouse', 'Wide-Leg Trousers', 'Knit Cardigan', 'Everyday Kurta'],
  accessories: ['Leather Crossbody Bag', 'Minimal Wristwatch', 'Classic Sunglasses', 'Everyday Sneakers', 'Textured Wallet'],
};
const editions = ['Essential', 'Studio', 'Weekend', 'Modern', 'Heritage', 'Everyday', 'Signature'];
const colors = ['Black', 'Ivory', 'Sand', 'Olive', 'Navy', 'Rose', 'Stone'];
const priceRanges = { men: [799, 3299], women: [899, 3599], accessories: [499, 4999] };

const products = [];
for (const [category, count] of [['men', 35], ['women', 35], ['accessories', 30]]) {
  const types = productTypes[category];
  const range = priceRanges[category];
  for (let index = 0; index < count; index += 1) {
    const globalIndex = products.length + 1;
    const productType = types[index % types.length];
    const edition = editions[Math.floor(index / types.length) % editions.length];
    const color = colors[index % colors.length];
    const imageId = photos[category][index % photos[category].length];
    const price = range[0] + ((index * 317 + globalIndex * 43) % (range[1] - range[0]));
    const image = `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=1000&q=85`;
    products.push({
      legacy_id: `dummy-${String(globalIndex).padStart(3, '0')}`,
      name: `${edition} ${color} ${productType}`,
      description: `A ${edition.toLowerCase()} ${productType.toLowerCase()} in ${color.toLowerCase()}, made for comfortable everyday wear. Sample catalog item for the ${category} collection.`,
      price,
      original_price: Math.round(price * 1.35),
      image,
      images: [image],
      category,
      stock: 8 + ((globalIndex * 7) % 43),
      rating: Number((3.8 + ((globalIndex * 13) % 13) / 10).toFixed(1)),
      review_count: (globalIndex * 17) % 240,
    });
  }
}

const uri = await getMongoUri();
try {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
  const collection = mongoose.connection.collection('products');
  const createdAt = new Date();
  const operations = products.map((product) => ({
    updateOne: {
      filter: { legacy_id: product.legacy_id },
      update: {
        $set: {
          name: product.name,
          description: product.description,
          price: product.price,
          original_price: product.original_price,
          image: product.image,
          images: product.images,
          category: product.category,
          stock: product.stock,
          rating: product.rating,
          review_count: product.review_count,
          seed_source: 'dummy-catalog',
          updatedAt: createdAt,
        },
        $setOnInsert: { legacy_id: product.legacy_id, createdAt },
      },
      upsert: true,
    },
  }));
  const result = await collection.bulkWrite(operations, { ordered: false });
  const total = await collection.countDocuments({ seed_source: 'dummy-catalog' });
  console.log(`MongoDB dummy catalog ready: ${total} products (${result.upsertedCount} inserted, ${result.modifiedCount} refreshed).`);
} finally {
  await mongoose.disconnect();
}
