import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from './CartContext';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { showToast } = useCart();
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('freshcart_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('freshcart_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist to localStorage", e);
    }
  }, [wishlist]);

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`Removed ${product.name} from wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Added ${product.name} to wishlist`, 'success');
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
    showToast("Item removed from wishlist", "info");
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
