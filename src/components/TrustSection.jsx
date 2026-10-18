import React from 'react';
import { ShieldCheck, Truck, Sparkles, Tag } from 'lucide-react';

export const TrustSection = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Fresh Products",
      desc: "100% quality checked groceries",
      color: "bg-emerald-50 text-brand-700",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      desc: "Same-day express doorstep delivery",
      color: "bg-blue-50 text-blue-700",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      desc: "Safe UPI, Cards & Cash on delivery",
      color: "bg-purple-50 text-purple-700",
    },
    {
      icon: Tag,
      title: "Best Prices",
      desc: "Everyday value & seasonal discounts",
      color: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <section className="py-8 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-3.5 p-4 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-brand-300 hover:bg-white transition-all shadow-2xs group"
            >
              <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
