import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Wishlist } from './pages/Wishlist';
import { Offers } from './pages/Offers';
import { Login } from './pages/Login';
import { Account } from './pages/Account';
import { Orders } from './pages/Orders';
import { ShoppingBag } from 'lucide-react';

// Automatically scroll to top on route navigation
const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
};

// 404 Page
const NotFound = () => {
  return (
    <div className="min-h-[70vh] max-w-7xl mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-brand-700 mb-6 shadow-inner">
        <ShoppingBag className="w-10 h-10" />
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 mb-2">
        404 - Page Not Found
      </span>
      <h1 className="text-3xl font-black text-slate-900 mt-2">
        Looking for fresh groceries?
      </h1>
      <p className="text-slate-500 text-sm max-w-md mt-2 mb-8">
        We couldn't find the page you're looking for. Let's get you back to shopping for fresh produce and kitchen essentials.
      </p>
      <Link
        to="/shop"
        className="px-8 py-3.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm rounded-xl shadow-md shadow-brand-700/20 transition-all"
      >
        Go to Grocery Shop
      </Link>
    </div>
  );
};

export const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-brand-100 selection:text-brand-900">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </div>
  );
};

export default App;
