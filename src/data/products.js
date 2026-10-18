export const fallbackImage = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80";

export const products = [
  // --- FRUITS & VEGETABLES ---
  {
    id: "fv-1",
    name: "Fresh Royal Gala Apples",
    brand: "FreshFarm",
    category: "fruits-vegetables",
    price: 149,
    mrp: 199,
    discount: 25,
    rating: 4.8,
    reviewCount: 312,
    quantity: "1 kg (approx. 4-5 pcs)",
    inStock: true,
    isDeal: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1579613832125-5d34a13ffe0a?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Crisp, sweet, and bursting with natural orchard flavor. Carefully handpicked from certified orchards in Himachal Pradesh.",
    specifications: {
      "Country of Origin": "India (Himachal)",
      "Shelf Life": "7 to 10 days",
      "Storage Instruction": "Store in the refrigerator crisper drawer",
      "Pack Type": "Ventilated Eco-pouch"
    },
    nutrition: { "Calories": "52 kcal", "Carbohydrates": "14 g", "Dietary Fiber": "2.4 g", "Protein": "0.3 g", "Vitamin C": "7 mg" },
    reviews: [
      { id: "r1", userName: "Pooja Hegde", date: "Yesterday", rating: 5, comment: "Super fresh, crisp and sweet! Loved the eco-friendly bag." },
      { id: "r2", userName: "Arun Nair", date: "3 days ago", rating: 4, comment: "Good quality, medium sized apples without any wax coating." }
    ]
  },
  {
    id: "fv-2",
    name: "Fresh Robusta Bananas",
    brand: "FreshFarm",
    category: "fruits-vegetables",
    price: 49,
    mrp: 65,
    discount: 24,
    rating: 4.6,
    reviewCount: 420,
    quantity: "1 kg (approx. 5-7 pcs)",
    inStock: true,
    isDeal: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Naturally ripened Robusta bananas rich in potassium and instant energy. Cleaned and checked for optimum sweetness.",
    specifications: {
      "Country of Origin": "India (Karnataka)",
      "Shelf Life": "3 to 4 days",
      "Storage Instruction": "Store at ambient room temperature, away from direct sunlight",
      "Pack Type": "Cushioned Paper Pouch"
    },
    nutrition: { "Calories": "89 kcal", "Carbohydrates": "23 g", "Dietary Fiber": "2.6 g", "Protein": "1.1 g", "Potassium": "358 mg" },
    reviews: [
      { id: "r3", userName: "Ramesh Rao", date: "4 days ago", rating: 5, comment: "Ripe and delicious, perfect for morning oatmeal and smoothies." }
    ]
  },
  {
    id: "fv-3",
    name: "Nagpur Sweet Oranges (Mosambi)",
    brand: "Nature Select",
    category: "fruits-vegetables",
    price: 89,
    mrp: 120,
    discount: 26,
    rating: 4.5,
    reviewCount: 184,
    quantity: "1 kg",
    inStock: true,
    isDeal: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Juicy, vitamin-C loaded sweet oranges direct from Nagpur orchards. Ideal for fresh morning juice.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "5 days",
      "Storage Instruction": "Store in a cool dry place or refrigerator",
      "Pack Type": "Mesh Net Bag"
    },
    nutrition: { "Calories": "47 kcal", "Carbohydrates": "12 g", "Vitamin C": "53 mg", "Protein": "0.9 g" },
    reviews: [
      { id: "r4", userName: "Kavitha S.", date: "1 week ago", rating: 4, comment: "Juicy and not overly sour. Good yield for morning juice." }
    ]
  },
  {
    id: "fv-4",
    name: "Fresh Hybrid Tomatoes",
    brand: "FreshFarm",
    category: "fruits-vegetables",
    price: 39,
    mrp: 55,
    discount: 29,
    rating: 4.7,
    reviewCount: 520,
    quantity: "1 kg",
    inStock: true,
    isDeal: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Firm, plump, and ruby red hybrid tomatoes. Perfect for everyday Indian gravies, curries, and tangy salads.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "5 to 6 days",
      "Storage Instruction": "Cool, dry ambient place",
      "Pack Type": "Ventilated Bag"
    },
    nutrition: { "Calories": "18 kcal", "Carbohydrates": "3.9 g", "Lycopene": "2573 mcg", "Vitamin C": "14 mg" },
    reviews: [
      { id: "r5", userName: "Girish K.", date: "2 days ago", rating: 5, comment: "Firm and fresh. No bruised or damaged pieces." }
    ]
  },
  {
    id: "fv-5",
    name: "Farm Fresh Potatoes",
    brand: "FreshFarm",
    category: "fruits-vegetables",
    price: 32,
    mrp: 45,
    discount: 28,
    rating: 4.6,
    reviewCount: 388,
    quantity: "1 kg",
    inStock: true,
    isDeal: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Naturally washed, uniform sized cooking potatoes with thin skin. Great for boiling, frying, or baking.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "12 to 14 days",
      "Storage Instruction": "Store in a dark, ventilated container",
      "Pack Type": "Poly Pouch"
    },
    nutrition: { "Calories": "77 kcal", "Carbohydrates": "17.5 g", "Potassium": "421 mg", "Protein": "2 g" },
    reviews: [
      { id: "r6", userName: "Sudha Rani", date: "5 days ago", rating: 4, comment: "Clean potatoes with no mud. Cooked evenly." }
    ]
  },
  {
    id: "fv-6",
    name: "Sambhar Red Onions",
    brand: "FreshFarm",
    category: "fruits-vegetables",
    price: 45,
    mrp: 60,
    discount: 25,
    rating: 4.7,
    reviewCount: 460,
    quantity: "1 kg",
    inStock: true,
    isDeal: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Crisp and pungent red onions, hand-graded for quality and dryness. An indispensable base for any tadka.",
    specifications: {
      "Country of Origin": "India (Nasik)",
      "Shelf Life": "10 to 14 days",
      "Storage Instruction": "Well-ventilated pantry basket",
      "Pack Type": "Net Mesh Bag"
    },
    nutrition: { "Calories": "40 kcal", "Carbohydrates": "9.3 g", "Folate": "19 mcg", "Protein": "1.1 g" },
    reviews: [
      { id: "r7", userName: "Manjunath V.", date: "1 week ago", rating: 5, comment: "Proper Nasik onions, dry skin and long shelf life." }
    ]
  },
  {
    id: "fv-7",
    name: "Fresh Orange Carrots",
    brand: "FreshFarm",
    category: "fruits-vegetables",
    price: 42,
    mrp: 58,
    discount: 27,
    rating: 4.6,
    reviewCount: 215,
    quantity: "500 g",
    inStock: true,
    isDeal: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Crunchy, sweet tender carrots rich in beta carotene. Ideal for salads, curries, and halwa.",
    specifications: {
      "Country of Origin": "India (Ooty)",
      "Shelf Life": "6 to 8 days",
      "Storage Instruction": "Refrigerate in a perforated zip lock bag",
      "Pack Type": "Perforated Eco-pack"
    },
    nutrition: { "Calories": "41 kcal", "Vitamin A": "835 mcg", "Dietary Fiber": "2.8 g" },
    reviews: [
      { id: "r8", userName: "Deepa M.", date: "3 days ago", rating: 5, comment: "Very crunchy and sweet. Kids loved them raw." }
    ]
  },

  // --- DAIRY & EGGS ---
  {
    id: "de-1",
    name: "Amul Taaza Toned Milk",
    brand: "Amul",
    category: "dairy-eggs",
    price: 56,
    mrp: 60,
    discount: 6,
    rating: 4.9,
    reviewCount: 1240,
    quantity: "1 L Pouch",
    inStock: true,
    isDeal: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Pasteurised toned milk with 3.0% Fat and 8.5% SNF. Wholesome nutrition for tea, coffee, and daily family nourishment.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "2 days from packing",
      "Storage Instruction": "Keep refrigerated at 4°C or below",
      "Pack Type": "Hygienic Poly Pouch"
    },
    nutrition: { "Calories": "58 kcal", "Fat": "3.0 g", "Protein": "3.2 g", "Calcium": "120 mg" },
    reviews: [
      { id: "r9", userName: "Shalini Bhat", date: "Today", rating: 5, comment: "Always arrives chilled and with fresh expiry date." },
      { id: "r10", userName: "Suresh Patil", date: "2 days ago", rating: 5, comment: "Best milk for tea and making curd." }
    ]
  },
  {
    id: "de-2",
    name: "Amul Pasteurised Butter",
    brand: "Amul",
    category: "dairy-eggs",
    price: 58,
    mrp: 62,
    discount: 6,
    rating: 4.9,
    reviewCount: 890,
    quantity: "100 g Cartridge",
    inStock: true,
    isDeal: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80"
    ],
    description: "The classic 'Utterly Butterly Delicious' salted butter made from purest churned cow & buffalo cream.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "9 months",
      "Storage Instruction": "Refrigerate at 4°C",
      "Pack Type": "Foil wrapped in paper carton"
    },
    nutrition: { "Calories": "717 kcal", "Fat": "80 g", "Protein": "0.8 g", "Salt": "2.5 g" },
    reviews: [
      { id: "r11", userName: "Tanmay B.", date: "1 week ago", rating: 5, comment: "Nothing beats Amul butter on warm toasted pav." }
    ]
  },
  {
    id: "de-3",
    name: "Amul Fresh Malai Paneer",
    brand: "Amul",
    category: "dairy-eggs",
    price: 88,
    mrp: 95,
    discount: 7,
    rating: 4.8,
    reviewCount: 650,
    quantity: "200 g Block",
    inStock: true,
    isDeal: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Super soft, rich malai cottage cheese. Holds shape wonderfully when simmered in palak, shahi, or butter masala curries.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "15 days",
      "Storage Instruction": "Submerge in cold water after opening, store in fridge",
      "Pack Type": "Vacuum Sealed Tray"
    },
    nutrition: { "Calories": "289 kcal", "Protein": "18 g", "Fat": "22 g", "Carbohydrates": "2 g" },
    reviews: [
      { id: "r12", userName: "Priya Menon", date: "4 days ago", rating: 5, comment: "Extremely soft texture, not chewy at all." }
    ]
  },
  {
    id: "de-4",
    name: "MilkyMist Thick Set Curd (Dahi)",
    brand: "MilkyMist",
    category: "dairy-eggs",
    price: 40,
    mrp: 45,
    discount: 11,
    rating: 4.7,
    reviewCount: 390,
    quantity: "400 g Tub",
    inStock: true,
    isDeal: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Thick, creamy set dahi with zero sourness. Cultured with active probiotic cultures for gut health.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "15 days",
      "Storage Instruction": "Keep refrigerated at all times",
      "Pack Type": "Sealed Poly Tub"
    },
    nutrition: { "Calories": "62 kcal", "Protein": "3.8 g", "Fat": "3.5 g", "Carbohydrates": "4.5 g" },
    reviews: [
      { id: "r13", userName: "Anand M.", date: "Yesterday", rating: 5, comment: "Thick consistency like homemade dahi. Perfect for raita." }
    ]
  },
  {
    id: "de-5",
    name: "Britannia Cheese Slices",
    brand: "Britannia",
    category: "dairy-eggs",
    price: 135,
    mrp: 155,
    discount: 13,
    rating: 4.7,
    reviewCount: 280,
    quantity: "200 g (10 slices)",
    inStock: true,
    isDeal: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Classic processed cheese slices with a rich melt. Elevates breakfast sandwiches, grilled toasts, and burgers.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "6 months",
      "Storage Instruction": "Store in refrigerator",
      "Pack Type": "Individual peel pouches"
    },
    nutrition: { "Calories": "310 kcal", "Protein": "16 g", "Fat": "25 g", "Calcium": "540 mg" },
    reviews: [
      { id: "r14", userName: "Divya N.", date: "1 week ago", rating: 4, comment: "Melts like a dream on morning cheese toast." }
    ]
  },
  {
    id: "de-6",
    name: "Farm Fresh White Eggs (Pack of 12)",
    brand: "Eggoz Farm",
    category: "dairy-eggs",
    price: 89,
    mrp: 110,
    discount: 19,
    rating: 4.8,
    reviewCount: 710,
    quantity: "12 pcs Tray",
    inStock: true,
    isDeal: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Farm-fresh graded eggs with rich yellow yolk and sturdy shells. Cleaned, UV-sanitized, and packed in shock-proof biodegradable pulp trays.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "21 days",
      "Storage Instruction": "Store in egg rack inside refrigerator",
      "Pack Type": "Molded Paper Pulp Tray"
    },
    nutrition: { "Calories": "72 kcal per egg", "Protein": "6.3 g", "Fat": "4.8 g", "Iron": "0.9 mg" },
    reviews: [
      { id: "r15", userName: "Kiran Shah", date: "3 days ago", rating: 5, comment: "All 12 eggs arrived intact! Very fresh yellow yolks." }
    ]
  },

  // --- STAPLES ---
  {
    id: "st-1",
    name: "India Gate Super Basmati Rice",
    brand: "India Gate",
    category: "staples",
    price: 389,
    mrp: 495,
    discount: 21,
    rating: 4.8,
    reviewCount: 940,
    quantity: "5 kg Bag",
    inStock: true,
    isDeal: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Aged long-grain aromatic basmati rice known for its slender grains that elongate up to twice their size when cooked. Ideal for royal biryanis.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "24 months",
      "Storage Instruction": "Store in an airtight container in a dry pantry",
      "Pack Type": "Heavy-duty Woven Poly Bag"
    },
    nutrition: { "Calories": "356 kcal", "Carbohydrates": "78 g", "Protein": "8.5 g", "Fat": "0.5 g" },
    reviews: [
      { id: "r16", userName: "Sameer Joshi", date: "4 days ago", rating: 5, comment: "Superb aroma and separate, fluffy long grains for biryani." }
    ]
  },
  {
    id: "st-2",
    name: "Aashirvaad Shudh Chakki Atta",
    brand: "Aashirvaad",
    category: "staples",
    price: 265,
    mrp: 310,
    discount: 15,
    rating: 4.8,
    reviewCount: 1520,
    quantity: "5 kg Pack",
    inStock: true,
    isDeal: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
    ],
    description: "100% whole wheat grains ground using traditional stone chakki technology. Absorbs water evenly to make softer rotis for longer hours.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "3 months",
      "Storage Instruction": "Keep in an airtight steel drum or container",
      "Pack Type": "Laminated Multi-layer Poly Pack"
    },
    nutrition: { "Calories": "364 kcal", "Dietary Fiber": "11.2 g", "Protein": "12 g", "Carbohydrates": "73 g" },
    reviews: [
      { id: "r17", userName: "Sunita G.", date: "1 week ago", rating: 5, comment: "Soft rotis every single time. My go-to brand for 10 years." }
    ]
  },
  {
    id: "st-3",
    name: "Tata Sampann Unpolished Toor Dal",
    brand: "Tata Sampann",
    category: "staples",
    price: 175,
    mrp: 215,
    discount: 18,
    rating: 4.7,
    reviewCount: 480,
    quantity: "1 kg",
    inStock: true,
    isDeal: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Unpolished pigeon pea dal that retains natural wholesome nutrients, cooking easily into rich, aromatic dal tadka.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "12 months",
      "Storage Instruction": "Airtight container",
      "Pack Type": "Heat-sealed Pouch"
    },
    nutrition: { "Calories": "343 kcal", "Protein": "22 g", "Fiber": "15 g", "Iron": "2.8 mg" },
    reviews: [
      { id: "r18", userName: "Raghuveer N.", date: "2 weeks ago", rating: 5, comment: "Cooks fast and tastes authentic without any chemical polish." }
    ]
  },
  {
    id: "st-4",
    name: "Organic Yellow Moong Dal (Dhuli)",
    brand: "Organic Tattva",
    category: "staples",
    price: 135,
    mrp: 165,
    discount: 18,
    rating: 4.6,
    reviewCount: 290,
    quantity: "1 kg",
    inStock: true,
    isDeal: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1585994192701-f1a505c8574a?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1585994192701-f1a505c8574a?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Light, easy to digest split yellow moong lentils. Excellent for khichdi, dal fry, and light soups.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "9 months",
      "Storage Instruction": "Cool, moisture-free container",
      "Pack Type": "Airtight Plastic Pouch"
    },
    nutrition: { "Calories": "347 kcal", "Protein": "24 g", "Carbohydrates": "60 g" },
    reviews: [
      { id: "r19", userName: "Manju L.", date: "1 week ago", rating: 5, comment: "High quality moong dal, no stones or debris." }
    ]
  },
  {
    id: "st-5",
    name: "Madhur Pure & Hygienic Sulphur-Free Sugar",
    brand: "Madhur",
    category: "staples",
    price: 52,
    mrp: 60,
    discount: 13,
    rating: 4.7,
    reviewCount: 620,
    quantity: "1 kg",
    inStock: true,
    isDeal: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Untouched by hand, 100% sulphur-free refined white sparkling sugar crystals.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "24 months",
      "Storage Instruction": "Airtight glass or plastic jar",
      "Pack Type": "Food Grade Poly Pouch"
    },
    nutrition: { "Calories": "398 kcal", "Carbohydrates": "99.8 g", "Sucrose": "99.8%" },
    reviews: [
      { id: "r20", userName: "Aditi S.", date: "5 days ago", rating: 4, comment: "Clean sparkling crystals, dissolves quickly in coffee." }
    ]
  },
  {
    id: "st-6",
    name: "Tata Salt Vacuum Evaporated Iodised",
    brand: "Tata",
    category: "staples",
    price: 26,
    mrp: 28,
    discount: 7,
    rating: 4.9,
    reviewCount: 2200,
    quantity: "1 kg",
    inStock: true,
    isDeal: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Desh Ka Namak. Pure vacuum evaporated iodized salt containing adequate iodine for family mental development.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "24 months",
      "Storage Instruction": "Store in a dry ceramic or plastic salt dispenser",
      "Pack Type": "Laminated Pouch"
    },
    nutrition: { "Calories": "0 kcal", "Sodium": "38700 mg", "Iodine": "15 ppm min" },
    reviews: [
      { id: "r21", userName: "Vikram Sen", date: "2 weeks ago", rating: 5, comment: "A staple in every Indian household." }
    ]
  },
  {
    id: "st-7",
    name: "Fortune Sunlite Refined Sunflower Oil",
    brand: "Fortune",
    category: "staples",
    price: 135,
    mrp: 170,
    discount: 20,
    rating: 4.7,
    reviewCount: 880,
    quantity: "1 L Pouch",
    inStock: true,
    isDeal: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Light and healthy cooking oil enriched with Vitamins A & D. Low absorption formula keeps fried snacks light and crispy.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "9 months",
      "Storage Instruction": "Store away from heat and direct sunlight",
      "Pack Type": "Leak-proof Poly Pouch"
    },
    nutrition: { "Calories": "900 kcal", "Fat": "100 g", "Vitamin A": "750 mcg", "Vitamin D": "5 mcg" },
    reviews: [
      { id: "r22", userName: "Meera Das", date: "3 days ago", rating: 5, comment: "Very light on the stomach, no unpleasant odor." }
    ]
  },

  // --- SNACKS & MUNCHIES ---
  {
    id: "sn-1",
    name: "Lay's India's Magic Masala Potato Chips",
    brand: "Lay's",
    category: "snacks",
    price: 20,
    mrp: 20,
    discount: 0,
    rating: 4.8,
    reviewCount: 1600,
    quantity: "50 g Pack",
    inStock: true,
    isDeal: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Finest quality potatoes sliced wafer thin, seasoned with hot and spicy Indian street herbs and spices.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "4 months",
      "Storage Instruction": "Store in a cool dry place",
      "Pack Type": "Nitrogen Flushed Foil Pack"
    },
    nutrition: { "Calories": "544 kcal", "Fat": "33 g", "Carbohydrates": "53 g", "Protein": "7 g" },
    reviews: [
      { id: "r23", userName: "Kunal K.", date: "Yesterday", rating: 5, comment: "The blue lays packet is unbeatable for chai time." }
    ]
  },
  {
    id: "sn-2",
    name: "Bingo! Tedhe Medhe Masala Tadka",
    brand: "Bingo!",
    category: "snacks",
    price: 20,
    mrp: 20,
    discount: 0,
    rating: 4.6,
    reviewCount: 420,
    quantity: "55 g Pack",
    inStock: true,
    isDeal: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Crunchy spindle-shaped corn sticks coated in fiery achari and desi tadka masala.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "6 months",
      "Storage Instruction": "Cool and dry place",
      "Pack Type": "Pillow Pack"
    },
    nutrition: { "Calories": "550 kcal", "Carbohydrates": "56 g", "Fat": "34 g" },
    reviews: [
      { id: "r24", userName: "Varun P.", date: "4 days ago", rating: 4, comment: "Spicy, crunchy, and addictive." }
    ]
  },
  {
    id: "sn-3",
    name: "Parle-G Original Gluco Biscuits",
    brand: "Parle",
    category: "snacks",
    price: 30,
    mrp: 35,
    discount: 14,
    rating: 4.9,
    reviewCount: 2800,
    quantity: "250 g Family Pack",
    inStock: true,
    isDeal: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80"
    ],
    description: "India's nostalgic glucose biscuit loved for generations. Perfect accompaniment with cutting chai.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "6 months",
      "Storage Instruction": "Keep in an airtight jar after opening",
      "Pack Type": "Wax Paper Wrap"
    },
    nutrition: { "Calories": "450 kcal", "Carbohydrates": "78 g", "Sugar": "26 g", "Protein": "6.7 g" },
    reviews: [
      { id: "r25", userName: "Rekha S.", date: "1 week ago", rating: 5, comment: "Crispy and fresh. Pure childhood nostalgia." }
    ]
  },
  {
    id: "sn-4",
    name: "Britannia Good Day Cashew Cookies",
    brand: "Britannia",
    category: "snacks",
    price: 45,
    mrp: 50,
    discount: 10,
    rating: 4.7,
    reviewCount: 910,
    quantity: "200 g Pack",
    inStock: true,
    isDeal: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Rich buttery cookies loaded with crunchy real cashews and that signature smile design.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "6 months",
      "Storage Instruction": "Airtight cookie tin",
      "Pack Type": "Tray Pack"
    },
    nutrition: { "Calories": "505 kcal", "Fat": "25 g", "Carbohydrates": "64 g" },
    reviews: [
      { id: "r26", userName: "Amit T.", date: "6 days ago", rating: 5, comment: "Lots of cashew bits in every bite." }
    ]
  },
  {
    id: "sn-5",
    name: "Haldiram's Nagpur Aloo Bhujia",
    brand: "Haldiram's",
    category: "snacks",
    price: 52,
    mrp: 60,
    discount: 13,
    rating: 4.8,
    reviewCount: 1100,
    quantity: "200 g Pouch",
    inStock: true,
    isDeal: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Iconic spicy crispy strands of potato and gram flour seasoned with mint, red chili, and amchur.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "6 months",
      "Storage Instruction": "Airtight container",
      "Pack Type": "Foil Pouch"
    },
    nutrition: { "Calories": "580 kcal", "Fat": "42 g", "Protein": "9 g", "Fiber": "5 g" },
    reviews: [
      { id: "r27", userName: "Neha Agarwal", date: "2 days ago", rating: 5, comment: "Super crisp and chatpata. Perfect with evening tea." }
    ]
  },
  {
    id: "sn-6",
    name: "Cadbury Dairy Milk Silk Chocolate",
    brand: "Cadbury",
    category: "snacks",
    price: 85,
    mrp: 95,
    discount: 11,
    rating: 4.9,
    reviewCount: 1850,
    quantity: "60 g Bar",
    inStock: true,
    isDeal: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Creamier, smoother, and melt-in-the-mouth milk chocolate crafted for pure indulgence.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "12 months",
      "Storage Instruction": "Store in a cool dry place (15°C - 20°C)",
      "Pack Type": "Gold Foil & Flow-wrap"
    },
    nutrition: { "Calories": "532 kcal", "Carbohydrates": "58 g", "Fat": "31 g", "Protein": "7.8 g" },
    reviews: [
      { id: "r28", userName: "Rohit S.", date: "Yesterday", rating: 5, comment: "Arrived chilled with ice packs, no melting!" }
    ]
  },

  // --- BEVERAGES ---
  {
    id: "bv-1",
    name: "Coca-Cola Original Taste",
    brand: "Coca-Cola",
    category: "beverages",
    price: 40,
    mrp: 45,
    discount: 11,
    rating: 4.7,
    reviewCount: 1300,
    quantity: "750 ml Bottle",
    inStock: true,
    isDeal: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
    ],
    description: "The timeless sparkling carbonated cola drink with crisp effervescence. Best served ice cold.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "6 months",
      "Storage Instruction": "Refrigerate before opening",
      "Pack Type": "Recyclable PET Bottle"
    },
    nutrition: { "Calories": "44 kcal / 100ml", "Sugar": "10.6 g", "Sodium": "11 mg" },
    reviews: [
      { id: "r29", userName: "Akash D.", date: "3 days ago", rating: 5, comment: "Chilled and fizzy." }
    ]
  },
  {
    id: "bv-2",
    name: "Pepsi Black Can (Zero Sugar)",
    brand: "Pepsi",
    category: "beverages",
    price: 35,
    mrp: 40,
    discount: 13,
    rating: 4.5,
    reviewCount: 410,
    quantity: "250 ml Can",
    inStock: true,
    isDeal: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Maximum cola flavor with zero calories and zero sugar. The guilt-free sparkling refreshment.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "6 months",
      "Storage Instruction": "Store in refrigerator",
      "Pack Type": "Aluminium Can"
    },
    nutrition: { "Calories": "0 kcal", "Sugar": "0 g", "Protein": "0 g" },
    reviews: [
      { id: "r30", userName: "Nikhil V.", date: "5 days ago", rating: 4, comment: "Tastes just like regular Pepsi without the sugar." }
    ]
  },
  {
    id: "bv-3",
    name: "Sprite Lemon-Lime Sparkling Drink",
    brand: "Sprite",
    category: "beverages",
    price: 40,
    mrp: 45,
    discount: 11,
    rating: 4.7,
    reviewCount: 750,
    quantity: "750 ml Bottle",
    inStock: true,
    isDeal: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Crisp, thirst-quenching clear soda infused with 100% natural lemon-lime flavors. Clear rahega!",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "6 months",
      "Storage Instruction": "Cool place away from heat",
      "Pack Type": "PET Bottle"
    },
    nutrition: { "Calories": "48 kcal / 100ml", "Sugar": "11.8 g" },
    reviews: [
      { id: "r31", userName: "Sneha G.", date: "1 week ago", rating: 5, comment: "The ultimate thirst quencher after a sunny afternoon." }
    ]
  },
  {
    id: "bv-4",
    name: "Réal Fruit Power Mixed Fruit Juice",
    brand: "Réal",
    category: "beverages",
    price: 115,
    mrp: 130,
    discount: 12,
    rating: 4.8,
    reviewCount: 620,
    quantity: "1 L Tetrapack",
    inStock: true,
    isDeal: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Goodness of 9 handpicked fruits in every sip: apple, mango, orange, pineapple, guava, apricot, and peach. No added preservatives.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "7 months",
      "Storage Instruction": "Refrigerate after opening, consume within 5 days",
      "Pack Type": "Aseptic Tetra Pak"
    },
    nutrition: { "Calories": "56 kcal / 100ml", "Vitamin C": "35 mg", "Carbohydrates": "14 g" },
    reviews: [
      { id: "r32", userName: "Bhavana K.", date: "2 days ago", rating: 5, comment: "Kids love it in their school tiffin." }
    ]
  },
  {
    id: "bv-5",
    name: "Tata Tea Premium Desh Ki Chai",
    brand: "Tata Tea",
    category: "beverages",
    price: 160,
    mrp: 190,
    discount: 16,
    rating: 4.8,
    reviewCount: 1400,
    quantity: "500 g Pack",
    inStock: true,
    isDeal: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80"
    ],
    description: "A unique blend of fine tea leaves with strong Assam CTC granules for the perfect balance of kadak taste and enticing aroma.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "12 months",
      "Storage Instruction": "Store in an airtight container",
      "Pack Type": "Sealed Foil Bag"
    },
    nutrition: { "Calories": "0 kcal", "Antioxidants": "High in tea flavonoids" },
    reviews: [
      { id: "r33", userName: "Subhash Chander", date: "4 days ago", rating: 5, comment: "Rich amber color and strong kadak flavor. A morning essential." }
    ]
  },
  {
    id: "bv-6",
    name: "Nescafé Classic Instant Coffee",
    brand: "Nescafé",
    category: "beverages",
    price: 195,
    mrp: 235,
    discount: 17,
    rating: 4.8,
    reviewCount: 980,
    quantity: "100 g Glass Jar",
    inStock: true,
    isDeal: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
    ],
    description: "100% pure Robusta and Arabica coffee beans carefully slow-roasted to deliver that unmistakably bold coffee aroma.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "18 months",
      "Storage Instruction": "Keep the airtight inner seal closed, store in dry cupboard",
      "Pack Type": "Heavy Glass Jar"
    },
    nutrition: { "Calories": "2 kcal per cup", "Caffeine": "60 mg approx" },
    reviews: [
      { id: "r34", userName: "Kartik N.", date: "1 week ago", rating: 5, comment: "Bold aroma wakes you up right away." }
    ]
  },

  // --- BAKERY ---
  {
    id: "bk-1",
    name: "The Baker's Dozen Whole Wheat Bread",
    brand: "The Baker's Dozen",
    category: "bakery",
    price: 55,
    mrp: 65,
    discount: 15,
    rating: 4.7,
    reviewCount: 310,
    quantity: "400 g Loaf",
    inStock: true,
    isDeal: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
    ],
    description: "100% whole wheat stoneground flour bread with zero maida and no artificial palm oil or chemical preservatives.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "4 days",
      "Storage Instruction": "Cool place, tie bag tight after opening",
      "Pack Type": "Paper Wrapped Poly Loaf"
    },
    nutrition: { "Calories": "240 kcal / 100g", "Dietary Fiber": "6.8 g", "Protein": "9 g" },
    reviews: [
      { id: "r35", userName: "Pooja V.", date: "Yesterday", rating: 5, comment: "Soft and wholesome bread. Doesn't crumble when toasted." }
    ]
  },
  {
    id: "bk-2",
    name: "Fresh Mumbai Ladi Pav (Pack of 6)",
    brand: "FreshBake",
    category: "bakery",
    price: 32,
    mrp: 38,
    discount: 16,
    rating: 4.6,
    reviewCount: 240,
    quantity: "6 pcs Pack",
    inStock: true,
    isDeal: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Pillow-soft golden baked buns. The essential companion for pav bhaji, vada pav, and maska pav.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "3 days",
      "Storage Instruction": "Room temperature",
      "Pack Type": "Sealed Bag"
    },
    nutrition: { "Calories": "260 kcal", "Carbohydrates": "52 g", "Protein": "7 g" },
    reviews: [
      { id: "r36", userName: "Gaurav D.", date: "3 days ago", rating: 4, comment: "Soft like sponges. Heated with butter and they were heavenly." }
    ]
  },

  // --- HOUSEHOLD ---
  {
    id: "hh-1",
    name: "Surf Excel Easy Wash Detergent Powder",
    brand: "Surf Excel",
    category: "household",
    price: 145,
    mrp: 175,
    discount: 17,
    rating: 4.8,
    reviewCount: 920,
    quantity: "1 kg Poly Pack",
    inStock: true,
    isDeal: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Engineered with superfine powder technology that dissolves instantly in water, lifting tough collars and turmeric stains effortlessly.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "24 months",
      "Storage Instruction": "Store in a dry container away from moisture",
      "Pack Type": "Heavy-duty Poly Bag"
    },
    nutrition: { "Usage": "1 scoop for regular bucket wash, 2 scoops for machine" },
    reviews: [
      { id: "r37", userName: "Radha Iyer", date: "4 days ago", rating: 5, comment: "Removes tea stains easily with very little scrubbing." }
    ]
  },
  {
    id: "hh-2",
    name: "Vim Dishwash Gel with Lemon Juice",
    brand: "Vim",
    category: "household",
    price: 105,
    mrp: 125,
    discount: 16,
    rating: 4.8,
    reviewCount: 1180,
    quantity: "500 ml Bottle",
    inStock: true,
    isDeal: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Concentrated gel powered by real lemon extract. Just one spoonful cleans an entire sink full of oily kadhais and utensils.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "24 months",
      "Storage Instruction": "Keep nozzle locked when not in use",
      "Pack Type": "Bottle with Easy Dispenser"
    },
    nutrition: { "Active Agent": "Lemon concentrate with anti-grease formula" },
    reviews: [
      { id: "r38", userName: "Kiran G.", date: "1 week ago", rating: 5, comment: "Cuts through oily biryani pots in seconds without white residue." }
    ]
  },
  {
    id: "hh-3",
    name: "Harpic Power Plus Disinfectant Toilet Cleaner",
    brand: "Harpic",
    category: "household",
    price: 92,
    mrp: 110,
    discount: 16,
    rating: 4.7,
    reviewCount: 840,
    quantity: "500 ml Bottle",
    inStock: true,
    isDeal: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?auto=format&fit=crop&w=600&q=80"
    ],
    description: "10x better stain removal power that kills 99.9% of germs while removing limescale and stubborn yellow stains.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "24 months",
      "Storage Instruction": "Keep upright in a child-safe cupboard",
      "Pack Type": "Angled Neck Squeeze Bottle"
    },
    nutrition: { "Formulation": "Hydrochloric Acid 10.5% with germicide" },
    reviews: [
      { id: "r39", userName: "Mohan Lal", date: "5 days ago", rating: 5, comment: "Cleans effectively, leaves the bowl sparkling." }
    ]
  },
  {
    id: "hh-4",
    name: "Lizol Citrus Disinfectant Surface & Floor Cleaner",
    brand: "Lizol",
    category: "household",
    price: 118,
    mrp: 140,
    discount: 16,
    rating: 4.8,
    reviewCount: 730,
    quantity: "500 ml Bottle",
    inStock: true,
    isDeal: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Triple-action floor cleaner that removes 100 types of stains, kills 99.9% germs, and leaves a refreshing citrus fragrance.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "24 months",
      "Storage Instruction": "Cool, dry place",
      "Pack Type": "Squeeze Poly Bottle"
    },
    nutrition: { "Fragrance": "Zesty Citrus Lemon" },
    reviews: [
      { id: "r40", userName: "Anitha Rao", date: "6 days ago", rating: 5, comment: "Smells so fresh after mopping the living room tiles." }
    ]
  },

  // --- PERSONAL CARE ---
  {
    id: "pc-1",
    name: "Dove Deeply Nourishing Beauty Bar Soap",
    brand: "Dove",
    category: "personal-care",
    price: 135,
    mrp: 165,
    discount: 18,
    rating: 4.9,
    reviewCount: 1540,
    quantity: "3 x 100 g Pack",
    inStock: true,
    isDeal: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1607006314187-578d38ca5d7d?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1607006314187-578d38ca5d7d?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Enriched with 1/4th moisturizing cream and gentle cleansers that maintain skin's natural moisture without stripping.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "30 months",
      "Storage Instruction": "Keep in a well-draining soap dish",
      "Pack Type": "Multipack Paper Carton"
    },
    nutrition: { "Skin Type": "Suitable for all skin types, dermatologically tested" },
    reviews: [
      { id: "r41", userName: "Sonal V.", date: "Yesterday", rating: 5, comment: "Leaves skin so supple and hydrated in winters." }
    ]
  },
  {
    id: "pc-2",
    name: "Lux Velvet Touch Soft Glowing Skin Soap",
    brand: "Lux",
    category: "personal-care",
    price: 85,
    mrp: 105,
    discount: 19,
    rating: 4.6,
    reviewCount: 510,
    quantity: "3 x 100 g Pack",
    inStock: true,
    isDeal: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Infused with modern floral beauty oils and jasmine essence that leaves lingering fragrance and soft skin.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "36 months",
      "Storage Instruction": "Cool place",
      "Pack Type": "Glossy Wrap Box"
    },
    nutrition: { "Fragrance": "French Rose and White Peach" },
    reviews: [
      { id: "r42", userName: "Rashmi M.", date: "1 week ago", rating: 4, comment: "Pleasant perfume that stays for hours." }
    ]
  },
  {
    id: "pc-3",
    name: "Head & Shoulders Cool Menthol Anti-Dandruff Shampoo",
    brand: "Head & Shoulders",
    category: "personal-care",
    price: 185,
    mrp: 220,
    discount: 16,
    rating: 4.7,
    reviewCount: 950,
    quantity: "340 ml Bottle",
    inStock: true,
    isDeal: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Menthol-infused formula gives an invigorating cooling blast while effectively wiping out up to 100% visible dandruff flakes.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "24 months",
      "Storage Instruction": "Keep cap closed securely",
      "Pack Type": "Ergonomic Flip Top Bottle"
    },
    nutrition: { "Active": "Zinc Pyrithione + Natural Menthol" },
    reviews: [
      { id: "r43", userName: "Tarun Sharma", date: "3 days ago", rating: 5, comment: "Very cooling sensation, completely stops scalp itching." }
    ]
  },
  {
    id: "pc-4",
    name: "Colgate MaxFresh Spicy Red Gel Toothpaste",
    brand: "Colgate",
    category: "personal-care",
    price: 95,
    mrp: 115,
    discount: 17,
    rating: 4.8,
    reviewCount: 1320,
    quantity: "150 g + 150 g Duo Pack",
    inStock: true,
    isDeal: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Infused with cooling crystals that unleash an intense burst of freshness for 3 hours of fresh breath protection.",
    specifications: {
      "Country of Origin": "India",
      "Shelf Life": "24 months",
      "Storage Instruction": "Store at ambient room temperature",
      "Pack Type": "Laminated Tube Carton"
    },
    nutrition: { "Flavor": "Spicy Fresh Cinnamon & Mint" },
    reviews: [
      { id: "r44", userName: "Deepak Joshi", date: "5 days ago", rating: 5, comment: "Duo pack is super value for money. Intense morning freshness." }
    ]
  }
];
