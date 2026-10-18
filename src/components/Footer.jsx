import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Instagram, Facebook, Youtube, Twitter, Phone, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-600/30">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Fresh<span className="text-brand-400">Cart</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Making everyday grocery shopping simple, fresh and affordable. Delivering handpicked fruits, vegetables, dairy and pantry staples to your doorstep in minutes.
            </p>
            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>Indiranagar 100ft Road, Bengaluru, Karnataka 560038</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>+91 (80) 4122-FRESH (9 AM – 9 PM)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>support@freshcart.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-brand-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-brand-400 transition-colors">Shop Catalog</Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-brand-400 transition-colors">Deals & Coupons</Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-brand-400 transition-colors">My Wishlist</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-brand-400 transition-colors">Shopping Cart</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop?category=fruits-vegetables" className="hover:text-brand-400 transition-colors">Fruits & Vegetables</Link>
              </li>
              <li>
                <Link to="/shop?category=dairy-eggs" className="hover:text-brand-400 transition-colors">Dairy & Eggs</Link>
              </li>
              <li>
                <Link to="/shop?category=staples" className="hover:text-brand-400 transition-colors">Rice & Staples</Link>
              </li>
              <li>
                <Link to="/shop?category=snacks" className="hover:text-brand-400 transition-colors">Snacks & Munchies</Link>
              </li>
              <li>
                <Link to="/shop?category=beverages" className="hover:text-brand-400 transition-colors">Beverages</Link>
              </li>
            </ul>
          </div>

          {/* Customer Support & Social */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Customer Support</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><span className="hover:text-white cursor-pointer">Help Center & FAQs</span></li>
              <li><span className="hover:text-white cursor-pointer">Delivery Information</span></li>
              <li><span className="hover:text-white cursor-pointer">Returns & Refunds Policy</span></li>
              <li><span className="hover:text-white cursor-pointer">Privacy & Terms</span></li>
            </ul>

            <div className="pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2.5">Follow Us</h4>
              <div className="flex items-center space-x-3">
                <a href="#instagram" aria-label="Instagram" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-brand-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#facebook" aria-label="Facebook" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-brand-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#youtube" aria-label="YouTube" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-brand-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="#twitter" aria-label="Twitter X" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-brand-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 FreshCart. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span>Made with fresh love for foodies & families</span>
            <span className="hidden sm:inline">•</span>
            <span>100% Genuine Certified Quality</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
