import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { fallbackImage } from '../data/products';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  const [imgSrc, setImgSrc] = useState(product.image);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-2xl border border-slate-200/80 shadow-soft gap-4 transition-all hover:border-slate-300">
      
      {/* Product Image & Info */}
      <div className="flex items-center space-x-3.5 flex-1 min-w-0">
        <Link to={`/product/${product.id}`} className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0 flex items-center justify-center p-2">
          <img
            src={imgSrc}
            alt={product.name}
            onError={() => setImgSrc(fallbackImage)}
            className="w-full h-full object-contain"
          />
        </Link>
        <div className="min-w-0 flex-1">
          <span className="text-[10px] uppercase font-bold text-brand-700 tracking-wider">
            {product.brand}
          </span>
          <Link
            to={`/product/${product.id}`}
            className="font-bold text-slate-800 text-sm hover:text-brand-700 transition-colors block truncate"
          >
            {product.name}
          </Link>
          <p className="text-xs text-slate-400 mt-0.5">{product.quantity}</p>
          <div className="flex items-baseline space-x-2 mt-1 sm:hidden">
            <span className="text-sm font-bold text-slate-900">₹{product.price}</span>
            {product.mrp > product.price && (
              <span className="text-xs text-slate-400 line-through">₹{product.mrp}</span>
            )}
          </div>
        </div>
      </div>

      {/* Unit Price (Desktop) */}
      <div className="hidden sm:block text-right px-4">
        <div className="text-sm font-bold text-slate-900">₹{product.price}</div>
        {product.mrp > product.price && (
          <div className="text-xs text-slate-400 line-through">₹{product.mrp}</div>
        )}
      </div>

      {/* Quantity Stepper */}
      <div className="flex items-center justify-between w-full sm:w-auto space-x-4">
        <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
          <button
            type="button"
            onClick={() => updateQuantity(product.id, -1)}
            className="w-7 h-7 rounded-lg bg-white shadow-2xs flex items-center justify-center text-slate-600 hover:text-brand-700 hover:bg-brand-50 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center text-xs font-bold text-slate-800">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => updateQuantity(product.id, 1)}
            className="w-7 h-7 rounded-lg bg-white shadow-2xs flex items-center justify-center text-slate-600 hover:text-brand-700 hover:bg-brand-50 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Item Subtotal */}
        <div className="text-right min-w-[70px]">
          <div className="text-sm font-extrabold text-slate-900">
            ₹{product.price * quantity}
          </div>
          {product.mrp > product.price && (
            <div className="text-[11px] text-emerald-600 font-medium">
              Save ₹{(product.mrp - product.price) * quantity}
            </div>
          )}
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={() => removeFromCart(product.id)}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
          aria-label={`Remove ${product.name} from cart`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
