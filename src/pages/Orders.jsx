import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package,
  Clock,
  MapPin,
  ChevronRight,
  RotateCcw,
  Navigation,
  FileText,
  XCircle,
  CheckCircle2,
  Truck,
  AlertCircle,
  Search,
  ArrowLeft,
  Phone,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Orders = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, orders, loadingOrders, fetchOrders, cancelUserOrder } = useAuth();
  const { addToCart, showToast } = useCart();

  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'active' | 'delivered' | 'cancelled'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Tracking Modal State
  const [trackingOrder, setTrackingOrder] = useState(null);
  
  // Invoice Modal State
  const [invoiceOrder, setInvoiceOrder] = useState(null);

  // Cancellation Modal State
  const [cancellingOrder, setCancellingOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState('Change of delivery address');
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Re-order all items from past order
  const handleReorder = (order) => {
    if (!order.items || order.items.length === 0) return;
    let count = 0;
    order.items.forEach((item) => {
      const prod = item.product || item;
      const qty = item.quantity || 1;
      addToCart(prod, qty);
      count += qty;
    });
    showToast(`Added ${count} items from ${order.id} to your cart!`, 'success');
    navigate('/cart');
  };

  // Submit cancellation
  const handleConfirmCancel = async () => {
    if (!cancellingOrder) return;
    setIsCancelling(true);
    const res = await cancelUserOrder(cancellingOrder.id, cancelReason);
    setIsCancelling(false);
    setCancellingOrder(null);
    if (res?.success) {
      showToast('Order cancelled. Refund added to your FreshCart wallet!', 'info');
    } else {
      showToast(res?.message || 'Could not cancel order', 'error');
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    // Tab filter
    if (activeFilter === 'active') {
      if (['Delivered', 'Cancelled'].includes(order.status)) return false;
    } else if (activeFilter === 'delivered') {
      if (order.status !== 'Delivered') return false;
    } else if (activeFilter === 'cancelled') {
      if (order.status !== 'Cancelled') return false;
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = order.id.toLowerCase().includes(q);
      const matchItem = order.items?.some((item) => {
        const name = (item.product?.name || item.name || '').toLowerCase();
        return name.includes(q);
      });
      return matchId || matchItem;
    }

    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500',
          label: 'Delivered'
        };
      case 'Out for Delivery':
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          dot: 'bg-blue-500',
          label: 'Out for Delivery'
        };
      case 'Cancelled':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          dot: 'bg-rose-500',
          label: 'Cancelled'
        };
      default:
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500',
          label: status || 'Confirmed'
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-brand-700 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/account" className="hover:text-brand-700 transition-colors">Account</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">Order History & Tracking</span>
        </div>

        {/* Header Banner */}
        <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-soft mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Package className="w-4 h-4" />
              <span>Real-Time Grocery Tracker</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              My Orders & Deliveries
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 max-w-xl">
              Track live 15-minute grocery deliveries, view past orders, download official tax receipts, and re-order kitchen staples in one click.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/account"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl backdrop-blur-sm transition-all border border-white/20"
            >
              My Account Profile
            </Link>
            <Link
              to="/shop"
              className="px-5 py-2.5 bg-brand-500 hover:bg-brand-400 text-brand-950 text-xs font-black rounded-xl shadow-lg shadow-black/20 transition-all"
            >
              Order More Items
            </Link>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Filter Chips */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: `All Orders (${orders.length})` },
              { id: 'active', label: 'Active & In-Transit' },
              { id: 'delivered', label: 'Delivered' },
              { id: 'cancelled', label: 'Cancelled' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeFilter === tab.id
                    ? 'bg-brand-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order ID or product..."
              className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-600 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Orders List */}
        {loadingOrders ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-700 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-600">Loading your orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto shadow-xs">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-brand-700 mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No Orders Found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              {searchQuery ? `No orders matched "${searchQuery}"` : "You haven't placed any grocery orders in this category yet."}
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-700/20 transition-all"
            >
              <span>Start Shopping Fresh Produce</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const badge = getStatusBadge(order.status);
              const isOrderActive = !['Delivered', 'Cancelled'].includes(order.status);

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-soft overflow-hidden hover:border-slate-300 transition-all"
                >
                  {/* Order Top Meta Bar */}
                  <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200/70 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Order Number
                        </span>
                        <span className="text-sm font-black text-slate-800 tracking-tight">
                          #{order.id}
                        </span>
                      </div>
                      <div className="h-7 w-px bg-slate-200 hidden sm:block" />
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Date Placed
                        </span>
                        <span className="text-xs font-semibold text-slate-700">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="h-7 w-px bg-slate-200 hidden sm:block" />
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Total Amount
                        </span>
                        <span className="text-sm font-black text-brand-700">
                          ₹{order.total}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badge.bg}`}>
                        <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                        <span>{badge.label}</span>
                      </span>
                    </div>
                  </div>

                  {/* Status Progress Stepper for Active / Confirmed Orders */}
                  {order.status !== 'Cancelled' && (
                    <div className="px-6 py-4 bg-slate-50/30 border-b border-slate-100">
                      <div className="max-w-2xl mx-auto">
                        <div className="flex items-center justify-between relative">
                          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />
                          <div
                            className="absolute top-1/2 left-0 h-1 bg-brand-600 -translate-y-1/2 z-0 transition-all duration-500"
                            style={{
                              width: order.status === 'Delivered'
                                ? '100%'
                                : order.status === 'Out for Delivery'
                                ? '66%'
                                : '33%'
                            }}
                          />

                          {[
                            { name: 'Confirmed', done: true },
                            { name: 'Packed', done: ['Packed', 'Out for Delivery', 'Delivered'].includes(order.status) },
                            { name: 'Out for Delivery', done: ['Out for Delivery', 'Delivered'].includes(order.status) },
                            { name: 'Delivered', done: order.status === 'Delivered' }
                          ].map((step, idx) => (
                            <div key={idx} className="relative z-10 flex flex-col items-center">
                              <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                  step.done
                                    ? 'bg-brand-700 text-white shadow-sm ring-4 ring-emerald-50'
                                    : 'bg-white text-slate-400 border-2 border-slate-300'
                                }`}
                              >
                                {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                              </div>
                              <span className={`text-[10px] font-bold mt-1 text-center whitespace-nowrap ${
                                step.done ? 'text-brand-900' : 'text-slate-400'
                              }`}>
                                {step.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Order Content Body */}
                  <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-4">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Ordered Items ({order.items?.length || 0})
                      </h4>
                      <div className="space-y-3">
                        {order.items?.map((item, i) => {
                          const prod = item.product || item;
                          const img = prod.image || (prod.images && prod.images[0]) || '';
                          return (
                            <div
                              key={i}
                              className="flex items-center space-x-3.5 p-2.5 rounded-2xl border border-slate-100 hover:bg-slate-50/50 transition-colors"
                            >
                              <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200/80 p-1">
                                {img ? (
                                  <img src={img} alt={prod.name} className="w-full h-full object-contain" />
                                ) : (
                                  <Package className="w-6 h-6 text-slate-400 m-auto" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="text-xs font-bold text-slate-800 truncate">
                                  {prod.name}
                                </h5>
                                <p className="text-[11px] text-slate-500">
                                  {prod.brand || 'FreshCart'} • Qty: <strong className="text-slate-700">{item.quantity || 1}</strong>
                                </p>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="text-xs font-bold text-slate-900 block">
                                  ₹{(prod.price || 0) * (item.quantity || 1)}
                                </span>
                                {prod.mrp && prod.mrp > prod.price && (
                                  <span className="text-[10px] text-slate-400 line-through">
                                    ₹{prod.mrp * (item.quantity || 1)}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Delivery & Payment Info */}
                    <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-200/80 flex flex-col justify-between space-y-4">
                      <div className="space-y-3 text-xs">
                        {/* Address */}
                        <div>
                          <div className="flex items-center space-x-1.5 text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-1">
                            <MapPin className="w-3 h-3 text-brand-600" />
                            <span>Delivery Address</span>
                          </div>
                          <p className="font-bold text-slate-800">
                            {order.address?.name || order.customerName}
                          </p>
                          <p className="text-slate-600 text-[11px] line-clamp-2">
                            {order.address?.addressLine || order.address?.area || 'Address on file'}, {order.address?.city} {order.address?.pincode}
                          </p>
                          <p className="text-slate-500 text-[11px] mt-0.5">
                            Phone: {order.address?.phone || order.customerPhone}
                          </p>
                        </div>

                        {/* Slot */}
                        <div className="pt-2 border-t border-slate-200/60">
                          <div className="flex items-center space-x-1.5 text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-1">
                            <Clock className="w-3 h-3 text-brand-600" />
                            <span>Slot & Payment</span>
                          </div>
                          <p className="font-semibold text-slate-800">
                            {order.slot?.title || 'Standard Express'}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {order.paymentMethod?.name || 'UPI Payment'}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2 pt-2 border-t border-slate-200">
                        {isOrderActive && (
                          <button
                            type="button"
                            onClick={() => setTrackingOrder(order)}
                            className="w-full flex items-center justify-center space-x-2 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                          >
                            <Navigation className="w-3.5 h-3.5" />
                            <span>Track Live Delivery</span>
                          </button>
                        )}

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => handleReorder(order)}
                            className="flex items-center justify-center space-x-1.5 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-colors"
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-brand-600" />
                            <span>Re-order</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setInvoiceOrder(order)}
                            className="flex items-center justify-center space-x-1.5 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-colors"
                          >
                            <FileText className="w-3.5 h-3.5 text-slate-500" />
                            <span>Invoice</span>
                          </button>
                        </div>

                        {isOrderActive && order.status === 'Confirmed' && (
                          <button
                            type="button"
                            onClick={() => setCancellingOrder(order)}
                            className="w-full text-center py-1.5 text-[11px] text-rose-600 hover:text-rose-700 font-semibold transition-colors"
                          >
                            Cancel this Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* TRACKING MODAL */}
      {trackingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setTrackingOrder(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full bg-slate-100"
            >
              ✕
            </button>

            <div className="flex items-center space-x-2 text-brand-700 text-xs font-bold uppercase tracking-wider mb-1">
              <Truck className="w-4 h-4 animate-bounce" />
              <span>Real-Time Express Delivery</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-1">
              Out for Delivery 🚀
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Order #{trackingOrder.id} • Arriving in ~12 mins
            </p>

            {/* Simulated Live Map Visual */}
            <div className="w-full h-44 bg-emerald-50 rounded-2xl relative overflow-hidden border border-emerald-100 flex items-center justify-center mb-5">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative text-center z-10">
                <div className="w-12 h-12 bg-brand-700 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-brand-700/30 mx-auto mb-2 animate-pulse">
                  <Truck className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-800 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full border border-emerald-200">
                  Rider is 1.4 km away
                </span>
              </div>
            </div>

            {/* Rider Info Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex items-center justify-between mb-5">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-800 font-bold flex items-center justify-center text-sm">
                  RK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Ramesh Kumar</h4>
                  <p className="text-[10px] text-slate-500">FreshCart Express Rider • 4.9⭐ (1,240 trips)</p>
                </div>
              </div>
              <a
                href="tel:9876543210"
                className="w-9 h-9 rounded-xl bg-brand-700 text-white flex items-center justify-center hover:bg-brand-800 shadow-sm transition-colors"
                title="Call Rider"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            <button
              type="button"
              onClick={() => setTrackingOrder(null)}
              className="w-full py-3 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-700/20 transition-all"
            >
              Done Tracking
            </button>
          </div>
        </div>
      )}

      {/* INVOICE MODAL */}
      {invoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setInvoiceOrder(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full bg-slate-100"
            >
              ✕
            </button>

            {/* Invoice Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
              <div>
                <span className="text-lg font-black text-brand-900 tracking-tight">FreshCart</span>
                <span className="text-[10px] text-slate-400 block">GSTIN: 29ABCDE1234F1Z5</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-800 block">TAX INVOICE</span>
                <span className="text-[11px] text-slate-500">#{invoiceOrder.id}</span>
              </div>
            </div>

            {/* Billed To */}
            <div className="text-xs mb-4 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Customer</span>
                <p className="font-bold text-slate-800">{invoiceOrder.customerName}</p>
                <p className="text-slate-500 text-[11px]">{invoiceOrder.customerPhone}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Date</span>
                <p className="font-semibold text-slate-800">
                  {new Date(invoiceOrder.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full text-xs text-left mb-4">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 text-[10px] uppercase font-bold">
                  <th className="py-2">Item</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoiceOrder.items?.map((it, idx) => {
                  const p = it.product || it;
                  return (
                    <tr key={idx}>
                      <td className="py-2 text-slate-800 font-medium">{p.name}</td>
                      <td className="py-2 text-center text-slate-600">{it.quantity || 1}</td>
                      <td className="py-2 text-right text-slate-800 font-bold">
                        ₹{(p.price || 0) * (it.quantity || 1)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Calculation Breakdown */}
            <div className="border-t border-slate-200 pt-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>₹{invoiceOrder.subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Delivery Fee</span>
                <span>{invoiceOrder.deliveryFee === 0 ? 'FREE' : `₹${invoiceOrder.deliveryFee}`}</span>
              </div>
              {invoiceOrder.couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Promo Discount</span>
                  <span>-₹{invoiceOrder.couponDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Paid</span>
                <span className="text-brand-700">₹{invoiceOrder.total}</span>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-3 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CANCELLATION MODAL */}
      {cancellingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900 text-center mb-1">
              Cancel Order #{cancellingOrder.id}?
            </h3>
            <p className="text-xs text-slate-500 text-center mb-5">
              Please choose a cancellation reason. The full amount of <strong>₹{cancellingOrder.total}</strong> will be refunded to your FreshCart wallet instantly.
            </p>

            <div className="space-y-2 mb-5">
              {[
                'Change of delivery address',
                'Ordered by mistake',
                'Need to modify items in cart',
                'Delivery time slot does not suit'
              ].map((reason, idx) => (
                <label
                  key={idx}
                  className={`flex items-center space-x-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    cancelReason === reason
                      ? 'border-brand-600 bg-brand-50/50 font-bold text-brand-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="cancelReason"
                    checked={cancelReason === reason}
                    onChange={() => setCancelReason(reason)}
                    className="accent-brand-600"
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setCancellingOrder(null)}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                Keep Order
              </button>
              <button
                type="button"
                disabled={isCancelling}
                onClick={handleConfirmCancel}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors disabled:opacity-50"
              >
                {isCancelling ? 'Cancelling...' : 'Confirm Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
export default Orders;
