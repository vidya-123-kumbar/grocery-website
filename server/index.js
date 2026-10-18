import express from 'express';
import cors from 'cors';
import db from './db.js';
import { seedDatabase } from './seed.js';

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize & Seed Database
try {
  seedDatabase();
} catch (err) {
  console.error('Error during database initialization/seeding:', err);
}

// Format product row from SQLite to JS object
const formatProduct = (p) => {
  if (!p) return null;
  return {
    ...p,
    inStock: Boolean(p.inStock),
    isDeal: Boolean(p.isDeal),
    isPopular: Boolean(p.isPopular),
    images: p.images ? JSON.parse(p.images) : [p.image],
    specifications: p.specifications ? JSON.parse(p.specifications) : {},
    nutrition: p.nutrition ? JSON.parse(p.nutrition) : {},
    reviews: p.reviews ? JSON.parse(p.reviews) : []
  };
};

// ----------------------------------------------------
// Health check
// ----------------------------------------------------
app.get('/api/health', (req, res) => {
  try {
    const row = db.prepare('SELECT COUNT(*) as productCount FROM products').get();
    res.json({
      status: 'healthy',
      service: 'FreshCart Express Backend',
      database: 'SQLite (connected)',
      productCount: row.productCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// ----------------------------------------------------
// Categories API
// ----------------------------------------------------
app.get('/api/categories', (req, res) => {
  try {
    const categories = db.prepare('SELECT * FROM categories').all();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ----------------------------------------------------
// Products API
// ----------------------------------------------------
app.get('/api/products', (req, res) => {
  try {
    const { category, search, sort, minPrice, maxPrice, inStock, limit = 100 } = req.query;

    let query = 'SELECT * FROM products WHERE 1=1';
    const params = {};

    if (category && category !== 'all') {
      query += ' AND category = @category';
      params.category = category;
    }

    if (search && search.trim()) {
      query += ' AND (name LIKE @search OR brand LIKE @search OR description LIKE @search)';
      params.search = `%${search.trim()}%`;
    }

    if (minPrice !== undefined && minPrice !== '') {
      query += ' AND price >= @minPrice';
      params.minPrice = Number(minPrice);
    }

    if (maxPrice !== undefined && maxPrice !== '') {
      query += ' AND price <= @maxPrice';
      params.maxPrice = Number(maxPrice);
    }

    if (inStock === 'true' || inStock === '1') {
      query += ' AND inStock = 1';
    }

    // Sorting
    switch (sort) {
      case 'price-low':
        query += ' ORDER BY price ASC';
        break;
      case 'price-high':
        query += ' ORDER BY price DESC';
        break;
      case 'rating':
        query += ' ORDER BY rating DESC';
        break;
      case 'discount':
        query += ' ORDER BY discount DESC';
        break;
      default:
        query += ' ORDER BY isPopular DESC, rating DESC';
    }

    query += ' LIMIT @limit';
    params.limit = Number(limit);

    const rows = db.prepare(query).all(params);
    const formatted = rows.map(formatProduct);

    res.json({
      success: true,
      count: formatted.length,
      data: formatted
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/products/:id', (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!row) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: formatProduct(row) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ----------------------------------------------------
// Coupons API
// ----------------------------------------------------
app.get('/api/coupons', (req, res) => {
  try {
    const coupons = db.prepare('SELECT * FROM coupons').all();
    res.json({ success: true, data: coupons });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/coupons/validate', (req, res) => {
  try {
    const { code, cartTotal = 0 } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: 'Coupon code is required' });
    }

    const coupon = db.prepare('SELECT * FROM coupons WHERE UPPER(code) = UPPER(?)').get(code.trim());

    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Invalid promo code' });
    }

    if (cartTotal < coupon.minOrder) {
      return res.status(400).json({
        success: false,
        message: `Min. order amount of ₹${coupon.minOrder} required for ${coupon.code}`,
        minOrder: coupon.minOrder
      });
    }

    // Calculate discount
    let discountAmount = 0;
    if (coupon.discountType === 'flat') {
      discountAmount = coupon.discountValue;
    } else if (coupon.discountType === 'percentage') {
      const calculated = (cartTotal * coupon.discountValue) / 100;
      discountAmount = coupon.maxDiscount ? Math.min(calculated, coupon.maxDiscount) : calculated;
    } else if (coupon.discountType === 'free_delivery') {
      discountAmount = coupon.discountValue;
    }

    res.json({
      success: true,
      coupon,
      discountAmount: Math.round(discountAmount)
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ----------------------------------------------------
// ----------------------------------------------------
// Orders API
// ----------------------------------------------------
app.get('/api/orders', (req, res) => {
  try {
    const { contact } = req.query;
    let query = 'SELECT * FROM orders';
    const params = [];

    if (contact && contact.trim()) {
      query += ' WHERE customerPhone = ? OR customerName LIKE ?';
      params.push(contact.trim(), `%${contact.trim()}%`);
    }

    query += ' ORDER BY createdAt DESC LIMIT 50';

    const orders = params.length > 0
      ? db.prepare(query).all(...params)
      : db.prepare(query).all();

    const formatted = orders.map((o) => ({
      ...o,
      address: JSON.parse(o.addressJson || '{}'),
      slot: JSON.parse(o.slotJson || '{}'),
      paymentMethod: JSON.parse(o.paymentMethodJson || '{}'),
      items: JSON.parse(o.itemsJson || '[]')
    }));
    res.json({ success: true, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/orders/:id', (req, res) => {
  try {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({
      success: true,
      data: {
        ...order,
        address: JSON.parse(order.addressJson || '{}'),
        slot: JSON.parse(order.slotJson || '{}'),
        paymentMethod: JSON.parse(order.paymentMethodJson || '{}'),
        items: JSON.parse(order.itemsJson || '[]')
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.patch('/api/orders/:id/cancel', (req, res) => {
  try {
    const { reason = 'Customer requested cancellation' } = req.body || {};
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.status === 'Cancelled') {
      return res.status(400).json({ success: false, message: 'Order is already cancelled' });
    }

    db.prepare('UPDATE orders SET status = ? WHERE id = ?').run('Cancelled', req.params.id);

    // If customer has a user account, refund to wallet
    const user = db.prepare('SELECT * FROM users WHERE contact = ?').get(order.customerPhone);
    if (user) {
      const newBal = (user.walletBalance || 0) + Number(order.total);
      db.prepare('UPDATE users SET walletBalance = ? WHERE id = ?').run(newBal, user.id);
    }

    res.json({
      success: true,
      message: 'Order cancelled successfully. Refund processed to FreshCart wallet.',
      status: 'Cancelled',
      reason
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.patch('/api/orders/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }
    db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, req.params.id);
    res.json({ success: true, message: `Order status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/orders', (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      address,
      slot,
      paymentMethod,
      items,
      subtotal,
      deliveryFee,
      couponDiscount,
      total
    } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ success: false, message: 'Cannot place an empty order' });
    }

    const orderId = `FC-${Math.floor(100000 + Math.random() * 900000)}`;
    const createdAt = new Date().toISOString();

    const insertOrder = db.prepare(`
      INSERT INTO orders (
        id, customerName, customerPhone, addressJson, slotJson, paymentMethodJson,
        itemsJson, subtotal, deliveryFee, couponDiscount, total, status, createdAt
      ) VALUES (
        @id, @customerName, @customerPhone, @addressJson, @slotJson, @paymentMethodJson,
        @itemsJson, @subtotal, @deliveryFee, @couponDiscount, @total, 'Confirmed', @createdAt
      )
    `);

    insertOrder.run({
      id: orderId,
      customerName: customerName || address?.name || 'Customer',
      customerPhone: customerPhone || address?.phone || '9876543210',
      addressJson: JSON.stringify(address || {}),
      slotJson: JSON.stringify(slot || {}),
      paymentMethodJson: JSON.stringify(paymentMethod || {}),
      itemsJson: JSON.stringify(items),
      subtotal: Number(subtotal) || 0,
      deliveryFee: Number(deliveryFee) || 0,
      couponDiscount: Number(couponDiscount) || 0,
      total: Number(total) || 0,
      createdAt
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: {
        id: orderId,
        orderId,
        createdAt,
        total,
        status: 'Confirmed'
      }
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ----------------------------------------------------
// Authentication API
// ----------------------------------------------------
app.post('/api/auth/send-otp', (req, res) => {
  const { phoneOrEmail } = req.body;
  if (!phoneOrEmail) {
    return res.status(400).json({ success: false, message: 'Phone or email is required' });
  }
  // In demo/production, return demo OTP
  res.json({
    success: true,
    message: 'OTP sent successfully',
    demoOtp: '5482'
  });
});

app.post('/api/auth/verify-otp', (req, res) => {
  try {
    const { phoneOrEmail, otp } = req.body;
    if (otp !== '5482') {
      return res.status(400).json({ success: false, message: 'Invalid OTP. Please enter 5482' });
    }

    const contact = phoneOrEmail.trim();
    let user = db.prepare('SELECT * FROM users WHERE contact = ?').get(contact);

    if (!user) {
      const id = `user-${Date.now()}`;
      const name = contact.includes('@') ? contact.split('@')[0] : 'FreshCart Customer';
      const memberSince = new Date().getFullYear().toString();
      const createdAt = new Date().toISOString();

      db.prepare(`
        INSERT INTO users (id, name, contact, memberSince, createdAt)
        VALUES (?, ?, ?, ?, ?)
      `).run(id, name, contact, memberSince, createdAt);

      user = { id, name, contact, memberSince, createdAt };
    }

    res.json({
      success: true,
      message: 'Logged in successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ----------------------------------------------------
// User Profile API
// ----------------------------------------------------
app.get('/api/users/profile', (req, res) => {
  try {
    const { contact } = req.query;
    if (!contact) {
      return res.status(400).json({ success: false, message: 'Contact is required' });
    }
    const user = db.prepare('SELECT * FROM users WHERE contact = ?').get(contact.trim());
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/users/profile', (req, res) => {
  try {
    const { contact, name, email } = req.body;
    if (!contact) {
      return res.status(400).json({ success: false, message: 'Contact is required' });
    }
    const existing = db.prepare('SELECT * FROM users WHERE contact = ?').get(contact.trim());
    if (!existing) {
      const id = `user-${Date.now()}`;
      const memberSince = new Date().getFullYear().toString();
      const createdAt = new Date().toISOString();
      db.prepare(`
        INSERT INTO users (id, name, contact, email, walletBalance, memberSince, createdAt)
        VALUES (?, ?, ?, ?, 250, ?, ?)
      `).run(id, name || 'FreshCart Customer', contact.trim(), email || '', memberSince, createdAt);
    } else {
      db.prepare('UPDATE users SET name = ?, email = ? WHERE contact = ?')
        .run(name || existing.name, email !== undefined ? email : existing.email, contact.trim());
    }
    const updated = db.prepare('SELECT * FROM users WHERE contact = ?').get(contact.trim());
    res.json({ success: true, message: 'Profile updated successfully', user: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ----------------------------------------------------
// Saved Addresses API
// ----------------------------------------------------
app.get('/api/addresses', (req, res) => {
  try {
    const { contact } = req.query;
    let query = 'SELECT * FROM addresses';
    const params = [];

    if (contact) {
      query += ' WHERE userContact = ?';
      params.push(contact.trim());
    }

    query += ' ORDER BY isDefault DESC, createdAt DESC';

    const addresses = params.length > 0
      ? db.prepare(query).all(...params)
      : db.prepare(query).all();

    res.json({
      success: true,
      data: addresses.map(a => ({ ...a, isDefault: Boolean(a.isDefault) }))
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/addresses', (req, res) => {
  try {
    const { userContact = '9876543210', tag = 'Home', name, phone, addressLine, city, pincode, isDefault = false } = req.body;
    if (!name || !phone || !addressLine || !city || !pincode) {
      return res.status(400).json({ success: false, message: 'All address fields are required' });
    }

    const id = `addr-${Date.now()}`;
    const createdAt = new Date().toISOString();

    if (isDefault) {
      db.prepare('UPDATE addresses SET isDefault = 0 WHERE userContact = ?').run(userContact);
    }

    db.prepare(`
      INSERT INTO addresses (id, userContact, tag, name, phone, addressLine, city, pincode, isDefault, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, userContact, tag, name, phone, addressLine, city, pincode, isDefault ? 1 : 0, createdAt);

    res.status(201).json({
      success: true,
      message: 'Address saved successfully',
      data: { id, userContact, tag, name, phone, addressLine, city, pincode, isDefault: Boolean(isDefault), createdAt }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/addresses/:id/default', (req, res) => {
  try {
    const addr = db.prepare('SELECT * FROM addresses WHERE id = ?').get(req.params.id);
    if (!addr) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }
    db.prepare('UPDATE addresses SET isDefault = 0 WHERE userContact = ?').run(addr.userContact);
    db.prepare('UPDATE addresses SET isDefault = 1 WHERE id = ?').run(req.params.id);

    res.json({ success: true, message: 'Default address updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/addresses/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM addresses WHERE id = ?').run(req.params.id);
    res.json({ success: true, message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start listening
const server = app.listen(PORT, () => {
  console.log(`🚀 FreshCart Express Backend running on http://localhost:${PORT}`);
  console.log(`📦 SQLite database ready with persistent storage`);
});

export default app;
