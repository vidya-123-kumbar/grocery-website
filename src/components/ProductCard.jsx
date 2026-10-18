import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { fallbackImage } from '../data/products';

export const ProductCard = ({ product }) => {
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [imgSrc, setImgSrc] = useState(product.image);

  const quantityInCart = getItemQuantity(product.id);
  const isWishlisted = isInWishlist(product.id);

  const handleImageError = () => {
    setImgSrc(fallbackImage);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-card-hover hover:border-brand-300 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      
      {/* Top Badges: Discount + Wishlist Heart */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {product.discount > 0 ? (
          <span className="pointer-events-auto bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
            {product.discount}% OFF
          </span>
        ) : (
          <div></div>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/90 backdrop-blur-xs text-slate-400 hover:text-rose-500 hover:bg-white shadow-xs'
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 transition-transform ${isWishlisted ? 'fill-current scale-110' : ''}`} />
        </button>
      </div>

      {/* Product Image Link */}
      <Link to={`/product/${product.id}`} className="block relative pt-[80%] overflow-hidden bg-slate-50">
        <img
          src={imgSrc}
          alt={product.name}
          onError={handleImageError}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Brand & Quantity */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold uppercase tracking-wider text-brand-700 text-[10px]">
              {product.brand}
            </span>
            <span className="text-slate-400">{product.quantity}</span>
          </div>

          {/* Product Title */}
          <Link
            to={`/product/${product.id}`}
            className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 hover:text-brand-700 transition-colors mb-1.5"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Rating */}
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

        {/* Pricing & Add to Cart Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
          <div className="flex flex-col">
            <div className="flex items-baseline space-x-1.5">
              <span className="text-base font-extrabold text-slate-900">
                ₹{product.price}
              </span>
              {product.mrp > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{product.mrp}
                </span>
              )}
            </div>
            {product.mrp > product.price && (
              <span className="text-[10px] text-emerald-600 font-semibold">
                Save ₹{product.mrp - product.price}
              </span>
            )}
          </div>

          {/* Stepper or Add Button */}
          {quantityInCart > 0 ? (
            <div className="flex items-center bg-brand-700 text-white rounded-xl shadow-xs overflow-hidden">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  updateQuantity(product.id, -1);
                }}
                className="w-7 h-7 flex items-center justify-center hover:bg-brand-800 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 text-xs font-bold min-w-[20px] text-center">
                {quantityInCart}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  updateQuantity(product.id, 1);
                }}
                className="w-7 h-7 flex items-center justify-center hover:bg-brand-800 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="inline-flex items-center space-x-1 px-3 py-1.5 bg-brand-50 hover:bg-brand-700 text-brand-700 hover:text-white font-bold text-xs rounded-xl border border-brand-200 hover:border-brand-700 shadow-2xs transition-all active:scale-95"
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
