export const coupons = [
  {
    code: "FRESH50",
    discountType: "flat",
    discountValue: 50,
    minOrder: 399,
    description: "Flat ₹50 OFF on your everyday essentials (Min. order ₹399)",
    tag: "POPULAR",
    badgeColor: "bg-emerald-100 text-emerald-800",
  },
  {
    code: "WELCOME10",
    discountType: "percentage",
    discountValue: 10,
    maxDiscount: 100,
    minOrder: 299,
    description: "10% Instant Discount on first order up to ₹100",
    tag: "NEW USER",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  {
    code: "GROCERY20",
    discountType: "percentage",
    discountValue: 20,
    maxDiscount: 150,
    minOrder: 799,
    description: "20% OFF on pantry & monthly staple orders above ₹799",
    tag: "MONTHLY SAVER",
    badgeColor: "bg-purple-100 text-purple-800",
  },
  {
    code: "FREEDEL",
    discountType: "free_delivery",
    discountValue: 40,
    minOrder: 249,
    description: "Free delivery voucher on mid-week grocery orders above ₹249",
    tag: "LIMITED TIME",
    badgeColor: "bg-amber-100 text-amber-800",
  }
];

export const superSavingsOffers = [
  {
    id: "ss-1",
    title: "Weekend Fruit & Vegetable Carnival",
    tag: "Up to 40% OFF",
    description: "Crisp organic apples, farm potatoes, juicy oranges, and greens at rock-bottom prices.",
    categorySlug: "fruits-vegetables",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80",
    code: "FRESH50",
    color: "from-emerald-600 to-green-700",
  },
  {
    id: "ss-2",
    title: "Kitchen Staples & Monthly Pantry Fest",
    tag: "Flat 25% OFF",
    description: "Stock up on premium Basmati rice, chakki fresh atta, cold-pressed oils, and dals.",
    categorySlug: "staples",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    code: "GROCERY20",
    color: "from-amber-600 to-yellow-700",
  },
  {
    id: "ss-3",
    title: "Chai, Coffee & Evening Munchies",
    tag: "Save up to 30%",
    description: "Pair fresh Tata Tea or Nescafé with crisp Haldiram namkeens and Lay's wafers.",
    categorySlug: "snacks",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80",
    code: "WELCOME10",
    color: "from-orange-600 to-red-600",
  }
];

export const comboDeals = [
  {
    id: "combo-1",
    title: "Morning Breakfast Bundle",
    badge: "Buy 2 Get 1 Free",
    items: "Amul Taaza Milk (1L) + Farm Eggs (12 pcs) + Baker's Bread (400g)",
    originalPrice: 200,
    offerPrice: 159,
    savings: "₹41 (21% OFF)",
    image: "https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "combo-2",
    title: "Healthy Daily Salad Kit",
    badge: "Save 25%",
    items: "Fresh Hybrid Tomatoes (1kg) + Red Onions (1kg) + Ooty Carrots (500g)",
    originalPrice: 173,
    offerPrice: 126,
    savings: "₹47 (27% OFF)",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "combo-3",
    title: "Home Sparkle Hygiene Kit",
    badge: "Best Value Combo",
    items: "Surf Excel Powder (1kg) + Vim Gel (500ml) + Lizol Surface Cleaner (500ml)",
    originalPrice: 368,
    offerPrice: 299,
    savings: "₹69 (19% OFF)",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80",
  }
];

export const bankOffers = [
  {
    id: "b-1",
    bank: "HDFC Bank",
    badge: "Credit & Debit Cards",
    description: "Flat ₹75 instant discount on orders above ₹1,200 every Friday to Sunday.",
    icon: "💳",
  },
  {
    id: "b-2",
    bank: "ICICI Bank",
    badge: "UPI Payments",
    description: "Get up to ₹50 cashback directly into your account on UPI transactions via iMobile.",
    icon: "📱",
  },
  {
    id: "b-3",
    bank: "Cred UPI",
    badge: "Instant Cashback",
    description: "Assured cashback between ₹25 and ₹150 on your FreshCart order paid using CRED pay.",
    icon: "⚡",
  },
  {
    id: "b-4",
    bank: "Paytm & PhonePe",
    badge: "Wallet Deals",
    description: "Flat ₹30 cashback on minimum order value of ₹500 using linked wallets.",
    icon: "👛",
  }
];
