import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Flame, 
  Clock, 
  Percent, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CategoryCard } from '../components/CategoryCard';
import { TrustSection } from '../components/TrustSection';

export const Home = () => {
  // Flash deal countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 3, minutes: 30, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter deal products (6 products)
  const dealProducts = products.filter((p) => p.isDeal).slice(0, 6);
  // Popular products (8 products)
  const popularProducts = products.filter((p) => p.isPopular).slice(0, 8);

  const formatDigit = (num) => String(num).padStart(2, '0');

  return (
    <div className="min-h-screen space-y-12 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-[#f8fafc] pt-6 md:pt-10 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Promo Badge */}
              <div className="inline-flex items-center space-x-2 bg-emerald-100/80 border border-emerald-200 text-brand-900 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
                <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-ping"></span>
                <span>FREE DELIVERY ABOVE ₹499</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-950 tracking-tight leading-[1.1]">
                Fresh groceries. <br />
                <span className="text-brand-700">Delivered to your door.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Everything you need for your kitchen, delivered fresh and fast. Farm-fresh vegetables, organic milk, daily staples, and tasty snacks at unbeatable prices.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1">
                <Link
                  to="/shop"
                  className="inline-flex items-center space-x-2 bg-brand-700 hover:bg-brand-800 text-white font-bold px-7 py-3.5 rounded-xl shadow-md shadow-brand-700/20 hover:shadow-lg transition-all"
                >
                  <span>Shop Groceries</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/offers"
                  className="inline-flex items-center space-x-2 bg-white hover:bg-slate-50 text-slate-800 font-bold px-6 py-3.5 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all"
                >
                  <Percent className="w-4 h-4 text-emerald-600" />
                  <span>Explore Offers</span>
                </Link>
              </div>

              {/* Customer Guarantee Micro-stats */}
              <div className="pt-2 flex items-center justify-center lg:justify-start space-x-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center space-x-1.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-brand-700 flex items-center justify-center text-[10px] font-bold">✓</div>
                  <span>100% Organic Sourced</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-brand-700 flex items-center justify-center text-[10px] font-bold">✓</div>
                  <span>Instant Replacement</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background decorative blob */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-brand-300/30 to-emerald-200/40 rounded-3xl filter blur-xl"></div>
                
                {/* Main Hero Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
                    alt="Fresh vegetables, fruits, and grocery bag"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  {/* Floating Micro Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                        ⚡
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Express Delivery Active</p>
                        <p className="text-[11px] text-slate-500">Order now for delivery within 30 mins</p>
                      </div>
                    </div>
                    <Link to="/shop" className="text-xs font-bold text-brand-700 hover:text-brand-800">
                      Order →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST VALUE PROPOSITIONS */}
      <TrustSection />

      {/* 3. SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-950 tracking-tight">
              Shop by Category
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Everything you need, all in one place. Handpicked for everyday freshness.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center space-x-1 text-sm font-bold text-brand-700 hover:text-brand-800 hover:underline"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 8 Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* 4. FLASH DEALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 via-brand-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white mb-6 shadow-xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-amber-400 text-slate-950 px-2.5 py-1 rounded-md text-xs font-black uppercase tracking-wider mb-2">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>HOT DEALS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Today's Best Deals
              </h2>
              <p className="text-emerald-200 text-sm mt-1">
                Limited-time offers on everyday essentials. Grab them before stock runs out!
              </p>
            </div>

            {/* Countdown timer */}
            <div className="flex items-center space-x-2 bg-black/25 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
              <Clock className="w-5 h-5 text-amber-400 mr-1" />
              <div className="flex items-center space-x-1 text-center font-mono">
                <div className="bg-white/10 px-2.5 py-1.5 rounded-lg">
                  <span className="text-lg font-bold block">{formatDigit(timeLeft.hours)}</span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-300">HRS</span>
                </div>
                <span className="text-lg font-bold text-amber-400">:</span>
                <div className="bg-white/10 px-2.5 py-1.5 rounded-lg">
                  <span className="text-lg font-bold block">{formatDigit(timeLeft.minutes)}</span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-300">MIN</span>
                </div>
                <span className="text-lg font-bold text-amber-400">:</span>
                <div className="bg-white/10 px-2.5 py-1.5 rounded-lg">
                  <span className="text-lg font-bold block">{formatDigit(timeLeft.seconds)}</span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-300">SEC</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deals Product Grid (6 items) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {dealProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 5. POPULAR PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-950 tracking-tight">
              Popular Products
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Top daily kitchen staples, fresh produce, and beverages ordered most in your area.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center space-x-1 text-sm font-bold text-brand-700 hover:text-brand-800"
          >
            <span>Explore All 35+ Items</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 cols desktop, 3 cols tablet, 2 cols mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {popularProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 6. PROMOTIONAL SAVINGS CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-600 to-brand-700 p-8 sm:p-12 text-white shadow-xl">
          <div className="max-w-xl space-y-4 relative z-10">
            <span className="inline-block bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              Special Weekend Coupon
            </span>
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight">
              Get ₹50 OFF On Your Everyday Grocery Order
            </h3>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Use promo code <strong className="bg-white text-brand-900 px-2 py-0.5 rounded font-mono">FRESH50</strong> at checkout for minimum basket value of ₹399. Fresh veggies, dairy, and snacks delivered right away.
            </p>
            <div className="pt-2">
              <Link
                to="/offers"
                className="inline-flex items-center space-x-2 bg-white text-brand-800 font-bold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors shadow-sm"
              >
                <span>View All Promo Codes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
