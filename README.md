# FreshCart – Modern Full-Stack Grocery Web Application 🛒🥦

FreshCart is a modern, full-stack online grocery platform built with **React**, **Vite**, **TailwindCSS**, **Express.js**, and an embedded **SQLite** database. It offers real-time grocery browsing, smart filtering, shopping cart, coupon discounts, secure multi-step checkout, and full customer account and order tracking capabilities.

---

## ✨ Features

- **🛍️ Grocery Catalog**: 40+ products across 8 categories with nutritional specs, multi-image galleries, and customer reviews.
- **⚡ 15-Minute Express Delivery**: Live location selector, delivery slot picker, and address manager.
- **🔍 Smart Search & Filter**: Real-time debounce search, price range filtering, category filters, and sorting.
- **🎟️ Promo Coupons**: Active promo codes (`FRESH50`, `FLAT100`, `SUPER15`, `FREEDEL`) with validation.
- **💳 Multi-Option Checkout**: UPI, Credit/Debit card, Net Banking, and Cash on Delivery.
- **👤 Customer Account Dashboard**:
  - Profile management (name, email, phone).
  - Saved delivery addresses (Home, Work, Other) with default address toggle.
  - FreshCart Wallet balance with cashback earnings.
- **📦 Order History & Live Tracking**:
  - 4-stage live visual delivery stepper (`Placed` ➔ `Confirmed` ➔ `Out for Delivery` ➔ `Delivered`).
  - Itemized Tax Invoices with GST breakdown and print/PDF export.
  - 1-click **Re-order** back into cart.
  - Interactive live rider tracking modal.
  - Order cancellation with automatic wallet refund.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 6, TailwindCSS 3, Lucide Icons, React Router v6
- **Backend**: Express.js (Node.js)
- **Database**: SQLite with `better-sqlite3` in WAL (Write-Ahead-Logging) mode
- **Process Manager**: `concurrently` for running frontend and backend simultaneously

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Both Server & Client
```bash
npm run dev:all
```
- **Frontend App**: `http://localhost:5174` (or `5173`)
- **Backend API**: `http://localhost:5050`
- **Health Check**: `http://localhost:5050/api/health`

Alternatively, you can run them in separate terminals:
```bash
# Terminal 1: Backend Server
npm run server

# Terminal 2: Vite Frontend
npm run dev
```

### 3. Production Build
```bash
npm run build
```

---

## 📁 Project Structure

```
├── server/
│   ├── db.js             # SQLite initialization & connection
│   ├── freshcart.db      # SQLite persistent database file
│   ├── index.js          # Express API routes (Products, Orders, Auth, Addresses)
│   └── seed.js           # Auto-seed script for products, categories & coupons
├── src/
│   ├── components/       # Header, Footer, Navbar, ProductCard, SearchBar, etc.
│   ├── context/          # AuthContext, CartContext, WishlistContext
│   ├── data/             # Initial categories, products, and coupons
│   ├── pages/            # Home, Shop, ProductDetails, Cart, Checkout, Account, Orders, Login
│   ├── services/         # API client layer (api.js)
│   ├── App.jsx           # Main router & layout
│   └── main.jsx          # App root & context providers
├── package.json
└── README.md
```

---

## 📄 License
MIT
