import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  User,
  MapPin,
  Package,
  Wallet,
  ShieldCheck,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  LogOut,
  ArrowRight,
  Edit2,
  CreditCard,
  Gift,
  HelpCircle,
  Phone,
  Mail,
  Home as HomeIcon,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Account = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'profile';

  const {
    user,
    isLoggedIn,
    loginAsDemo,
    logout,
    updateProfile,
    addresses,
    loadingAddresses,
    addAddress,
    setDefaultAddr,
    removeAddress,
    orders
  } = useAuth();

  const { showToast } = useCart();

  const [activeTab, setActiveTab] = useState(initialTab);

  // Edit Profile State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');
  const [savingProfile, setSavingProfile] = useState(false);

  // Add Address Modal State
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [newAddrTag, setNewAddrTag] = useState('Home');
  const [newAddrName, setNewAddrName] = useState('');
  const [newAddrPhone, setNewAddrPhone] = useState('');
  const [newAddrLine, setNewAddrLine] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('Bengaluru');
  const [newAddrPincode, setNewAddrPincode] = useState('560103');
  const [newAddrIsDefault, setNewAddrIsDefault] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileName(user.name || '');
      setProfileEmail(user.email || '');
      setNewAddrName(user.name || '');
      setNewAddrPhone(user.contact || '');
    }
  }, [user]);

  // Handle Edit Profile Submission
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    const res = await updateProfile({ name: profileName, email: profileEmail });
    setSavingProfile(false);
    if (res?.success) {
      setIsEditingProfile(false);
      showToast('Profile updated successfully!', 'success');
    } else {
      showToast(res?.message || 'Failed to update profile', 'error');
    }
  };

  // Handle Add Address Submission
  const handleSaveAddress = async (e) => {
    e.preventDefault();
    if (!newAddrLine.trim() || !newAddrCity.trim() || !newAddrPincode.trim()) {
      showToast('Please fill in all address details', 'info');
      return;
    }
    setSavingAddress(true);
    const res = await addAddress({
      tag: newAddrTag,
      name: newAddrName || user?.name || 'Customer',
      phone: newAddrPhone || user?.contact || '9876543210',
      addressLine: newAddrLine,
      city: newAddrCity,
      pincode: newAddrPincode,
      isDefault: newAddrIsDefault
    });
    setSavingAddress(false);
    if (res?.success) {
      setIsAddAddressOpen(false);
      setNewAddrLine('');
      showToast('New delivery address added!', 'success');
    } else {
      showToast(res?.message || 'Failed to save address', 'error');
    }
  };

  const handleSetDefault = async (id) => {
    const res = await setDefaultAddr(id);
    if (res?.success) {
      showToast('Default delivery address updated', 'success');
    }
  };

  const handleDeleteAddress = async (id) => {
    const res = await removeAddress(id);
    if (res?.success) {
      showToast('Address removed', 'info');
    }
  };

  const handleLogout = () => {
    logout();
    showToast('Signed out of FreshCart', 'info');
    navigate('/login');
  };

  // Not logged in view: prompt login or 1-click demo login
  if (!user) {
    return (
      <div className="min-h-[75vh] max-w-4xl mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-emerald-50 text-brand-700 rounded-3xl flex items-center justify-center shadow-inner mb-6">
          <User className="w-10 h-10" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 mb-3">
          Customer Portal
        </span>
        <h1 className="text-3xl font-black text-slate-900 mb-2">
          Access Your FreshCart Account
        </h1>
        <p className="text-slate-500 text-sm max-w-md mb-8">
          Sign in to view real-time grocery orders, manage your saved delivery addresses, and redeem cashback coins.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm">
          <Link
            to="/login"
            className="w-full py-3.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-700/20 text-center transition-all"
          >
            Log In with OTP
          </Link>
          <button
            type="button"
            onClick={async () => {
              await loginAsDemo();
              showToast('Logged in as Priya Sharma (VIP Demo User)!', 'success');
            }}
            className="w-full py-3.5 bg-emerald-100 hover:bg-emerald-200 text-brand-900 font-bold text-xs rounded-xl border border-emerald-300 text-center transition-all flex items-center justify-center space-x-1.5"
          >
            <Sparkles className="w-4 h-4 text-brand-700" />
            <span>Instant Demo Sign-In</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-brand-700 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">My Account</span>
        </div>

        {/* User Welcome Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-brand-700 to-emerald-600 text-white flex items-center justify-center font-black text-2xl sm:text-3xl shadow-md shadow-brand-700/20 shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {user.name}
                </h1>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-emerald-300">
                  VIP Club
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center space-x-3">
                <span>{user.contact}</span>
                {user.email && (
                  <>
                    <span>•</span>
                    <span>{user.email}</span>
                  </>
                )}
                <span>•</span>
                <span>Member since {user.memberSince || '2024'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setIsEditingProfile(true)}
              className="flex items-center space-x-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200/70 text-slate-700 text-xs font-bold rounded-xl transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center space-x-1.5 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            {[
              { id: 'profile', label: 'Overview & Profile', icon: User },
              { id: 'addresses', label: `Saved Addresses (${addresses.length})`, icon: MapPin },
              { id: 'wallet', label: 'Wallet & Cashback', icon: Wallet },
              { id: 'orders_link', label: `My Orders (${orders.length})`, icon: Package, isRoute: '/orders' }
            ].map((tab) => {
              const Icon = tab.icon;
              if (tab.isRoute) {
                return (
                  <Link
                    key={tab.id}
                    to={tab.isRoute}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition-all bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 shadow-xs group"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4 text-brand-700" />
                      <span>{tab.label}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                );
              }

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-brand-700 text-white shadow-soft'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 shadow-xs'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-white' : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${activeTab === tab.id ? 'text-white' : 'text-slate-400'}`} />
                </button>
              );
            })}

            {/* Customer Support Card */}
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200/70 mt-6 text-xs">
              <div className="flex items-center space-x-2 text-brand-800 font-bold mb-1">
                <HelpCircle className="w-4 h-4" />
                <span>24x7 Fresh Support</span>
              </div>
              <p className="text-[11px] text-emerald-900/80 mb-3">
                Need help with a recent order or delivery refund? Our grocery experts are here.
              </p>
              <a
                href="tel:1800123456"
                className="block text-center py-2 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-xl text-[11px] transition-colors"
              >
                Call 1800-123-456 (Toll-free)
              </a>
            </div>
          </div>

          {/* Right Main Content Panel */}
          <div className="lg:col-span-3 space-y-6">

            {/* TAB: PROFILE / OVERVIEW */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* 3 Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Total Orders</span>
                      <Package className="w-4 h-4 text-brand-700" />
                    </div>
                    <span className="text-2xl font-black text-slate-900">{orders.length}</span>
                    <Link to="/orders" className="text-[11px] text-brand-700 font-semibold block mt-1 hover:underline">
                      View all orders →
                    </Link>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Wallet Balance</span>
                      <Wallet className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-2xl font-black text-slate-900">₹{user.walletBalance || 350}</span>
                    <button onClick={() => setActiveTab('wallet')} className="text-[11px] text-brand-700 font-semibold block mt-1 hover:underline">
                      View cashback history →
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Saved Addresses</span>
                      <MapPin className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-2xl font-black text-slate-900">{addresses.length}</span>
                    <button onClick={() => setActiveTab('addresses')} className="text-[11px] text-brand-700 font-semibold block mt-1 hover:underline">
                      Manage addresses →
                    </button>
                  </div>
                </div>

                {/* Recent Orders Card */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-base font-black text-slate-900">Recent Deliveries</h3>
                      <p className="text-xs text-slate-500">Track current groceries or re-order staples</p>
                    </div>
                    <Link
                      to="/orders"
                      className="text-xs font-bold text-brand-700 hover:text-brand-800 flex items-center space-x-1"
                    >
                      <span>All Orders</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                      <p className="text-xs text-slate-500">No past orders found.</p>
                      <Link to="/shop" className="text-xs font-bold text-brand-700 mt-2 inline-block">
                        Browse Fresh Groceries →
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.slice(0, 2).map((order) => (
                        <div
                          key={order.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all gap-4"
                        >
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-black text-slate-900">#{order.id}</span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                                {order.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-1">
                              {order.items?.length || 1} items • Total: <strong>₹{order.total}</strong> • {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Link
                            to="/orders"
                            className="px-4 py-2 bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold rounded-xl text-center shadow-xs transition-colors"
                          >
                            Track & Details
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Account Details Information */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft">
                  <h3 className="text-base font-black text-slate-900 mb-4">Personal Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Full Name</span>
                      <span className="font-bold text-slate-800 text-sm">{user.name}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Primary Phone</span>
                      <span className="font-bold text-slate-800 text-sm">{user.contact}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Email Address</span>
                      <span className="font-bold text-slate-800 text-sm">{user.email || 'Not provided'}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Membership Plan</span>
                      <span className="font-bold text-brand-700 text-sm">FreshCart VIP (Free 15-min delivery)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SAVED ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Saved Addresses</h3>
                    <p className="text-xs text-slate-500">Manage home, office, and other grocery drop-off points</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddAddressOpen(true)}
                    className="flex items-center space-x-1.5 px-4 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-700/20 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Address</span>
                  </button>
                </div>

                {addresses.length === 0 ? (
                  <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
                    <MapPin className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-bold text-slate-700">No saved addresses</p>
                    <p className="text-xs text-slate-500 mt-1 mb-4">Add your home or work address for 1-click checkout.</p>
                    <button
                      type="button"
                      onClick={() => setIsAddAddressOpen(true)}
                      className="px-5 py-2.5 bg-brand-700 text-white font-bold text-xs rounded-xl shadow-sm"
                    >
                      Add Address Now
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((addr) => {
                      const TagIcon = addr.tag === 'Work' ? Briefcase : HomeIcon;
                      return (
                        <div
                          key={addr.id}
                          className={`bg-white rounded-3xl p-5 border relative flex flex-col justify-between transition-all ${
                            addr.isDefault
                              ? 'border-brand-600 shadow-soft ring-2 ring-brand-500/10'
                              : 'border-slate-200/90 hover:border-slate-300 shadow-xs'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                                <TagIcon className="w-3.5 h-3.5 text-brand-700" />
                                <span>{addr.tag}</span>
                              </span>
                              {addr.isDefault && (
                                <span className="text-[10px] font-black uppercase text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200">
                                  Default
                                </span>
                              )}
                            </div>

                            <h4 className="text-sm font-bold text-slate-900">{addr.name}</h4>
                            <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                              {addr.addressLine}, {addr.city} - {addr.pincode}
                            </p>
                            <p className="text-[11px] text-slate-500 mt-1">Phone: {addr.phone}</p>
                          </div>

                          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                            {!addr.isDefault ? (
                              <button
                                type="button"
                                onClick={() => handleSetDefault(addr.id)}
                                className="text-xs font-bold text-brand-700 hover:text-brand-800"
                              >
                                Set as Default
                              </button>
                            ) : (
                              <span className="text-xs text-slate-400 font-semibold flex items-center space-x-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                                <span>Primary Address</span>
                              </span>
                            )}

                            <button
                              type="button"
                              onClick={() => handleDeleteAddress(addr.id)}
                              className="text-slate-400 hover:text-rose-600 p-1 rounded-lg transition-colors"
                              title="Delete Address"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB: WALLET & REWARDS */}
            {activeTab === 'wallet' && (
              <div className="space-y-6">
                {/* Wallet Balance Hero Card */}
                <div className="bg-gradient-to-r from-emerald-800 via-brand-800 to-brand-900 rounded-3xl p-6 sm:p-8 text-white shadow-soft relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block mb-1">
                      Available FreshCart Cash
                    </span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl sm:text-4xl font-black">₹{user.walletBalance || 350}</span>
                      <span className="text-xs text-emerald-200">Auto-applies at checkout</span>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <div className="bg-white/10 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-white/20 text-xs">
                        💰 <strong>5% Instant Cashback</strong> on every organic basket
                      </div>
                      <div className="bg-white/10 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-white/20 text-xs">
                        ⚡ <strong>Zero Delivery Fee</strong> for orders above ₹199
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Wallet Activity */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft">
                  <h3 className="text-base font-black text-slate-900 mb-4">Cashback & Transaction History</h3>
                  <div className="space-y-3">
                    {[
                      { title: 'Welcome Reward Bonus', date: 'Account activation', amount: '+₹250', type: 'credit' },
                      { title: 'Cashback on Order #FC-593563', date: 'Yesterday', amount: '+₹50', type: 'credit' },
                      { title: 'Applied on Order #FC-447028', date: '3 days ago', amount: '-₹50', type: 'debit' }
                    ].map((tx, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 hover:bg-slate-50/50">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">{tx.title}</h4>
                          <span className="text-[10px] text-slate-400">{tx.date}</span>
                        </div>
                        <span className={`text-xs font-black ${tx.type === 'credit' ? 'text-emerald-600' : 'text-slate-700'}`}>
                          {tx.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setIsEditingProfile(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full bg-slate-100"
            >
              ✕
            </button>

            <h3 className="text-xl font-black text-slate-900 mb-1">Edit Profile Details</h3>
            <p className="text-xs text-slate-500 mb-5">Update your display name and email address</p>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-brand-600 focus:bg-white transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-brand-600 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Primary Phone</label>
                <input
                  type="text"
                  value={user.contact}
                  disabled
                  className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Phone number cannot be changed directly</span>
              </div>

              <div className="pt-2 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="flex-1 py-3 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  {savingProfile ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD ADDRESS MODAL */}
      {isAddAddressOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddAddressOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full bg-slate-100"
            >
              ✕
            </button>

            <h3 className="text-xl font-black text-slate-900 mb-1">Add Delivery Address</h3>
            <p className="text-xs text-slate-500 mb-5">Save address for faster 15-minute checkout</p>

            <form onSubmit={handleSaveAddress} className="space-y-4">
              {/* Address Tag Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Address Tag</label>
                <div className="flex space-x-2">
                  {['Home', 'Work', 'Other'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setNewAddrTag(t)}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                        newAddrTag === t
                          ? 'border-brand-600 bg-brand-50 text-brand-800 shadow-xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Receiver Name</label>
                  <input
                    type="text"
                    value={newAddrName}
                    onChange={(e) => setNewAddrName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-600 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newAddrPhone}
                    onChange={(e) => setNewAddrPhone(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-600 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Flat, House No., Building, Area</label>
                <textarea
                  rows={2}
                  value={newAddrLine}
                  onChange={(e) => setNewAddrLine(e.target.value)}
                  placeholder="e.g. Flat 304, Palm Heights, Indiranagar"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-600 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    value={newAddrCity}
                    onChange={(e) => setNewAddrCity(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-600 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    value={newAddrPincode}
                    onChange={(e) => setNewAddrPincode(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-600 outline-none"
                    required
                  />
                </div>
              </div>

              <label className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={newAddrIsDefault}
                  onChange={(e) => setNewAddrIsDefault(e.target.checked)}
                  className="accent-brand-600 w-4 h-4 rounded"
                />
                <span>Make this my default delivery address</span>
              </label>

              <div className="pt-3 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddAddressOpen(false)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingAddress}
                  className="flex-1 py-3 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  {savingAddress ? 'Saving Address...' : 'Save Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
export default Account;
