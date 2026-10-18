import React from 'react';
import { Star, RotateCcw, X, Check } from 'lucide-react';
import { categories } from '../data/categories';

export const ProductFilter = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  minDiscount,
  setMinDiscount,
  inStockOnly,
  setInStockOnly,
  onClearFilters,
  totalResultsCount,
  isMobileDrawer = false,
  onCloseMobile
}) => {
  const content = (
    <div className="space-y-6">
      {/* Header for Filter section */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Filters</h3>
          <p className="text-xs text-slate-500">Refine catalog products</p>
        </div>
        <button
          type="button"
          onClick={onClearFilters}
          className="inline-flex items-center space-x-1 text-xs text-brand-700 hover:text-brand-800 font-semibold transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
          Category
        </label>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-all ${
              selectedCategory === 'all'
                ? 'bg-brand-700 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>All Categories</span>
            {selectedCategory === 'all' && <Check className="w-3.5 h-3.5" />}
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-all ${
                  isSelected
                    ? 'bg-brand-700 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="truncate">{cat.name}</span>
                {isSelected && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Max Price
          </label>
          <span className="text-sm font-extrabold text-brand-700">₹{priceRange}</span>
        </div>
        <input
          type="range"
          min="20"
          max="1000"
          step="10"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-brand-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
        />
        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5 font-medium">
          <span>₹20</span>
          <span>₹500</span>
          <span>₹1,000</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="pt-2 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
          Customer Rating
        </label>
        <div className="space-y-1.5">
          {[4, 3, 2].map((stars) => {
            const isSelected = minRating === stars;
            return (
              <label
                key={stars}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl cursor-pointer text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-brand-50 border-brand-500 text-brand-900 font-semibold'
                    : 'border-slate-200/80 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="rating"
                  checked={isSelected}
                  onChange={() => setMinRating(isSelected ? 0 : stars)}
                  className="accent-brand-700"
                />
                <div className="flex items-center space-x-1">
                  <div className="flex text-amber-400">
                    {[...Array(stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span>& above</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Discount Filter */}
      <div className="pt-2 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
          Discount
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {[10, 20, 30].map((disc) => {
            const isSelected = minDiscount === disc;
            return (
              <button
                key={disc}
                type="button"
                onClick={() => setMinDiscount(isSelected ? 0 : disc)}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                  isSelected
                    ? 'bg-brand-700 text-white border-brand-700 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-brand-400'
                }`}
              >
                {disc}%+
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability / In-Stock Toggle */}
      <div className="pt-2 border-t border-slate-100">
        <label className="flex items-center justify-between cursor-pointer py-1">
          <span className="text-xs font-bold text-slate-700">In Stock Only</span>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded text-brand-700 accent-brand-700 cursor-pointer"
          />
        </label>
      </div>
    </div>
  );

  if (isMobileDrawer) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end">
        <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between animate-slideLeft">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-800 text-lg">Filter Products</h2>
              <button
                onClick={onCloseMobile}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {content}
          </div>
          <div className="pt-4 mt-6 border-t border-slate-100">
            <button
              onClick={onCloseMobile}
              className="w-full py-3 bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
            >
              Apply Filters ({totalResultsCount} products)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <aside className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft sticky top-36">
      {content}
    </aside>
  );
};
