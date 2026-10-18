import React from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast = () => {
  const { toastMessage, setToastMessage } = useCart();

  if (!toastMessage) return null;

  const isSuccess = toastMessage.type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short max-w-sm w-full transition-all">
      <div
        className={`flex items-center justify-between p-4 rounded-xl shadow-xl border ${
          isSuccess
            ? 'bg-emerald-900 text-white border-emerald-700'
            : 'bg-slate-900 text-white border-slate-700'
        }`}
      >
        <div className="flex items-center space-x-3">
          {isSuccess ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          ) : (
            <Info className="w-5 h-5 text-sky-400 flex-shrink-0" />
          )}
          <p className="text-sm font-medium line-clamp-2">{toastMessage.message}</p>
        </div>
        <button
          onClick={() => setToastMessage(null)}
          className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors ml-3"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
