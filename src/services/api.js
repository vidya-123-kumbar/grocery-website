import { products as fallbackProducts } from '../data/products';
import { categories as fallbackCategories } from '../data/categories';
import { coupons as fallbackCoupons } from '../data/offers';

const API_BASE = 'http://localhost:5050/api';

/**
 * Fetch health status of backend and database
 */
export const checkApiHealth = async () => {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (err) {
    console.warn('Backend server not reachable, using offline mode:', err.message);
    return null;
  }
};

/**
 * Fetch all categories
 */
export const getCategories = async () => {
  try {
    const res = await fetch(`${API_BASE}/categories`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error('Failed to fetch categories');
    const json = await res.json();
    return json.data || fallbackCategories;
  } catch {
    return fallbackCategories;
  }
};

/**
 * Fetch products with optional filtering & sorting
 */
export const getProducts = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'all') params.append('category', filters.category);
    if (filters.search) params.append('search', filters.search);
    if (filters.sort) params.append('sort', filters.sort);
    if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice);
    if (filters.inStock) params.append('inStock', 'true');
    if (filters.limit) params.append('limit', filters.limit);

    const url = `${API_BASE}/products?${params.toString()}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(3500) });
    if (!res.ok) throw new Error('Failed to fetch products');
    const json = await res.json();
    return json.data || fallbackProducts;
  } catch {
    // Client-side fallback filter
    return fallbackProducts.filter((p) => {
      if (filters.category && filters.category !== 'all' && p.category !== filters.category) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
      }
      return true;
    });
  }
};

/**
 * Fetch single product by ID
 */
export const getProductById = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error('Product not found');
    const json = await res.json();
    return json.data;
  } catch {
    return fallbackProducts.find((p) => p.id === id) || null;
  }
};

/**
 * Fetch available coupons
 */
export const getCoupons = async () => {
  try {
    const res = await fetch(`${API_BASE}/coupons`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error('Failed to fetch coupons');
    const json = await res.json();
    return json.data || fallbackCoupons;
  } catch {
    return fallbackCoupons;
  }
};

/**
 * Validate coupon code against cart total
 */
export const validateCoupon = async (code, cartTotal) => {
  try {
    const res = await fetch(`${API_BASE}/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, cartTotal }),
      signal: AbortSignal.timeout(3000)
    });
    return await res.json();
  } catch {
    // Fallback client-side coupon check
    const cpn = fallbackCoupons.find((c) => c.code.toUpperCase() === code.toUpperCase());
    if (!cpn) return { success: false, message: 'Invalid promo code' };
    if (cartTotal < cpn.minOrder) {
      return { success: false, message: `Min. order amount of ₹${cpn.minOrder} required for ${cpn.code}` };
    }
    let discountAmount = 0;
    if (cpn.discountType === 'flat') discountAmount = cpn.discountValue;
    else if (cpn.discountType === 'percentage') {
      const calc = (cartTotal * cpn.discountValue) / 100;
      discountAmount = cpn.maxDiscount ? Math.min(calc, cpn.maxDiscount) : calc;
    } else if (cpn.discountType === 'free_delivery') {
      discountAmount = cpn.discountValue;
    }
    return { success: true, coupon: cpn, discountAmount: Math.round(discountAmount) };
  }
};

/**
 * Submit order to backend & database
 */
export const createOrder = async (orderPayload) => {
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload),
      signal: AbortSignal.timeout(4000)
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || 'Failed to place order');
    return json;
  } catch (err) {
    console.warn('Backend order submission fallback:', err.message);
    const orderId = `FC-${Math.floor(100000 + Math.random() * 900000)}`;
    return {
      success: true,
      message: 'Order placed successfully',
      order: {
        id: orderId,
        orderId,
        createdAt: new Date().toISOString(),
        total: orderPayload.total,
        status: 'Confirmed'
      }
    };
  }
};

/**
 * Send OTP for Login
 */
export const sendLoginOtp = async (phoneOrEmail) => {
  try {
    const res = await fetch(`${API_BASE}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneOrEmail }),
      signal: AbortSignal.timeout(3000)
    });
    return await res.json();
  } catch {
    return { success: true, demoOtp: '5482' };
  }
};

/**
 * Verify OTP and persist user in DB
 */
export const verifyLoginOtp = async (phoneOrEmail, otp) => {
  try {
    const res = await fetch(`${API_BASE}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneOrEmail, otp }),
      signal: AbortSignal.timeout(3000)
    });
    return await res.json();
  } catch {
    return {
      success: true,
      user: {
        id: `user-${Date.now()}`,
        name: phoneOrEmail.includes('@') ? phoneOrEmail.split('@')[0] : 'FreshCart Customer',
        contact: phoneOrEmail,
        memberSince: '2026'
      }
    };
  }
};

/**
 * Fetch orders for a user or all orders
 */
export const getUserOrders = async (contact) => {
  try {
    const url = contact ? `${API_BASE}/orders?contact=${encodeURIComponent(contact)}` : `${API_BASE}/orders`;
    const res = await fetch(url, { signal: AbortSignal.timeout(3500) });
    if (!res.ok) throw new Error('Failed to fetch orders');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn('Backend order fetch failed, using fallback:', err.message);
    return [];
  }
};

/**
 * Cancel an order
 */
export const cancelOrder = async (orderId, reason = 'Customer requested cancellation') => {
  try {
    const res = await fetch(`${API_BASE}/orders/${orderId}/cancel`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason }),
      signal: AbortSignal.timeout(3500)
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

/**
 * Fetch user profile from database
 */
export const getUserProfile = async (contact) => {
  try {
    const res = await fetch(`${API_BASE}/users/profile?contact=${encodeURIComponent(contact)}`, {
      signal: AbortSignal.timeout(3000)
    });
    if (!res.ok) throw new Error('Failed to fetch profile');
    return await res.json();
  } catch {
    return null;
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (profileData) => {
  try {
    const res = await fetch(`${API_BASE}/users/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData),
      signal: AbortSignal.timeout(3000)
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

/**
 * Fetch user saved addresses
 */
export const getUserAddresses = async (contact) => {
  try {
    const url = contact ? `${API_BASE}/addresses?contact=${encodeURIComponent(contact)}` : `${API_BASE}/addresses`;
    const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error('Failed to fetch addresses');
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
};

/**
 * Save new address
 */
export const saveAddress = async (addressData) => {
  try {
    const res = await fetch(`${API_BASE}/addresses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addressData),
      signal: AbortSignal.timeout(3000)
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

/**
 * Set default address
 */
export const setDefaultAddress = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/addresses/${id}/default`, {
      method: 'PUT',
      signal: AbortSignal.timeout(3000)
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

/**
 * Delete saved address
 */
export const deleteAddress = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/addresses/${id}`, {
      method: 'DELETE',
      signal: AbortSignal.timeout(3000)
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

