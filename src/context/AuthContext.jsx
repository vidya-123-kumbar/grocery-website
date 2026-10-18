import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  sendLoginOtp,
  verifyLoginOtp,
  getUserProfile,
  updateUserProfile as apiUpdateProfile,
  getUserAddresses,
  saveAddress as apiSaveAddress,
  setDefaultAddress as apiSetDefaultAddress,
  deleteAddress as apiDeleteAddress,
  getUserOrders,
  cancelOrder as apiCancelOrder
} from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('freshcart_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(false);

  // Sync user changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('freshcart_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('freshcart_user');
    }
  }, [user]);

  // Fetch addresses when user changes
  const fetchAddresses = useCallback(async () => {
    if (!user?.contact) {
      setAddresses([]);
      return;
    }
    setLoadingAddresses(true);
    try {
      const data = await getUserAddresses(user.contact);
      setAddresses(data);
    } catch (err) {
      console.warn('Failed to fetch addresses:', err);
    } finally {
      setLoadingAddresses(false);
    }
  }, [user?.contact]);

  // Fetch orders when user changes
  const fetchOrders = useCallback(async () => {
    if (!user?.contact) {
      setOrders([]);
      return;
    }
    setLoadingOrders(true);
    try {
      const data = await getUserOrders(user.contact);
      setOrders(data);
    } catch (err) {
      console.warn('Failed to fetch orders:', err);
    } finally {
      setLoadingOrders(false);
    }
  }, [user?.contact]);

  useEffect(() => {
    if (user?.contact) {
      fetchAddresses();
      fetchOrders();
    }
  }, [user?.contact, fetchAddresses, fetchOrders]);

  // Login handler
  const login = async (contact, otp) => {
    const res = await verifyLoginOtp(contact, otp);
    if (res?.success && res.user) {
      setUser(res.user);
      return { success: true, user: res.user };
    }
    return { success: false, message: res?.message || 'Verification failed' };
  };

  // Instant 1-click Demo Login
  const loginAsDemo = async () => {
    const res = await verifyLoginOtp('9876543210', '5482');
    const demoUser = res?.user || {
      id: 'user-demo',
      name: 'Priya Sharma',
      contact: '9876543210',
      email: 'priya.sharma@example.com',
      memberSince: '2024',
      walletBalance: 350
    };
    setUser(demoUser);
    return demoUser;
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    setAddresses([]);
    setOrders([]);
  };

  // Profile update
  const updateProfile = async ({ name, email }) => {
    if (!user) return { success: false, message: 'Not logged in' };
    const res = await apiUpdateProfile({ contact: user.contact, name, email });
    if (res?.success && res.user) {
      setUser(res.user);
      return { success: true, user: res.user };
    }
    // Optimistic fallback
    const updated = { ...user, name: name || user.name, email: email !== undefined ? email : user.email };
    setUser(updated);
    return { success: true, user: updated };
  };

  // Add Address
  const addAddress = async (addressData) => {
    const payload = {
      ...addressData,
      userContact: user?.contact || '9876543210'
    };
    const res = await apiSaveAddress(payload);
    await fetchAddresses();
    return res;
  };

  // Set Default Address
  const setDefaultAddr = async (id) => {
    const res = await apiSetDefaultAddress(id);
    await fetchAddresses();
    return res;
  };

  // Delete Address
  const removeAddress = async (id) => {
    const res = await apiDeleteAddress(id);
    await fetchAddresses();
    return res;
  };

  // Cancel Order
  const cancelUserOrder = async (orderId, reason) => {
    const res = await apiCancelOrder(orderId, reason);
    if (res?.success) {
      await fetchOrders();
      // If user profile wallet was refunded, refresh user profile
      if (user?.contact) {
        const p = await getUserProfile(user.contact);
        if (p?.user) setUser(p.user);
      }
    }
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: Boolean(user),
        login,
        loginAsDemo,
        logout,
        updateProfile,
        addresses,
        loadingAddresses,
        fetchAddresses,
        addAddress,
        setDefaultAddr,
        removeAddress,
        orders,
        loadingOrders,
        fetchOrders,
        cancelUserOrder
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
