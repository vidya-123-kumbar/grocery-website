import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { products, fallbackImage } from '../data/products';

export const SearchBar = ({ isMobile = false, onSearchComplete }) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed.length >= 1) {
      const filtered = products
        .filter((item) => {
          return (
            item.name.toLowerCase().includes(trimmed) ||
            item.brand.toLowerCase().includes(trimmed) ||
            item.category.toLowerCase().includes(trimmed) ||
            (item.description && item.description.toLowerCase().includes(trimmed))
          );
        })
        .slice(0, 6);
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      if (onSearchComplete) onSearchComplete();
    }
  };

  const handleSelectProduct = (productId) => {
    setIsOpen(false);
    setQuery("");
    navigate(`/product/${productId}`);
    if (onSearchComplete) onSearchComplete();
  };

  return (
    <div ref={searchContainerRef} className={`relative w-full ${isMobile ? '' : 'max-w-md lg:max-w-xl'}`}>
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          placeholder="Search fruits, milk, snacks, atta, essentials..."
          className="w-full pl-10 pr-9 py-2.5 bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 text-sm rounded-xl border border-transparent focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSuggestions([]);
              setIsOpen(false);
            }}
            className="absolute right-3 p-1 text-slate-400 hover:text-slate-600"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 overflow-hidden">
          {suggestions.length > 0 ? (
            <div>
              <div className="px-4 py-1.5 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Matching Products
              </div>
              <ul className="divide-y divide-slate-50">
                {suggestions.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleSelectProduct(item.id)}
                      className="w-full flex items-center px-4 py-2.5 hover:bg-slate-50 text-left transition-colors group"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={(e) => {
                          e.target.src = fallbackImage;
                        }}
                        className="w-10 h-10 object-cover rounded-lg border border-slate-100 flex-shrink-0 mr-3"
                      />
                      <div className="flex-1 min-w-0 pr-2">
                        <p className="text-xs text-brand-700 font-medium uppercase tracking-wider">{item.brand}</p>
                        <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-brand-700 transition-colors">
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-500">{item.quantity}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-sm font-bold text-slate-900">₹{item.price}</span>
                        {item.mrp > item.price && (
                          <span className="text-xs text-slate-400 line-through block">₹{item.mrp}</span>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="px-3 pt-2 pb-1 border-t border-slate-100 mt-1">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center space-x-1.5 py-2 text-xs font-semibold text-brand-700 hover:text-brand-800 bg-brand-50/70 hover:bg-brand-50 rounded-lg transition-colors"
                >
                  <span>View all results for "{query}"</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="px-4 py-6 text-center text-slate-500 text-sm">
              <p className="font-medium text-slate-700">No products found</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for 'milk', 'apple', 'atta', or 'chips'</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
