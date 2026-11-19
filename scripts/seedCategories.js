
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const categories = [
  'Tandem Box',
  'SS PVD Basket & Aluminium Basket',
  'Partitions & Silico Glass Series',
  'Space Ladder & Pantry',
  'Dish Rack With Drip Tray',
  'Magic Corner, Carousel & BPO-MPO-SPO, Side Mounting Pullout',
  'Wire Baskets, Wicker Basket',
  'Bins & Detergent Racks, Wire Basket Money Series',
  'Wire Accessories, Pull Down Unit, Rolling Shutters',
  'Cutlery Tray',
  'Sliding Double & Auto Lid Dustbin',
  'Accessories',
  'Ancillaries',
  'Wardrobe',
];

async function seedCategories() {
  const transaction = client.transaction();

  categories.forEach((title, index) => {
    const slug = title
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    transaction.createOrReplace({
      _id: `category-${slug}`,
      _type: 'category',
      title,
      slug: {
        _type: 'slug',
        current: slug,
      },
      sortOrder: index + 1,
      seoData: {
        _type: 'seo',
        metaTitle: `${title} | Sterling`,
        metaDescription: `Explore ${title} products from Sterling Kitchen and Wardrobe Hardware.`,
        noIndex: false,
      },
    });
  });

  await transaction.commit();

  console.log('Categories successfully added to Sanity!');
}

seedCategories().catch(console.error);
