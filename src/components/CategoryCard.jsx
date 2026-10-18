import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/shop?category=${category.slug}`}
      className="group relative flex flex-col bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:-translate-y-1 hover:border-brand-400 transition-all duration-300"
    >
      {/* Category Image container */}
      <div className={`w-full pt-[75%] relative rounded-xl overflow-hidden mb-3 ${category.bgLight || 'bg-slate-50'}`}>
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
        />
      </div>

      {/* Title & Item Count */}
      <div className="flex items-center justify-between mt-auto">
        <div>
          <h3 className="font-bold text-slate-800 text-sm md:text-base group-hover:text-brand-700 transition-colors">
            {category.name}
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            {category.productCount}
          </p>
        </div>
        
        {/* Subtle arrow with hover slide */}
        <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-brand-700 text-slate-400 group-hover:text-white flex items-center justify-center transition-all flex-shrink-0">
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
};
