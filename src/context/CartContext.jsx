import React, { createContext, useContext, useState, useEffect } from 'react';
import { coupons } from '../data/offers';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('freshcart_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('freshcart_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage((current) => (current?.message === message ? null : current));
    }, 3000);
  };

  useEffect(() => {
    try {
      localStorage.setItem('freshcart_cart', JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem('freshcart_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('freshcart_coupon');
      }
    } catch (e) {
      console.error("Failed to save coupon to localStorage", e);
    }
  }, [appliedCoupon]);

  const addToCart = (product, quantityToAdd = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      }
      return [...prev, { product, quantity: quantityToAdd }];
    });
    showToast(`Added ${product.name} to cart`);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const item = prev.find((i) => i.product.id === productId);
      if (item) {
        showToast(`Removed ${item.product.name} from cart`, 'info');
      }
      return prev.filter((i) => i.product.id !== productId);
    });
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const getItemQuantity = (productId) => {
    const item = cart.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const mrpTotal = cart.reduce(
    (sum, item) => sum + item.product.mrp * item.quantity,
    0
  );

  const freeDeliveryThreshold = 499;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const isFreeDeliveryUnlocked = subtotal >= freeDeliveryThreshold && cart.length > 0;

  // Coupon validation & discount
  let couponDiscount = 0;
  let couponError = null;

  if (appliedCoupon && cart.length > 0) {
    if (subtotal < appliedCoupon.minOrder) {
      couponError = `Add items worth ₹${appliedCoupon.minOrder - subtotal} more to keep this coupon`;
    } else if (appliedCoupon.discountType === 'flat') {
      couponDiscount = appliedCoupon.discountValue;
    } else if (appliedCoupon.discountType === 'percentage') {
      const calc = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      couponDiscount = appliedCoupon.maxDiscount ? Math.min(calc, appliedCoupon.maxDiscount) : calc;
    }
  }

  const deliveryFee = cart.length === 0 ? 0 : (isFreeDeliveryUnlocked || appliedCoupon?.discountType === 'free_delivery' ? 0 : 40);
  const total = Math.max(0, subtotal + deliveryFee - couponDiscount);
  const totalSavings = Math.max(0, mrpTotal - subtotal + couponDiscount);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = (code) => {
    const trimmed = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === trimmed);
    if (!found) {
      return { success: false, message: "Invalid promo coupon code" };
    }
    if (subtotal < found.minOrder) {
      return {
        success: false,
        message: `Min. order value for ${found.code} is ₹${found.minOrder}`,
      };
    }
    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied! Saved discount.`);
    return { success: true, message: `Coupon applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast("Coupon removed", "info");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getItemQuantity,
        clearCart,
        subtotal,
        mrpTotal,
        deliveryFee,
        freeDeliveryThreshold,
        amountNeededForFreeDelivery,
        isFreeDeliveryUnlocked,
        appliedCoupon,
        couponDiscount,
        couponError,
        applyCoupon,
        removeCoupon,
        total,
        totalSavings,
        totalItemsCount,
        toastMessage,
        setToastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
