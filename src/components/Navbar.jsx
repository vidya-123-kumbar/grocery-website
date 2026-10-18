import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sparkles, Compass } from 'lucide-react';

export const navCategories = [
  { name: "All Products", path: "/shop", icon: Compass },
  { name: "Fruits & Vegetables", path: "/shop?category=fruits-vegetables" },
  { name: "Dairy & Eggs", path: "/shop?category=dairy-eggs" },
  { name: "Staples", path: "/shop?category=staples" },
  { name: "Snacks", path: "/shop?category=snacks" },
  { name: "Beverages", path: "/shop?category=beverages" },
  { name: "Bakery", path: "/shop?category=bakery" },
  { name: "Personal Care", path: "/shop?category=personal-care" },
  { name: "Household", path: "/shop?category=household" },
  { name: "Offers", path: "/offers", isSpecial: true, icon: Sparkles },
];

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="hidden md:block bg-white border-b border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center space-x-1 lg:space-x-3 overflow-x-auto py-2 text-xs lg:text-sm font-medium text-slate-600 no-scrollbar">
          {navCategories.map((item) => {
            const currentFullPath = `${location.pathname}${location.search}`;
            const isActive =
              item.path === "/shop"
                ? location.pathname === "/shop" && !location.search
                : currentFullPath === item.path ||
                  (item.path.startsWith("/shop?category=") &&
                    location.search.includes(item.path.split("?category=")[1]));

            return (
              <li key={item.name} className="flex-shrink-0">
                <NavLink
                  to={item.path}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    item.isSpecial
                      ? 'text-amber-700 bg-amber-50 hover:bg-amber-100 font-semibold border border-amber-200/60'
                      : isActive
                      ? 'bg-brand-50 text-brand-800 font-semibold shadow-xs'
                      : 'hover:text-brand-700 hover:bg-slate-50'
                  }`}
                >
                  {item.icon && <item.icon className={`w-3.5 h-3.5 ${item.isSpecial ? 'text-amber-600' : 'text-brand-600'}`} />}
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
