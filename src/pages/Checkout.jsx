import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  MapPin, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  ShoppingBag, 
  ArrowLeft, 
  ChevronRight,
  AlertCircle,
  Sparkles,
  Zap,
  Plus,
  Radio
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { fallbackImage } from '../data/products';
import { createOrder } from '../services/api';

export const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    cart,
    subtotal,
    deliveryFee,
    appliedCoupon,
    couponDiscount,
    total,
    totalSavings,
    clearCart
  } = useCart();

  // Saved Addresses
  const savedAddresses = [
    {
      id: 'addr-1',
      tag: 'Home',
      name: 'Pooja Hegde',
      phone: '9876543210',
      addressLine: 'Flat 402, Green Glen Layout, Bellandur',
      city: 'Bengaluru',
      pincode: '560103',
      isDefault: true,
    },
    {
      id: 'addr-2',
      tag: 'Work',
      name: 'Pooja Hegde',
      phone: '9876543210',
      addressLine: '4th Floor, Prestige Tech Park, Marathahalli Ring Rd',
      city: 'Bengaluru',
      pincode: '560103',
      isDefault: false,
    },
  ];

  const [selectedAddressId, setSelectedAddressId] = useState('addr-1');
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

  // New Address Form State
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    addressLine: '',
    city: 'Bengaluru',
    pincode: '',
    tag: 'Home'
  });
  const [addressErrors, setAddressErrors] = useState({});

  // Delivery Slots
  const deliverySlots = [
    {
      id: 'slot-express',
      title: '⚡ Express Delivery',
      time: 'Within 15-30 mins',
      tag: 'RECOMMENDED',
      isExpress: true,
    },
    {
      id: 'slot-morning',
      title: 'Morning Slot',
      time: 'Tomorrow, 7:00 AM - 10:00 AM',
      tag: 'STANDARD',
      isExpress: false,
    },
    {
      id: 'slot-afternoon',
      title: 'Afternoon Slot',
      time: 'Tomorrow, 1:00 PM - 4:00 PM',
      tag: 'STANDARD',
      isExpress: false,
    },
    {
      id: 'slot-evening',
      title: 'Evening Slot',
      time: 'Tomorrow, 5:00 PM - 9:00 PM',
      tag: 'STANDARD',
      isExpress: false,
    },
  ];
  const [selectedSlotId, setSelectedSlotId] = useState('slot-express');

  // Payment Options
  const paymentMethods = [
    {
      id: 'pay-upi',
      name: 'UPI (Instant & Free)',
      desc: 'Google Pay, PhonePe, Paytm, or Any UPI ID',
      icon: '⚡',
      badge: 'FASTEST',
    },
    {
      id: 'pay-card',
      name: 'Credit / Debit Card',
      desc: 'Visa, MasterCard, RuPay, Diners',
      icon: '💳',
      badge: '',
    },
    {
      id: 'pay-netbanking',
      name: 'Net Banking',
      desc: 'All major Indian banks supported',
      icon: '🏦',
      badge: '',
    },
    {
      id: 'pay-cod',
      name: 'Cash / Pay on Delivery',
      desc: 'Pay cash or QR scan upon arrival',
      icon: '💵',
      badge: '',
    },
  ];
  const [selectedPaymentId, setSelectedPaymentId] = useState('pay-upi');
  const [upiId, setUpiId] = useState('user@okaxis');

  // Order Submission State
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // If cart is empty and order hasn't just succeeded, redirect or show empty
  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-[70vh] max-w-lg mx-auto px-4 py-16 text-center flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400 mb-5">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Your cart is empty</h2>
        <p className="text-slate-500 text-sm mt-1 mb-6">
          Add some fresh grocery items to your cart before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm rounded-xl shadow-sm transition-colors"
        >
          Browse Fresh Groceries
        </Link>
      </div>
    );
  }

  // Address validation helper
  const validateAddressForm = () => {
    const errs = {};
    if (!newAddress.name.trim()) errs.name = 'Full name is required';
    if (!newAddress.phone.trim() || !/^\d{10}$/.test(newAddress.phone.trim())) {
      errs.phone = 'Valid 10-digit mobile number required';
    }
    if (!newAddress.addressLine.trim()) errs.addressLine = 'Street address & house number required';
    if (!newAddress.pincode.trim() || !/^\d{6}$/.test(newAddress.pincode.trim())) {
      errs.pincode = 'Valid 6-digit pincode required';
    }
    setAddressErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = async () => {
    // Validate custom address if user opted to add a new one
    if (isAddingNewAddress) {
      if (!validateAddressForm()) {
        return;
      }
    }

    setIsProcessing(true);

    const chosenAddress = isAddingNewAddress
      ? newAddress
      : savedAddresses.find((a) => a.id === selectedAddressId) || savedAddresses[0];

    const chosenSlot = deliverySlots.find((s) => s.id === selectedSlotId);
    const chosenPayment = paymentMethods.find((p) => p.id === selectedPaymentId);

    try {
      const response = await createOrder({
        customerName: user?.name || chosenAddress.name,
        customerPhone: user?.contact || chosenAddress.phone || '9876543210',
        address: chosenAddress,
        slot: chosenSlot,
        paymentMethod: chosenPayment,
        items: cart,
        subtotal,
        deliveryFee,
        couponDiscount,
        total
      });

      const orderId = response?.order?.id || response?.order?.orderId || `FC-${Math.floor(100000 + Math.random() * 900000)}`;

      setOrderSuccess({
        orderId,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        address: chosenAddress,
        slot: chosenSlot,
        paymentMethod: chosenPayment,
        totalAmount: total,
        itemCount: cart.length,
        items: [...cart],
        savings: totalSavings
      });

      // Clear cart
      clearCart();
    } catch (error) {
      console.error('Failed to create order:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
        <Link to="/cart" className="hover:text-brand-700 transition-colors flex items-center space-x-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cart</span>
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-800 font-semibold">Secure Checkout</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-950 tracking-tight">
          Checkout & Delivery
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review your delivery address, choose a slot, and select a payment method.
        </p>
      </div>

      {/* Main Grid: Left Steps + Right Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Multi-section Form (8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          
          {/* STEP 1: DELIVERY ADDRESS */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-soft">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-brand-700 font-bold text-xs flex items-center justify-center">
                  1
                </div>
                <h2 className="font-bold text-slate-900 text-base sm:text-lg">
                  Delivery Address
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingNewAddress(!isAddingNewAddress)}
                className="text-xs font-bold text-brand-700 hover:text-brand-800 inline-flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAddingNewAddress ? 'Select Saved Address' : 'Add New Address'}</span>
              </button>
            </div>

            {!isAddingNewAddress ? (
              /* Saved Addresses Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {savedAddresses.map((addr) => {
                  const isSelected = selectedAddressId === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative ${
                        isSelected
                          ? 'border-brand-600 bg-brand-50/40 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {addr.tag}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-brand-700" />
                        )}
                      </div>
                      <p className="font-bold text-slate-900 text-sm">{addr.name}</p>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {addr.addressLine}, {addr.city} - {addr.pincode}
                      </p>
                      <p className="text-xs text-slate-500 mt-2 font-medium">
                        Mobile: +91 {addr.phone}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Add New Address Form */
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={newAddress.name}
                      onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600"
                    />
                    {addressErrors.name && (
                      <p className="text-[11px] text-rose-600 mt-1">{addressErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600"
                    />
                    {addressErrors.phone && (
                      <p className="text-[11px] text-rose-600 mt-1">{addressErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Flat, House No, Building, Apartment *
                  </label>
                  <input
                    type="text"
                    value={newAddress.addressLine}
                    onChange={(e) => setNewAddress({ ...newAddress, addressLine: e.target.value })}
                    placeholder="e.g. #302, Palm Heights, 5th Cross"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600"
                  />
                  {addressErrors.addressLine && (
                    <p className="text-[11px] text-rose-600 mt-1">{addressErrors.addressLine}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      value={newAddress.pincode}
                      onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                      placeholder="6-digit pincode (e.g. 560001)"
                      maxLength={6}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600"
                    />
                    {addressErrors.pincode && (
                      <p className="text-[11px] text-rose-600 mt-1">{addressErrors.pincode}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STEP 2: DELIVERY SLOT */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-soft">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 mb-4">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-brand-700 font-bold text-xs flex items-center justify-center">
                2
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-base sm:text-lg">
                  Select Delivery Slot
                </h2>
                <p className="text-xs text-slate-400">Choose when you want your groceries delivered</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {deliverySlots.map((slot) => {
                const isSelected = selectedSlotId === slot.id;
                return (
                  <div
                    key={slot.id}
                    onClick={() => setSelectedSlotId(slot.id)}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/40 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">
                          {slot.title}
                        </span>
                        {slot.isExpress && (
                          <span className="text-[9px] font-black uppercase bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded">
                            {slot.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{slot.time}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-brand-600 bg-brand-600' : 'border-slate-300'}`}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 3: PAYMENT METHOD */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-soft">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 mb-4">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-brand-700 font-bold text-xs flex items-center justify-center">
                3
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-base sm:text-lg">
                  Payment Method
                </h2>
                <p className="text-xs text-slate-400">100% secure payment gateway</p>
              </div>
            </div>

            <div className="space-y-3">
              {paymentMethods.map((pm) => {
                const isSelected = selectedPaymentId === pm.id;
                return (
                  <div
                    key={pm.id}
                    onClick={() => setSelectedPaymentId(pm.id)}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/40 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{pm.icon}</span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-900 text-xs sm:text-sm">
                            {pm.name}
                          </span>
                          {pm.badge && (
                            <span className="text-[9px] font-bold bg-emerald-100 text-brand-800 px-1.5 py-0.5 rounded">
                              {pm.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">{pm.desc}</p>
                      </div>
                    </div>

                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-brand-600 bg-brand-600' : 'border-slate-300'}`}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                    </div>
                  </div>
                );
              })}

              {/* UPI Custom ID Input if UPI selected */}
              {selectedPaymentId === 'pay-upi' && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 mt-2 space-y-2">
                  <label className="block text-[11px] font-bold text-slate-600">
                    Verify Virtual Payment Address (UPI ID)
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. yourname@oksbi"
                      className="text-xs p-2 rounded-lg border border-slate-200 flex-1 focus:outline-none focus:border-brand-600 bg-white"
                    />
                    <span className="text-xs text-emerald-600 font-bold">Verified ✓</span>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Order Summary Sidebar (4 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6 sticky top-24">
          
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft space-y-4">
            <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
              Order Summary ({cart.length} items)
            </h3>

            {/* Thumbnail items preview */}
            <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 pr-1 space-y-2">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between py-2 gap-2">
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      onError={(e) => (e.target.src = fallbackImage)}
                      className="w-10 h-10 object-contain rounded-lg bg-slate-50 border border-slate-100 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-800 truncate">{item.product.name}</p>
                      <p className="text-[11px] text-slate-400">Qty: {item.quantity} × ₹{item.product.price}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900 flex-shrink-0">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">₹{subtotal}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Delivery Fee</span>
                {deliveryFee === 0 ? (
                  <span className="text-brand-700 font-extrabold uppercase">FREE</span>
                ) : (
                  <span className="font-semibold text-slate-800">₹{deliveryFee}</span>
                )}
              </div>
              {couponDiscount > 0 && (
                <div className="flex items-center justify-between text-brand-700 font-semibold">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>- ₹{couponDiscount}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 flex items-baseline justify-between text-sm font-black text-slate-900">
                <span>Final Payable</span>
                <span className="text-xl text-brand-950">₹{total}</span>
              </div>
            </div>

            {totalSavings > 0 && (
              <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200/80 text-center">
                <p className="text-xs font-bold text-brand-900">
                  🎉 You are saving ₹{totalSavings} on this order!
                </p>
              </div>
            )}

            {/* Place Order CTA */}
            <button
              type="button"
              disabled={isProcessing}
              onClick={handlePlaceOrder}
              className={`w-full py-4 rounded-xl text-white font-black text-sm flex items-center justify-center space-x-2 shadow-md shadow-brand-700/20 transition-all ${
                isProcessing
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-brand-700 hover:bg-brand-800 hover:scale-[1.01] active:scale-98'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Confirming Order...</span>
                </>
              ) : (
                <>
                  <span>Place Order • ₹{total}</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              <span>100% Safe Payments & Fast Replacement</span>
            </div>
          </div>

        </div>

      </div>

      {/* ORDER SUCCESS MODAL */}
      {orderSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 text-center border border-slate-100 animate-scaleUp">
            
            {/* Celebration Icon */}
            <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-brand-700 flex items-center justify-center mx-auto mb-5 shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 text-brand-800 rounded-full text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>ORDER CONFIRMED</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Thank You For Your Order!
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Your grocery items are being freshly packed and assigned to a delivery partner.
            </p>

            {/* Order Details Card */}
            <div className="bg-slate-50 rounded-2xl p-4 my-6 text-left border border-slate-200/70 space-y-2.5 text-xs text-slate-700">
              <div className="flex items-center justify-between font-mono">
                <span className="text-slate-400 font-sans">Order ID:</span>
                <span className="font-bold text-slate-900">{orderSuccess.orderId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Delivery Slot:</span>
                <span className="font-bold text-brand-700">{orderSuccess.slot.title} ({orderSuccess.slot.time})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Delivery To:</span>
                <span className="font-bold text-slate-800">{orderSuccess.address.name}, {orderSuccess.address.city}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Payment:</span>
                <span className="font-bold text-slate-800">{orderSuccess.paymentMethod.name}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between font-bold text-sm text-slate-900">
                <span>Total Amount Paid:</span>
                <span className="text-brand-950 font-black">₹{orderSuccess.totalAmount}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2.5">
              <Link
                to="/orders"
                className="w-full py-3.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-brand-700/20 transition-all text-center flex items-center justify-center space-x-2"
              >
                <span>Track Live Order in My Orders</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <Link
                  to="/shop"
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors text-center"
                >
                  Continue Shopping
                </Link>
                <Link
                  to="/"
                  className="w-full py-3 bg-white hover:bg-slate-50 text-slate-600 font-bold text-xs rounded-xl border border-slate-200 transition-colors text-center"
                >
                  Back to Home
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
