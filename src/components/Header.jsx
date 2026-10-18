import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  ShoppingCart, 
  Heart, 
  User, 
  MapPin, 
  ChevronDown, 
  Menu, 
  X, 
  Search, 
  Sparkles,
  Percent,
  Check,
  Package,
  LogOut
} from 'lucide-react';
import { SearchBar } from './SearchBar';
import { Navbar } from './Navbar';
import { LocationModal } from './LocationModal';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export const Header = () => {
  const { totalItemsCount, subtotal } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isLoggedIn, logout } = useAuth();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const location = useLocation();

  // Selected delivery location
  const [deliveryLocation, setDeliveryLocation] = useState(() => {
    try {
      const saved = localStorage.getItem('freshcart_location');
      return saved ? JSON.parse(saved) : { city: "Bengaluru", area: "Koramangala" };
    } catch {
      return { city: "Bengaluru", area: "Koramangala" };
    }
  });

  const handleSelectLocation = (newLoc) => {
    setDeliveryLocation(newLoc);
    try {
      localStorage.setItem('freshcart_location', JSON.stringify(newLoc));
    } catch (e) {
      console.error("Failed to save location", e);
    }
  };

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  }, [location.pathname, location.search]);

  return (
    <>
      {/* Top Notification Announcement Strip */}
      <div className="bg-brand-950 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="bg-brand-500 text-brand-950 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
              EXPRESS
            </span>
            <p className="font-medium text-emerald-100 hidden sm:inline">
              ⚡ Guaranteed 15-30 mins delivery in selected zones of {deliveryLocation.city}
            </p>
            <p className="font-medium text-emerald-100 sm:hidden">
              ⚡ Free delivery on orders above ₹499
            </p>
          </div>
          <div className="flex items-center space-x-4 text-emerald-200">
            <Link to="/offers" className="hover:text-white transition-colors flex items-center space-x-1 font-medium">
              <Percent className="w-3 h-3" />
              <span>Use Code <strong>FRESH50</strong> for ₹50 OFF</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-3 md:gap-6">
            
            {/* Left: Mobile Menu Trigger + Brand Logo */}
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-slate-600 hover:text-brand-700 hover:bg-slate-100 rounded-xl md:hidden transition-colors"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* FreshCart Logo */}
              <Link to="/" className="flex items-center space-x-2.5 group flex-shrink-0">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 text-white flex items-center justify-center shadow-md shadow-brand-700/20 group-hover:scale-105 transition-transform">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                      Fresh<span className="text-brand-700">Cart</span>
                    </span>
                    <span className="w-2 h-2 rounded-full bg-brand-500 ml-1"></span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase -mt-0.5">
                    Freshness at your doorstep
                  </span>
                </div>
              </Link>
            </div>

            {/* Location Selector (Desktop) */}
            <div className="hidden lg:block">
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                className="flex items-center space-x-2 text-left px-3 py-1.5 rounded-xl border border-slate-200/80 hover:border-brand-500 hover:bg-slate-50 transition-all group"
                aria-label="Change delivery location"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-brand-700 flex items-center justify-center group-hover:bg-brand-700 group-hover:text-white transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    Deliver to
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-semibold text-slate-800 max-w-[130px] truncate">
                      {deliveryLocation.area ? `${deliveryLocation.area}, ` : ''}{deliveryLocation.city}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-700 transition-colors" />
                  </div>
                </div>
              </button>
            </div>

            {/* Search Bar (Desktop/Tablet) */}
            <div className="hidden md:flex flex-1 max-w-md lg:max-w-xl mx-2">
              <SearchBar />
            </div>

            {/* Right Action Icons: Search (Mobile), Wishlist, Account, Cart */}
            <div className="flex items-center space-x-1.5 sm:space-x-3">
              {/* Mobile Search Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className="p-2.5 text-slate-600 hover:text-brand-700 hover:bg-slate-100 rounded-xl md:hidden transition-colors"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Icon with count badge */}
              <Link
                to="/wishlist"
                className="relative p-2.5 text-slate-600 hover:text-brand-700 hover:bg-brand-50/70 rounded-xl transition-colors group"
                aria-label="View Wishlist"
              >
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {wishlistCount > 0 && (
                  <span className="absolute 1 top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scaleUp">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account Dropdown */}
              <div className="relative hidden sm:block">
                {user ? (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                      className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-emerald-200/80 bg-emerald-50/50 hover:bg-emerald-100/60 text-slate-800 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-lg bg-brand-700 text-white font-bold text-xs flex items-center justify-center">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-xs font-bold max-w-[90px] truncate">
                        {user.name.split(' ')[0]}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {/* Dropdown Menu */}
                    {isAccountMenuOpen && (
                      <div
                        className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-fadeIn"
                        onMouseLeave={() => setIsAccountMenuOpen(false)}
                      >
                        <div className="px-4 py-2 border-b border-slate-100">
                          <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                          <p className="text-[10px] text-slate-400 truncate">{user.contact}</p>
                          <span className="inline-block mt-1 text-[9px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            VIP Member
                          </span>
                        </div>

                        <div className="py-1 text-xs">
                          <Link
                            to="/account"
                            onClick={() => setIsAccountMenuOpen(false)}
                            className="flex items-center space-x-2.5 px-4 py-2 text-slate-700 hover:bg-emerald-50 hover:text-brand-700 font-medium"
                          >
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            <span>My Account & Profile</span>
                          </Link>
                          <Link
                            to="/orders"
                            onClick={() => setIsAccountMenuOpen(false)}
                            className="flex items-center space-x-2.5 px-4 py-2 text-slate-700 hover:bg-emerald-50 hover:text-brand-700 font-medium"
                          >
                            <Package className="w-3.5 h-3.5 text-brand-700" />
                            <span>My Orders & Tracking</span>
                          </Link>
                          <Link
                            to="/account?tab=addresses"
                            onClick={() => setIsAccountMenuOpen(false)}
                            className="flex items-center space-x-2.5 px-4 py-2 text-slate-700 hover:bg-emerald-50 hover:text-brand-700 font-medium"
                          >
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>Saved Addresses</span>
                          </Link>
                        </div>

                        <div className="border-t border-slate-100 pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAccountMenuOpen(false);
                              logout();
                            }}
                            className="w-full flex items-center space-x-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/account"
                    className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-brand-700 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-500" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>

              {/* Cart Button with animated badge and subtotal */}
              <Link
                to="/cart"
                className="flex items-center space-x-2.5 bg-brand-700 hover:bg-brand-800 text-white px-3.5 sm:px-4 py-2.5 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all group"
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  {totalItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-900 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-brand-700">
                      {totalItemsCount}
                    </span>
                  )}
                </div>
                <div className="hidden lg:flex flex-col text-left leading-tight">
                  <span className="text-[10px] uppercase font-bold text-emerald-100 tracking-wider">
                    {totalItemsCount === 1 ? '1 Item' : `${totalItemsCount} Items`}
                  </span>
                  <span className="text-xs font-bold">₹{subtotal}</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile Search Input Drawer (Collapsible) */}
          {isMobileSearchOpen && (
            <div className="pb-3 md:hidden animate-fadeIn">
              <SearchBar isMobile onSearchComplete={() => setIsMobileSearchOpen(false)} />
            </div>
          )}
        </div>

        {/* Category Navigation Bar below header */}
        <Navbar />
      </header>

      {/* Location Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        selectedLocation={deliveryLocation}
        onSelectLocation={handleSelectLocation}
      />

      {/* Mobile Drawer (Slide-out Navigation) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-900/60 backdrop-blur-sm flex">
          <div className="bg-white w-4/5 max-w-sm h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideRight">
            
            {/* Drawer Top */}
            <div>
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-brand-700 text-white flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-slate-900 text-lg">FreshCart</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Delivery location mobile button */}
              <div className="p-4 border-b border-slate-100 bg-slate-50">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsLocationModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between text-left p-2.5 bg-white rounded-xl border border-slate-200"
                >
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-brand-700" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Delivering to</p>
                      <p className="text-xs font-semibold text-slate-800 truncate">
                        {deliveryLocation.area ? `${deliveryLocation.area}, ` : ''}{deliveryLocation.city}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-brand-700 font-semibold">Change</span>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="p-4 space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                  Shop by Category
                </p>
                <Link
                  to="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                >
                  All Products
                </Link>
                <Link
                  to="/shop?category=fruits-vegetables"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                >
                  Fruits & Vegetables
                </Link>
                <Link
                  to="/shop?category=dairy-eggs"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                >
                  Dairy & Eggs
                </Link>
                <Link
                  to="/shop?category=staples"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                >
                  Rice & Staples
                </Link>
                <Link
                  to="/shop?category=snacks"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                >
                  Snacks & Munchies
                </Link>
                <Link
                  to="/shop?category=beverages"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                >
                  Beverages
                </Link>
                <Link
                  to="/shop?category=bakery"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                >
                  Bakery
                </Link>
                <Link
                  to="/shop?category=personal-care"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                >
                  Personal Care
                </Link>
                <Link
                  to="/shop?category=household"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                >
                  Household
                </Link>
                <Link
                  to="/offers"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors mt-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Offers & Coupons</span>
                </Link>
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="p-4 border-t border-slate-100 space-y-2 bg-slate-50">
              <Link
                to="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm"
              >
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>My Wishlist</span>
                </div>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full font-bold text-slate-600">
                  {wishlistCount}
                </span>
              </Link>

              {user ? (
                <>
                  <Link
                    to="/orders"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-brand-700" />
                      <span>My Orders & Tracking</span>
                    </div>
                    <span className="text-xs text-brand-700 font-bold">Track</span>
                  </Link>

                  <Link
                    to="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-brand-700 text-white font-semibold text-sm shadow-sm"
                  >
                    <User className="w-4 h-4" />
                    <span>My Account ({user.name.split(' ')[0]})</span>
                  </Link>
                </>
              ) : (
                <Link
                  to="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-brand-700 text-white font-semibold text-sm shadow-sm"
                >
                  <User className="w-4 h-4" />
                  <span>Login / Register</span>
                </Link>
              )}
            </div>
          </div>
          {/* Backdrop click area */}
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)}></div>
        </div>
      )}
    </>
  );
};
