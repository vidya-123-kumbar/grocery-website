import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, ShoppingCart, Star, ChevronRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { fallbackImage, products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  // Recommendations for empty wishlist
  const popularItems = products.filter((p) => p.isPopular).slice(0, 4);

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[75vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-center">
        <div className="bg-white rounded-3xl p-8 sm:p-14 text-center border border-slate-200/90 shadow-soft max-w-xl mx-auto w-full animate-fadeIn">
          <div className="w-24 h-24 bg-rose-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-rose-500 shadow-inner">
            <Heart className="w-12 h-12" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-950 tracking-tight">
            Your Wishlist is Empty
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-md mx-auto leading-relaxed">
            Save items you love by tapping the heart icon on any product card. They'll be waiting here for your next grocery order!
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-xl shadow-md shadow-brand-700/20 transition-all hover:scale-[1.02]"
            >
              <span>Explore Grocery Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Recommended Items */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Explore Top Picks</h2>
              <p className="text-xs text-slate-500">Popular items customers love</p>
            </div>
            <Link to="/shop" className="text-xs font-bold text-brand-700 hover:underline">
              See All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {popularItems.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-1.5">
            <Link to="/" className="hover:text-brand-700 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-800 font-semibold">My Wishlist</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-950 tracking-tight flex items-center gap-3">
            <span>My Wishlist</span>
            <span className="text-sm font-semibold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
            </span>
          </h1>
        </div>

        <button
          type="button"
          onClick={clearWishlist}
          className="self-start sm:self-auto inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors px-3 py-2 rounded-xl border border-slate-200 hover:border-rose-200 bg-white"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Wishlist</span>
        </button>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-card-hover transition-all flex flex-col justify-between overflow-hidden"
          >
            {/* Remove button (Heart / Trash) */}
            <div className="absolute top-3 right-3 z-10">
              <button
                type="button"
                onClick={() => removeFromWishlist(product.id)}
                className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-rose-500 hover:bg-rose-50 flex items-center justify-center shadow-xs transition-colors"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Discount Badge */}
            {product.discount > 0 && (
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                  {product.discount}% OFF
                </span>
              </div>
            )}

            {/* Product Image */}
            <Link to={`/product/${product.id}`} className="block relative pt-[75%] bg-slate-50 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => (e.target.src = fallbackImage)}
                className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              />
            </Link>

            {/* Product Body */}
            <div className="p-4 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-semibold uppercase tracking-wider text-brand-700 text-[10px]">
                    {product.brand}
                  </span>
                  <span className="text-slate-400">{product.quantity}</span>
                </div>

                <Link
                  to={`/product/${product.id}`}
                  className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 hover:text-brand-700 transition-colors mb-1.5"
                >
                  {product.name}
                </Link>

                <div className="flex items-center space-x-1.5 mb-3">
                  <div className="inline-flex items-center space-x-0.5 bg-amber-50 px-1.5 py-0.5 rounded text-[11px] font-bold text-amber-800">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    ({product.reviewCount})
                  </span>
                </div>
              </div>

              {/* Price & Move to Cart Button */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-base font-extrabold text-slate-900">₹{product.price}</span>
                  {product.mrp > product.price && (
                    <span className="text-xs text-slate-400 line-through">₹{product.mrp}</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleMoveToCart(product)}
                  className="w-full py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center space-x-2 transition-all active:scale-98"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Move to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
