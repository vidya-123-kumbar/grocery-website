import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, Search, PackageOpen } from 'lucide-react';
import { products as initialProducts } from '../data/products';
import { categories as initialCategories } from '../data/categories';
import { getProducts, getCategories } from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { ProductFilter } from '../components/ProductFilter';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query Parameters
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [priceRange, setPriceRange] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [minDiscount, setMinDiscount] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');

  // Mobile Filter Drawer
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state when URL params change
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';
    setSelectedCategory(cat);
    setSearchQuery(search);
  }, [searchParams]);

  // Handle Category Select (also updates URL)
  const handleCategoryChange = (slug) => {
    setSelectedCategory(slug);
    const newParams = new URLSearchParams(searchParams);
    if (slug === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', slug);
    }
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange(1000);
    setMinRating(0);
    setMinDiscount(0);
    setInStockOnly(false);
    setSortBy('popularity');
    setSearchParams({});
  };

  const [allProducts, setAllProducts] = useState(initialProducts);
  const [allCategories, setAllCategories] = useState(initialCategories);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch from backend API
  useEffect(() => {
    let isMounted = true;
    const fetchBackendData = async () => {
      setIsLoading(true);
      try {
        const [prods, cats] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        if (isMounted) {
          if (prods && prods.length) setAllProducts(prods);
          if (cats && cats.length) setAllCategories(cats);
        }
      } catch (err) {
        console.warn('Using local catalog fallback', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchBackendData();
    return () => { isMounted = false; };
  }, []);

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((item) => {
        // Category filter
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchBrand = item.brand.toLowerCase().includes(q);
          const matchCategory = item.category.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchCategory) {
            return false;
          }
        }
        // Price filter
        if (item.price > priceRange) {
          return false;
        }
        // Rating filter
        if (minRating > 0 && item.rating < minRating) {
          return false;
        }
        // Discount filter
        if (minDiscount > 0 && item.discount < minDiscount) {
          return false;
        }
        // In Stock filter
        if (inStockOnly && !item.inStock) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'discount') return b.discount - a.discount;
        // Default: popularity (review count & deal weight)
        return b.reviewCount - a.reviewCount;
      });
  }, [allProducts, selectedCategory, searchQuery, priceRange, minRating, minDiscount, inStockOnly, sortBy]);

  // Current Category Meta
  const currentCategoryObj = allCategories.find((c) => c.slug === selectedCategory);

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Breadcrumb & Page Title */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-950 tracking-tight">
              {searchQuery
                ? `Results for "${searchQuery}"`
                : currentCategoryObj
                ? currentCategoryObj.name
                : "All Grocery Products"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Showing <span className="font-bold text-slate-800">{filteredProducts.length}</span> of {products.length} products
              {selectedLocationText(selectedCategory, searchQuery)}
            </p>
          </div>

          {/* Controls: Sort Dropdown & Mobile Filter Button */}
          <div className="flex items-center space-x-3">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center space-x-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-brand-700" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="shop-sort" className="text-xs text-slate-400 hidden sm:inline font-medium">
                Sort by:
              </label>
              <select
                id="shop-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-bold text-slate-700 bg-transparent border-none focus:outline-none cursor-pointer py-1 pr-1"
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {(selectedCategory !== 'all' || searchQuery || minRating > 0 || minDiscount > 0 || priceRange < 1000 || inStockOnly) && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-200/80">
            <span className="text-xs font-semibold text-slate-400">Active filters:</span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center text-xs bg-brand-50 text-brand-800 font-semibold px-2.5 py-1 rounded-lg border border-brand-200">
                Category: {currentCategoryObj?.name || selectedCategory}
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center text-xs bg-blue-50 text-blue-800 font-semibold px-2.5 py-1 rounded-lg border border-blue-200">
                Search: "{searchQuery}"
              </span>
            )}
            {priceRange < 1000 && (
              <span className="inline-flex items-center text-xs bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-lg">
                Under ₹{priceRange}
              </span>
            )}
            {minRating > 0 && (
              <span className="inline-flex items-center text-xs bg-amber-50 text-amber-800 font-semibold px-2.5 py-1 rounded-lg">
                {minRating}★ & above
              </span>
            )}
            {minDiscount > 0 && (
              <span className="inline-flex items-center text-xs bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-lg">
                {minDiscount}%+ off
              </span>
            )}
            <button
              onClick={handleClearFilters}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline ml-1"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: Sidebar Filters + Products Catalog */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Sidebar Filter (Col 1) */}
        <div className="hidden lg:block lg:col-span-1">
          <ProductFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            minRating={minRating}
            setMinRating={setMinRating}
            minDiscount={minDiscount}
            setMinDiscount={setMinDiscount}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            onClearFilters={handleClearFilters}
            totalResultsCount={filteredProducts.length}
          />
        </div>

        {/* Products Grid (Col 2-4) */}
        <div className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-soft max-w-lg mx-auto my-8">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <PackageOpen className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                No products found
              </h3>
              <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                We couldn't find any groceries matching your exact filter criteria or search query.
              </p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-5 px-6 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Mobile Drawer Filter */}
      {isMobileFilterOpen && (
        <ProductFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategoryChange}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          minRating={minRating}
          setMinRating={setMinRating}
          minDiscount={minDiscount}
          setMinDiscount={setMinDiscount}
          inStockOnly={inStockOnly}
          setInStockOnly={setInStockOnly}
          onClearFilters={handleClearFilters}
          totalResultsCount={filteredProducts.length}
          isMobileDrawer={true}
          onCloseMobile={() => setIsMobileFilterOpen(false)}
        />
      )}

    </div>
  );
};

function selectedLocationText(selectedCategory, searchQuery) {
  if (selectedCategory !== 'all') return ` in category`;
  if (searchQuery) return ` matching query`;
  return '';
}
