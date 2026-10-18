import db, { initDatabase } from './db.js';
import { categories } from '../src/data/categories.js';
import { products } from '../src/data/products.js';
import { coupons } from '../src/data/offers.js';

export const seedDatabase = () => {
  initDatabase();

  // Check if categories need seeding
  const categoryCount = db.prepare('SELECT COUNT(*) as count FROM categories').get().count;
  if (categoryCount === 0) {
    console.log('🌱 Seeding categories into SQLite...');
    const insertCategory = db.prepare(`
      INSERT INTO categories (id, name, slug, productCount, image, description, bgLight, borderColor)
      VALUES (@id, @name, @slug, @productCount, @image, @description, @bgLight, @borderColor)
    `);

    const insertMany = db.transaction((cats) => {
      for (const cat of cats) {
        insertCategory.run({
          id: cat.id,
          name: cat.name,
          slug: cat.slug || cat.id,
          productCount: cat.productCount || '',
          image: cat.image || '',
          description: cat.description || '',
          bgLight: cat.bgLight || 'bg-slate-50',
          borderColor: cat.borderColor || 'border-slate-200'
        });
      }
    });
    insertMany(categories);
    console.log(`✅ Seeded ${categories.length} categories.`);
  }

  // Check if products need seeding
  const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
  if (productCount === 0) {
    console.log('🌱 Seeding products into SQLite...');
    const insertProduct = db.prepare(`
      INSERT INTO products (
        id, name, brand, category, price, mrp, discount, rating, reviewCount,
        quantity, inStock, isDeal, isPopular, image, images, description,
        specifications, nutrition, reviews
      ) VALUES (
        @id, @name, @brand, @category, @price, @mrp, @discount, @rating, @reviewCount,
        @quantity, @inStock, @isDeal, @isPopular, @image, @images, @description,
        @specifications, @nutrition, @reviews
      )
    `);

    const insertManyProducts = db.transaction((prods) => {
      for (const prod of prods) {
        insertProduct.run({
          id: prod.id,
          name: prod.name,
          brand: prod.brand || 'FreshCart',
          category: prod.category,
          price: prod.price,
          mrp: prod.mrp || prod.price,
          discount: prod.discount || 0,
          rating: prod.rating || 4.5,
          reviewCount: prod.reviewCount || 0,
          quantity: prod.quantity || '1 unit',
          inStock: prod.inStock ? 1 : 0,
          isDeal: prod.isDeal ? 1 : 0,
          isPopular: prod.isPopular ? 1 : 0,
          image: prod.image,
          images: JSON.stringify(prod.images || [prod.image]),
          description: prod.description || '',
          specifications: JSON.stringify(prod.specifications || {}),
          nutrition: JSON.stringify(prod.nutrition || {}),
          reviews: JSON.stringify(prod.reviews || [])
        });
      }
    });
    insertManyProducts(products);
    console.log(`✅ Seeded ${products.length} products.`);
  }

  // Check if coupons need seeding
  const couponCount = db.prepare('SELECT COUNT(*) as count FROM coupons').get().count;
  if (couponCount === 0) {
    console.log('🌱 Seeding coupons into SQLite...');
    const insertCoupon = db.prepare(`
      INSERT INTO coupons (code, discountType, discountValue, maxDiscount, minOrder, description, tag, badgeColor)
      VALUES (@code, @discountType, @discountValue, @maxDiscount, @minOrder, @description, @tag, @badgeColor)
    `);

    const insertManyCoupons = db.transaction((cpns) => {
      for (const c of cpns) {
        insertCoupon.run({
          code: c.code,
          discountType: c.discountType,
          discountValue: c.discountValue,
          maxDiscount: c.maxDiscount || null,
          minOrder: c.minOrder || 0,
          description: c.description || '',
          tag: c.tag || '',
          badgeColor: c.badgeColor || 'bg-slate-100 text-slate-800'
        });
      }
    });
    insertManyCoupons(coupons);
    console.log(`✅ Seeded ${coupons.length} coupons.`);
  }

  // Check if users need demo user
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
  if (userCount === 0) {
    console.log('🌱 Seeding demo user...');
    db.prepare(`
      INSERT INTO users (id, name, contact, email, walletBalance, memberSince, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      'user-demo',
      'Priya Sharma',
      '9876543210',
      'priya.sharma@example.com',
      350,
      '2024',
      new Date().toISOString()
    );
  }

  // Check if addresses need initial data
  const addressCount = db.prepare('SELECT COUNT(*) as count FROM addresses').get().count;
  if (addressCount === 0) {
    console.log('🌱 Seeding sample saved addresses...');
    const insertAddr = db.prepare(`
      INSERT INTO addresses (id, userContact, tag, name, phone, addressLine, city, pincode, isDefault, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertAddr.run(
      'addr-1',
      '9876543210',
      'Home',
      'Priya Sharma',
      '9876543210',
      'Flat 402, Green Glen Layout, Outer Ring Road, Bellandur',
      'Bengaluru',
      '560103',
      1,
      new Date().toISOString()
    );

    insertAddr.run(
      'addr-2',
      '9876543210',
      'Work',
      'Priya Sharma (Office)',
      '9876543210',
      'Tower B, 7th Floor, Ecospace Tech Park, Marathahalli - Sarjapur Road',
      'Bengaluru',
      '560103',
      0,
      new Date().toISOString()
    );
  }
};
