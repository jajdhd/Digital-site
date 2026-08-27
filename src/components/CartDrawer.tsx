import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowLeft, 
  ArrowRight, 
  Tag, 
  CreditCard, 
  ShieldCheck, 
  Plus, 
  Minus,
  Sparkles,
  Zap
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice, toPersianDigits } from '../utils/formatters';

export const CartDrawer: React.FC = () => {
  const { 
    language, 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartSummary, 
    isCartDrawerOpen, 
    setIsCartDrawerOpen,
    coupon,
    applyCoupon,
    removeCoupon,
    setActiveView 
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      const success = applyCoupon(couponInput);
      if (success) setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    setActiveView('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs animate-fadeIn">
      
      <div 
        className="absolute inset-0" 
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className={`absolute top-0 bottom-0 w-full max-w-md bg-white border-slate-200 shadow-2xl flex flex-col z-10 text-slate-900 ${
        language === 'fa' ? 'left-0 border-r animate-fadeIn' : 'right-0 border-l animate-fadeIn'
      }`}>
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
              {language === 'fa' ? 'سبد خرید شما' : 'Your Shopping Cart'}
            </h3>
            <span className="bg-emerald-100 text-emerald-800 font-mono text-xs px-2.5 py-0.5 rounded-full font-bold">
              {language === 'fa' ? `${toPersianDigits(cartSummary.totalItemCount)} کالا` : `${cartSummary.totalItemCount} items`}
            </span>
          </div>

          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body - Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 no-scrollbar">
          {cart.length > 0 ? (
            cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedColor?.hex || idx}`}
                className="bg-white border border-slate-200 rounded-2xl p-3.5 flex gap-3 relative group shadow-xs hover:border-emerald-300 transition"
              >
                {/* Product thumb */}
                <div className="w-18 h-18 bg-slate-50 rounded-xl p-1.5 flex items-center justify-center shrink-0 border border-slate-100">
                  <img
                    src={item.product.image}
                    alt={item.product.titleFa}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                      {language === 'fa' ? item.product.titleFa : item.product.titleEn}
                    </h4>
                    {item.selectedColor && (
                      <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500">
                        <span className="w-2.5 h-2.5 rounded-full border border-slate-300" style={{ backgroundColor: item.selectedColor.hex }}></span>
                        <span>{language === 'fa' ? item.selectedColor.nameFa : item.selectedColor.nameEn}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="font-extrabold text-xs text-orange-600 font-mono">
                      {formatPrice(item.product.priceTomans * item.quantity, language === 'fa')}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-xl p-0.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor?.hex)}
                        className="w-5 h-5 rounded-lg bg-white hover:bg-slate-200 text-slate-700 text-xs flex items-center justify-center cursor-pointer shadow-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs px-2 text-slate-900 font-bold">
                        {language === 'fa' ? toPersianDigits(item.quantity) : item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor?.hex)}
                        className="w-5 h-5 rounded-lg bg-white hover:bg-slate-200 text-slate-700 text-xs flex items-center justify-center cursor-pointer shadow-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => removeFromCart(item.product.id, item.selectedColor?.hex)}
                  className="absolute top-2 left-2 text-slate-400 hover:text-rose-500 transition-colors p-1"
                  title="حذف"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">
                {language === 'fa' ? 'سبد خرید شما خالی است' : 'Your cart is empty'}
              </h4>
              <p className="text-xs text-slate-500 max-w-xs">
                {language === 'fa'
                  ? 'محصولات مورد علاقه خود را به سبد خرید اضافه نمایید.'
                  : 'Add items from the store to proceed to payment.'}
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer - Coupon & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/70 space-y-4">
            
            {/* Coupon input */}
            <form onSubmit={handleApplyCoupon} className="space-y-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder={language === 'fa' ? 'کد تخفیف (مثال: NOWRUZ یا OFF10)' : 'Coupon code (e.g. NOWRUZ)'}
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl cursor-pointer"
                >
                  {language === 'fa' ? 'اعمال' : 'Apply'}
                </button>
              </div>

              {coupon?.applied && (
                <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-bold">
                  <span>
                    {language === 'fa' ? `کد «${coupon.code}» اعمال شد (${toPersianDigits(coupon.percent)}٪ تخفیف)` : `Code "${coupon.code}" applied (${coupon.percent}% off)`}
                  </span>
                  <button onClick={removeCoupon} className="text-rose-500 text-[11px] underline cursor-pointer">
                    {language === 'fa' ? 'حذف' : 'Remove'}
                  </button>
                </div>
              )}
            </form>

            {/* Price Breakdown */}
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>{language === 'fa' ? 'مجموع کالاها:' : 'Subtotal:'}</span>
                <span className="text-slate-900 font-mono font-bold">{formatPrice(cartSummary.subtotal, language === 'fa')}</span>
              </div>

              {cartSummary.discount > 0 && (
                <div className="flex justify-between text-orange-600 font-bold">
                  <span>{language === 'fa' ? 'سود شما از خرید (تخفیف):' : 'Discount:'}</span>
                  <span className="font-mono">-{formatPrice(cartSummary.discount, language === 'fa')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{language === 'fa' ? 'هزینه ارسال پست پیشتاز:' : 'Express Shipping:'}</span>
                <span className="text-slate-900 font-mono font-bold">
                  {cartSummary.shippingFee === 0 
                    ? (language === 'fa' ? 'رایگان' : 'Free')
                    : formatPrice(cartSummary.shippingFee, language === 'fa')}
                </span>
              </div>

              <div className="flex justify-between pt-2.5 border-t border-slate-200 text-sm font-extrabold text-slate-900">
                <span>{language === 'fa' ? 'مبلغ نهایی قابل پرداخت:' : 'Total Amount:'}</span>
                <span className="text-orange-600 font-mono text-base font-black">
                  {formatPrice(cartSummary.finalTotal, language === 'fa')}
                </span>
              </div>
            </div>

            {/* Big Checkout CTA */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-2xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>{language === 'fa' ? 'ادامه فرآیند خرید و پرداخت' : 'Proceed to Checkout'}</span>
              {language === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

          </div>
        )}

      </div>

    </div>
  );
};
