import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Tag, 
  Copy, 
  Check, 
  ArrowRight, 
  Percent, 
  ShoppingBag, 
  CreditCard,
  Flame,
  ChevronRight
} from 'lucide-react';
import { coupons, superSavingsOffers, comboDeals, bankOffers } from '../data/offers';
import { useCart } from '../context/CartContext';

export const Offers = () => {
  const navigate = useNavigate();
  const { applyCoupon, showToast } = useCart();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    showToast(`Coupon code ${code} copied!`);
    setTimeout(() => {
      setCopiedCode((c) => (c === code ? null : c));
    }, 2500);
  };

  const handleApplyDirectly = (code) => {
    const res = applyCoupon(code);
    if (res.success) {
      navigate('/cart');
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-800 via-brand-900 to-brand-950 p-8 sm:p-12 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FreshCart Savings Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Coupons, Deals & Mega Discounts
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Maximize your grocery budget with verified coupons, curated daily breakfast combos, and exclusive bank cashback deals.
          </p>
        </div>
      </div>

      {/* 1. ACTIVE PROMO COUPONS */}
      <section className="space-y-6">
        <div>
          <div className="flex items-center space-x-2 text-brand-700 mb-1">
            <Tag className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Promo Codes</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Active Cart Coupons
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Apply these during checkout or click "Copy" to save for later.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {coupons.map((coupon) => {
            const isCopied = copiedCode === coupon.code;
            return (
              <div
                key={coupon.code}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-card-hover transition-all p-5 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Tag Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded-md ${coupon.badgeColor}`}>
                    {coupon.tag}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Min ₹{coupon.minOrder}
                  </span>
                </div>

                {/* Code container */}
                <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-3 flex items-center justify-between mb-3">
                  <span className="font-mono font-black text-slate-900 text-base tracking-wider">
                    {coupon.code}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(coupon.code)}
                    className="text-xs font-bold text-slate-600 hover:text-brand-700 flex items-center space-x-1"
                    title="Copy code"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-brand-700" />
                        <span className="text-brand-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {coupon.description}
                </p>

                {/* Action button */}
                <button
                  type="button"
                  onClick={() => handleApplyDirectly(coupon.code)}
                  className="w-full py-2 bg-brand-50 hover:bg-brand-700 text-brand-700 hover:text-white font-bold text-xs rounded-xl border border-brand-200 hover:border-brand-700 transition-colors shadow-2xs text-center"
                >
                  Apply & Go to Cart
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. VALUE COMBO PACKS */}
      <section className="space-y-6 pt-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-600 mb-1">
            <Flame className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Bundle & Save</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Curated Value Combos
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Specially bundled kitchen essentials designed to give you extra savings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comboDeals.map((combo) => (
            <div
              key={combo.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-card-hover transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={combo.image}
                    alt={combo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-md shadow-xs uppercase tracking-wider">
                    {combo.badge}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-slate-900 text-base mb-1">
                    {combo.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {combo.items}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="flex items-center justify-between border-t border-slate-100 pt-3 mb-3">
                  <div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-lg font-black text-slate-900">₹{combo.offerPrice}</span>
                      <span className="text-xs text-slate-400 line-through">₹{combo.originalPrice}</span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600">
                      Save {combo.savings}
                    </span>
                  </div>

                  <Link
                    to="/shop"
                    className="px-4 py-2 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    Explore Shop
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CATEGORY PROMOTIONS */}
      <section className="space-y-6 pt-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Special Category Savings
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Big discounts on whole grocery aisles this week.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {superSavingsOffers.map((offer) => (
            <div
              key={offer.id}
              className={`rounded-2xl p-6 text-white bg-gradient-to-br ${offer.color} shadow-lg flex flex-col justify-between space-y-4 relative overflow-hidden`}
            >
              <div className="space-y-2 relative z-10">
                <span className="inline-block bg-white/20 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {offer.tag}
                </span>
                <h3 className="text-xl font-black leading-tight">
                  {offer.title}
                </h3>
                <p className="text-xs text-white/90 leading-relaxed">
                  {offer.description}
                </p>
              </div>

              <div className="pt-2 relative z-10">
                <Link
                  to={`/shop?category=${offer.categorySlug}`}
                  className="inline-flex items-center space-x-2 bg-white text-slate-900 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-slate-100 transition-colors shadow-xs"
                >
                  <span>Shop Category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BANK & WALLET OFFERS */}
      <section className="space-y-6 pt-4">
        <div>
          <div className="flex items-center space-x-2 text-slate-600 mb-1">
            <CreditCard className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Payment Offers</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Bank & Wallet Discounts
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Instant savings when paying with partner bank cards or UPI wallets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bankOffers.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft hover:border-brand-300 transition-all space-y-2"
            >
              <div className="flex items-center space-x-2.5">
                <span className="text-2xl">{b.icon}</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{b.bank}</h4>
                  <span className="text-[10px] font-semibold text-brand-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                    {b.badge}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
