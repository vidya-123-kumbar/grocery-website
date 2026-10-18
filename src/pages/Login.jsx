import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, ArrowRight, User, Phone, CheckCircle2, Lock, Sparkles, Package, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { sendLoginOtp } from '../services/api';

export const Login = () => {
  const navigate = useNavigate();
  const { user, login, loginAsDemo, logout } = useAuth();
  const { showToast } = useCart();

  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [step, setStep] = useState('input'); // 'input' | 'otp'
  const [otp, setOtp] = useState(['5', '4', '8', '2']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phoneOrEmail.trim()) {
      showToast('Please enter your mobile number or email', 'info');
      return;
    }
    setIsSubmitting(true);
    const res = await sendLoginOtp(phoneOrEmail);
    setIsSubmitting(false);
    setStep('otp');
    showToast(`Demo OTP is: ${res.demoOtp || '5482'}`, 'info');
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    setIsSubmitting(true);
    const res = await login(phoneOrEmail, enteredOtp);
    setIsSubmitting(false);
    if (res?.success) {
      showToast('Logged in successfully!', 'success');
      navigate('/account');
    } else {
      showToast(res?.message || 'Invalid verification code', 'error');
    }
  };

  const handleQuickDemo = async () => {
    setIsSubmitting(true);
    await loginAsDemo();
    setIsSubmitting(false);
    showToast('Logged in as Priya Sharma (Demo VIP Customer)!', 'success');
    navigate('/account');
  };

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'info');
  };

  return (
    <div className="min-h-[75vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-soft max-w-md w-full">
        
        {/* Brand Icon */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-brand-700 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-brand-700/20">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-brand-950 tracking-tight">
            {user ? 'My FreshCart Account' : 'Welcome to FreshCart'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {user ? 'Manage your grocery orders & saved details' : 'Log in to track orders, save wishlists, and checkout faster'}
          </p>
        </div>

        {user ? (
          /* Profile Logged-in State */
          <div className="space-y-6">
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200/80 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-brand-700 text-white flex items-center justify-center font-bold text-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{user.name}</h3>
                <p className="text-xs text-slate-500">{user.contact}</p>
                <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full mt-1 inline-block">
                  FreshCart VIP Member
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-semibold">
              <Link
                to="/account"
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-brand-200 bg-brand-50/50 hover:bg-brand-50 text-brand-900 transition-colors"
              >
                <div className="flex items-center space-x-2.5">
                  <User className="w-4 h-4 text-brand-700" />
                  <span>Go to Account Dashboard</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-brand-700" />
              </Link>
              <Link
                to="/orders"
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-brand-500 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-2.5">
                  <Package className="w-4 h-4 text-brand-700" />
                  <span>My Orders & Live Tracking</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link
                to="/cart"
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-brand-500 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-2.5">
                  <ShoppingBag className="w-4 h-4 text-slate-500" />
                  <span>View Shopping Cart</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-3 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 font-bold text-xs rounded-xl border border-slate-200 transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : step === 'input' ? (
          /* Mobile / Email Input */
          <div className="space-y-4">
            {/* Quick Demo Login Banner */}
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200/80 text-center">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                One-Click Quick Test
              </span>
              <p className="text-xs text-slate-600 mb-3">
                Sign in instantly as demo user (Priya Sharma) with preloaded orders & addresses.
              </p>
              <button
                type="button"
                onClick={handleQuickDemo}
                disabled={isSubmitting}
                className="w-full py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1.5"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>Instant Demo Sign-In</span>
              </button>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-3 text-[10px] font-bold text-slate-400 uppercase">Or log in with OTP</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Mobile Number or Email
                </label>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3" />
                  <input
                    type="text"
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    placeholder="e.g. 9876543210 or yourname@gmail.com"
                    className="w-full text-xs pl-9 pr-3.5 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600 focus:bg-white transition-all"
                    required
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  We'll send a 4-digit verification OTP (Demo code: 5482)
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                {isSubmitting ? 'Sending...' : 'Continue with OTP'}
              </button>
            </form>
          </div>
        ) : (
          /* OTP Verification Step */
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Enter 4-Digit OTP
                </label>
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="text-xs text-brand-700 font-semibold hover:underline"
                >
                  Change
                </button>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Sent to <strong className="text-slate-800">{phoneOrEmail}</strong> (Demo code: <strong>5482</strong>)
              </p>

              <div className="flex items-center justify-center space-x-3">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[idx] = e.target.value;
                      setOtp(newOtp);
                    }}
                    className="w-12 h-12 text-center font-bold text-lg rounded-xl border border-slate-300 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-700/20 transition-all"
            >
              {isSubmitting ? 'Verifying...' : 'Verify & Continue'}
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center space-x-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-brand-600" />
          <span>100% Privacy & Data Protection Guaranteed</span>
        </div>

      </div>
    </div>
  );
};
export default Login;
