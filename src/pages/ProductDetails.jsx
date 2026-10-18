import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Zap, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ChevronRight,
  Share2
} from 'lucide-react';
import { products, fallbackImage } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const product = products.find((p) => p.id === id);

  const [activeImage, setActiveImage] = useState(product?.image);
  const [selectedQty, setSelectedQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Reset active image and quantity when product changes
  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setSelectedQty(1);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-2xl font-bold text-slate-800">Product Not Found</h2>
        <p className="text-slate-500 mt-2 mb-6">The grocery item you're looking for does not exist.</p>
        <Link to="/shop" className="px-6 py-2.5 bg-brand-700 text-white rounded-xl font-bold text-sm">
          Return to Shop
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image];

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedQty);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedQty);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-brand-700 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/shop" className="hover:text-brand-700 transition-colors">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link
          to={`/shop?category=${product.category}`}
          className="capitalize hover:text-brand-700 transition-colors"
        >
          {product.category.replace('-', ' ')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Product Hero Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        
        {/* Left Column: Image Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Large Image Container */}
          <div className="relative pt-[90%] bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center p-6">
            <img
              src={activeImage}
              alt={product.name}
              onError={() => setActiveImage(fallbackImage)}
              className="absolute inset-0 w-full h-full object-contain p-6 hover:scale-105 transition-transform duration-500"
            />
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="flex items-center space-x-3 overflow-x-auto pb-1">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`relative w-18 h-18 rounded-xl border-2 overflow-hidden flex-shrink-0 bg-slate-50 p-1 transition-all ${
                    activeImage === img
                      ? 'border-brand-600 ring-2 ring-brand-500/20'
                      : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    onError={(e) => { e.target.src = fallbackImage; }}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Information & Purchase (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Brand, Stock, Wishlist button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-extrabold text-brand-700 uppercase tracking-widest bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200">
                  {product.brand}
                </span>
                <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>In Stock</span>
                </span>
              </div>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`p-2.5 rounded-xl border transition-all ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-white border-slate-200 text-slate-400 hover:text-rose-500'
                }`}
                aria-label="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Weight / Pack size */}
            <p className="text-sm font-semibold text-slate-500">
              Pack Size: <span className="text-slate-800">{product.quantity}</span>
            </p>

            {/* Rating Bar */}
            <div className="flex items-center space-x-3 text-sm">
              <div className="flex items-center space-x-1 bg-amber-50 text-amber-900 px-2.5 py-1 rounded-lg font-extrabold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
              </div>
              <span className="text-slate-500 text-xs font-medium">
                {product.reviewCount} customer reviews
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-brand-700 font-semibold">100% Certified Quality</span>
            </div>

            {/* Pricing Details */}
            <div className="pt-2 pb-3 border-y border-slate-100 flex items-baseline space-x-3">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                ₹{product.price}
              </span>
              {product.mrp > product.price && (
                <>
                  <span className="text-lg text-slate-400 line-through">
                    ₹{product.mrp}
                  </span>
                  <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Save ₹{product.mrp - product.price} ({product.discount}% OFF)
                  </span>
                </>
              )}
            </div>
            <p className="text-[11px] text-slate-400 -mt-2">Inclusive of all applicable taxes</p>

            {/* Quantity Stepper & Buttons */}
            <div className="pt-4 space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setSelectedQty((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-lg bg-white shadow-xs flex items-center justify-center text-slate-700 hover:text-brand-700 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-slate-900">
                    {selectedQty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedQty((q) => q + 1)}
                    className="w-9 h-9 rounded-lg bg-white shadow-xs flex items-center justify-center text-slate-700 hover:text-brand-700 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Cart + Buy Now */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex items-center justify-center space-x-2 bg-brand-50 hover:bg-brand-100 text-brand-800 border-2 border-brand-600 font-bold py-3.5 px-6 rounded-xl transition-all shadow-xs active:scale-98"
                >
                  <ShoppingCart className="w-5 h-5 text-brand-700" />
                  <span>Add to Cart</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex items-center justify-center space-x-2 bg-brand-700 hover:bg-brand-800 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md shadow-brand-700/20 active:scale-98"
                >
                  <Zap className="w-5 h-5" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>

            {/* Delivery & Service Assurances */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-slate-100 text-center">
              <div className="p-3 bg-slate-50 rounded-xl">
                <Truck className="w-4 h-4 text-brand-700 mx-auto mb-1" />
                <p className="text-[11px] font-bold text-slate-800">Express Delivery</p>
                <p className="text-[10px] text-slate-500">15-30 Mins</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-brand-700 mx-auto mb-1" />
                <p className="text-[11px] font-bold text-slate-800">Quality Checked</p>
                <p className="text-[10px] text-slate-500">Zero compromises</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <RotateCcw className="w-4 h-4 text-brand-700 mx-auto mb-1" />
                <p className="text-[11px] font-bold text-slate-800">Doorstep Return</p>
                <p className="text-[10px] text-slate-500">No questions asked</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Tabs Section: Description, Specifications, Nutrition, Reviews */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        <div className="flex border-b border-slate-200 space-x-4 sm:space-x-8 overflow-x-auto no-scrollbar">
          {[
            { id: 'description', label: 'Description' },
            { id: 'specifications', label: 'Product Information' },
            { id: 'nutrition', label: 'Nutritional Facts' },
            { id: 'reviews', label: `Reviews (${product.reviews?.length || 0})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-bold tracking-tight border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-brand-700 text-brand-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none text-slate-600 text-sm leading-relaxed space-y-3">
              <p>{product.description}</p>
              <p>
                All products at FreshCart are sourced directly from registered growers, trusted dairy cooperatives, and certified regional distributors. We inspect every batch for freshness, packaging integrity, and optimum taste.
              </p>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {Object.entries(product.specifications || {}).map(([key, val]) => (
                <div key={key} className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">{key}</span>
                  <span className="font-semibold text-slate-800 text-right">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div className="max-w-md">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Approximate Values Per Serving
              </h4>
              <div className="divide-y divide-slate-100 text-sm">
                {Object.entries(product.nutrition || {}).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-2">
                    <span className="text-slate-600">{key}</span>
                    <span className="font-bold text-slate-900">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl">
                <div className="text-center pr-4 border-r border-slate-200">
                  <span className="text-3xl font-black text-slate-900">{product.rating}</span>
                  <div className="flex text-amber-400 justify-center my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">Verified Ratings</span>
                </div>
                <div className="flex-1 text-xs text-slate-500">
                  100% of customers recommend this product for quality, freshness, and packaging.
                </div>
              </div>

              <div className="space-y-4">
                {(product.reviews || []).map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-full bg-emerald-100 text-brand-800 font-bold text-xs flex items-center justify-center">
                          {rev.userName[0]}
                        </div>
                        <span className="text-xs font-bold text-slate-800">{rev.userName}</span>
                        <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">
                          Verified Buyer
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* You Might Also Like (Related Products) */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-brand-950 tracking-tight">
                You Might Also Like
              </h2>
              <p className="text-xs text-slate-500">Frequently bought together in this category</p>
            </div>
            <Link
              to={`/shop?category=${product.category}`}
              className="text-xs font-bold text-brand-700 hover:underline"
            >
              View Category →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
