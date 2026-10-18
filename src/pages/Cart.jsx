import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Truck, 
  Tag, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartItem } from '../components/CartItem';
import { coupons } from '../data/offers';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
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
    totalItemsCount
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState(null);

  const handleApplyCoupon = (codeToApply) => {
    const code = codeToApply || couponInput;
    if (!code.trim()) {
      setCouponFeedback({ type: 'error', message: 'Please enter a coupon code.' });
      return;
    }
    const result = applyCoupon(code);
    if (result.success) {
      setCouponFeedback({ type: 'success', message: result.message });
      setCouponInput('');
    } else {
      setCouponFeedback({ type: 'error', message: result.message });
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponFeedback(null);
  };

  // 4 popular products for recommendations when empty or below threshold
  const recommendedProducts = products.filter((p) => p.isPopular).slice(0, 4);

  // Free delivery progress percentage (0 - 100%)
  const deliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="min-h-[75vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-center">
        {/* Empty Cart Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 text-center border border-slate-200/90 shadow-soft max-w-xl mx-auto w-full animate-fadeIn">
          <div className="w-24 h-24 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-brand-700 shadow-inner">
            <ShoppingBag className="w-12 h-12" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-950 tracking-tight">
            Your Cart is Empty
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-md mx-auto leading-relaxed">
            Looks like you haven't added anything to your cart yet. Explore our fresh vegetables, fruits, dairy, and snacks!
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-xl shadow-md shadow-brand-700/20 transition-all hover:scale-[1.02]"
            >
              <span>Explore Grocery Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/offers"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors text-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>View Offers</span>
            </Link>
          </div>
        </div>

        {/* Quick Picks for empty state */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Popular Essentials</h2>
              <p className="text-xs text-slate-500">Quickly add daily staples to start shopping</p>
            </div>
            <Link to="/shop" className="text-xs font-bold text-brand-700 hover:underline">
              See All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recommendedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Breadcrumb & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-1.5">
            <Link to="/" className="hover:text-brand-700 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link to="/shop" className="hover:text-brand-700 transition-colors">Shop</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-800 font-semibold">Shopping Cart</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-950 tracking-tight flex items-center gap-3">
            <span>Shopping Cart</span>
            <span className="text-sm font-semibold text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
            </span>
          </h1>
        </div>

        {/* Clear Cart Button */}
        <button
          type="button"
          onClick={clearCart}
          className="self-start sm:self-auto inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors px-3 py-2 rounded-xl border border-slate-200 hover:border-rose-200 bg-white"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      {/* Main Grid: Cart Items List (Col 1-2) + Order Summary (Col 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Items & Free Delivery Progress Bar */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          
          {/* Dynamic Free Delivery Progress Bar */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-soft">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isFreeDeliveryUnlocked ? 'bg-emerald-100 text-brand-700' : 'bg-amber-50 text-amber-600'}`}>
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  {isFreeDeliveryUnlocked ? (
                    <p className="text-xs sm:text-sm font-bold text-brand-800">
                      🎉 Free Delivery Unlocked!
                    </p>
                  ) : (
                    <p className="text-xs sm:text-sm font-bold text-slate-800">
                      Add items worth <span className="text-brand-700 font-extrabold">₹{amountNeededForFreeDelivery}</span> more for <span className="text-brand-700 uppercase font-black">FREE Delivery</span>
                    </p>
                  )}
                  <p className="text-[11px] text-slate-500">
                    Threshold: orders ₹{freeDeliveryThreshold} and above (Standard fee: ₹40)
                  </p>
                </div>
              </div>
              <span className="text-xs font-black text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md border border-brand-200">
                {deliveryProgress}%
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isFreeDeliveryUnlocked ? 'bg-brand-600' : 'bg-gradient-to-r from-amber-400 to-brand-500'
                }`}
                style={{ width: `${deliveryProgress}%` }}
              ></div>
            </div>
          </div>

          {/* List of Cart Items */}
          <div className="space-y-3">
            {cart.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          {/* Continue Shopping Link */}
          <div className="pt-2 flex items-center justify-between text-xs font-semibold">
            <Link
              to="/shop"
              className="inline-flex items-center space-x-1 text-brand-700 hover:text-brand-800 hover:underline"
            >
              <span>← Continue Shopping for Groceries</span>
            </Link>
            <span className="text-slate-400">All prices inclusive of applicable taxes</span>
          </div>
        </div>

        {/* Right Side: Order Summary & Promo Code Sidebar */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6 sticky top-24">
          
          {/* Promo Coupon Box */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm mb-3">
              <Tag className="w-4 h-4 text-brand-700" />
              <span>Apply Promo Code</span>
            </div>

            {/* Input & Apply button */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleApplyCoupon();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                placeholder="Enter promo code (e.g. FRESH50)"
                className="flex-1 uppercase font-semibold text-xs px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600 focus:bg-white transition-all"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Apply
              </button>
            </form>

            {/* Inline Coupon Feedback */}
            {couponFeedback && (
              <div
                className={`mt-3 flex items-start space-x-2 text-xs p-2.5 rounded-xl ${
                  couponFeedback.type === 'success'
                    ? 'bg-emerald-50 text-brand-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
              >
                {couponFeedback.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-brand-700 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                )}
                <span>{couponFeedback.message}</span>
              </div>
            )}

            {/* Applied Coupon Status Pill */}
            {appliedCoupon && (
              <div className="mt-3 p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-extrabold text-xs text-brand-800 tracking-wide">
                      {appliedCoupon.code}
                    </span>
                    <span className="text-[10px] bg-emerald-200/80 text-brand-900 font-bold px-1.5 py-0.2 rounded">
                      APPLIED
                    </span>
                  </div>
                  <p className="text-[11px] text-brand-700 mt-0.5">
                    {appliedCoupon.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="text-slate-400 hover:text-rose-600 p-1"
                  aria-label="Remove coupon"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Coupon warning if subtotal dropped below min order */}
            {couponError && (
              <div className="mt-2 text-xs text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200 flex items-center space-x-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>{couponError}</span>
              </div>
            )}

            {/* Quick Available Coupons list to click & apply */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2">
                Available Offers for You
              </p>
              <div className="space-y-2">
                {coupons.slice(0, 2).map((c) => (
                  <div
                    key={c.code}
                    className="flex items-center justify-between p-2.5 bg-slate-50 hover:bg-emerald-50/50 rounded-xl border border-slate-200/80 transition-colors"
                  >
                    <div>
                      <span className="text-xs font-black text-slate-800 tracking-wider font-mono">
                        {c.code}
                      </span>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        {c.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon(c.code)}
                      className="text-xs font-bold text-brand-700 hover:text-brand-800 bg-white px-2.5 py-1 rounded-lg border border-brand-200 shadow-2xs hover:bg-brand-50 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bill Details Summary Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Bill Details
            </h2>

            <div className="space-y-2.5 text-xs text-slate-600">
              {/* MRP Total */}
              <div className="flex items-center justify-between">
                <span>Items MRP Total</span>
                <span className="font-semibold text-slate-800">₹{mrpTotal}</span>
              </div>

              {/* Product Discount */}
              {mrpTotal > subtotal && (
                <div className="flex items-center justify-between text-emerald-600">
                  <span>Product Discount</span>
                  <span className="font-semibold">- ₹{mrpTotal - subtotal}</span>
                </div>
              )}

              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span>Item Subtotal</span>
                <span className="font-semibold text-slate-900">₹{subtotal}</span>
              </div>

              {/* Delivery Fee */}
              <div className="flex items-center justify-between">
                <span>Delivery Partner Fee</span>
                {deliveryFee === 0 ? (
                  <span className="text-brand-700 font-extrabold uppercase tracking-wide">
                    FREE
                  </span>
                ) : (
                  <span className="font-semibold text-slate-900">₹{deliveryFee}</span>
                )}
              </div>

              {/* Promo Coupon Discount */}
              {couponDiscount > 0 && (
                <div className="flex items-center justify-between text-brand-700 font-semibold">
                  <span>Coupon ({appliedCoupon?.code})</span>
                  <span>- ₹{couponDiscount}</span>
                </div>
              )}
            </div>

            {/* Total To Pay */}
            <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between">
              <div>
                <span className="text-sm font-extrabold text-slate-900 block">To Pay</span>
                <span className="text-[11px] text-slate-400">Inclusive of all taxes</span>
              </div>
              <span className="text-2xl font-black text-brand-950">₹{total}</span>
            </div>

            {/* Total Savings Banner */}
            {totalSavings > 0 && (
              <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200/80 text-center">
                <p className="text-xs font-bold text-brand-900">
                  🎉 You are saving ₹{totalSavings} on this order!
                </p>
              </div>
            )}

            {/* Proceed to Checkout Button */}
            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-brand-700 hover:bg-brand-800 text-white font-black text-sm rounded-xl shadow-md shadow-brand-700/25 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Safe & Secure Guarantee */}
            <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              <span>Safe & contactless doorstep delivery</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
