import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'freshcart.db');
const db = new Database(dbPath);

// Enable WAL mode for better concurrency and performance
db.pragma('journal_mode = WAL');

// Initialize database tables
export const initDatabase = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL,
      productCount TEXT,
      image TEXT NOT NULL,
      description TEXT,
      bgLight TEXT,
      borderColor TEXT
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      brand TEXT,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      mrp REAL NOT NULL,
      discount REAL NOT NULL,
      rating REAL DEFAULT 4.5,
      reviewCount INTEGER DEFAULT 0,
      quantity TEXT,
      inStock INTEGER DEFAULT 1,
      isDeal INTEGER DEFAULT 0,
      isPopular INTEGER DEFAULT 0,
      image TEXT NOT NULL,
      images TEXT,
      description TEXT,
      specifications TEXT,
      nutrition TEXT,
      reviews TEXT
    );

    CREATE TABLE IF NOT EXISTS coupons (
      code TEXT PRIMARY KEY,
      discountType TEXT NOT NULL,
      discountValue REAL NOT NULL,
      maxDiscount REAL,
      minOrder REAL NOT NULL,
      description TEXT,
      tag TEXT,
      badgeColor TEXT
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      customerName TEXT NOT NULL,
      customerPhone TEXT NOT NULL,
      addressJson TEXT NOT NULL,
      slotJson TEXT NOT NULL,
      paymentMethodJson TEXT NOT NULL,
      itemsJson TEXT NOT NULL,
      subtotal REAL NOT NULL,
      deliveryFee REAL NOT NULL,
      couponDiscount REAL NOT NULL,
      total REAL NOT NULL,
      status TEXT DEFAULT 'Confirmed',
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      contact TEXT UNIQUE NOT NULL,
      email TEXT,
      walletBalance REAL DEFAULT 250,
      memberSince TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS addresses (
      id TEXT PRIMARY KEY,
      userId TEXT,
      userContact TEXT NOT NULL,
      tag TEXT DEFAULT 'Home',
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      addressLine TEXT NOT NULL,
      city TEXT NOT NULL,
      pincode TEXT NOT NULL,
      isDefault INTEGER DEFAULT 0,
      createdAt TEXT NOT NULL
    );
  `);

  // Safe migrations for newly added columns
  try { db.exec('ALTER TABLE users ADD COLUMN email TEXT'); } catch { /* column exists */ }
  try { db.exec('ALTER TABLE users ADD COLUMN walletBalance REAL DEFAULT 250'); } catch { /* column exists */ }
};

export default db;
