import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  MapPin, 
  Phone, 
  User, 
  Building, 
  Mail, 
  FileText, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Zap, 
  Sparkles,
  Smartphone,
  Wallet,
  Landmark
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice, formatRials, toPersianDigits } from '../utils/formatters';
import { PaymentMethodType } from '../types';

export const CheckoutView: React.FC = () => {
  const { 
    language, 
    cart, 
    cartSummary, 
    shippingAddress, 
    setShippingAddress, 
    selectedPaymentMethod, 
    setSelectedPaymentMethod, 
    startCheckoutPayment,
    gatewayConfig,
    setActiveView 
  } = useShop();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddressChange = (field: string, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handlePay = async () => {
    setIsSubmitting(true);
    try {
      await startCheckoutPayment();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-4 text-slate-900">
        <h2 className="text-xl font-bold">
          {language === 'fa' ? 'سبد خرید شما خالی است' : 'Your cart is empty'}
        </h2>
        <p className="text-xs text-slate-500">
          {language === 'fa' ? 'برای ادامه فرآیند تسویه حساب، ابتدا کالایی را به سبد خرید اضافه نمایید.' : 'Add items before proceeding to checkout.'}
        </p>
        <button
          onClick={() => setActiveView('shop')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-6 py-2.5 rounded-2xl shadow-sm cursor-pointer"
        >
          {language === 'fa' ? 'بازگشت به فروشگاه' : 'Return to Shop'}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-slate-900 space-y-8 animate-fadeIn">
      
      {/* Checkout Steps Progress */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs sm:text-sm">
          <span className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-xs font-black">۱</span>
          <span>{language === 'fa' ? 'سبد خرید' : 'Cart'}</span>
        </div>
        <div className="h-0.5 w-8 sm:w-16 bg-emerald-300"></div>
        <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs sm:text-sm">
          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black shadow-xs">۲</span>
          <span>{language === 'fa' ? 'اطلاعات گیرنده و آدرس' : 'Shipping'}</span>
        </div>
        <div className="h-0.5 w-8 sm:w-16 bg-emerald-300"></div>
        <div className="flex items-center gap-2 text-orange-600 font-bold text-xs sm:text-sm">
          <span className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-black shadow-xs">۳</span>
          <span>{language === 'fa' ? 'درگاه پرداخت ایرانی' : 'Payment'}</span>
        </div>
      </div>

      {/* Main Grid: Form + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 1: Customer & Shipping Address */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-base text-slate-900">
                  {language === 'fa' ? 'مشخصات گیرنده و آدرس تحویل سفارش' : 'Shipping Address & Recipient'}
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {language === 'fa' ? 'ارسال با پست پیشتاز اکسپرس' : 'Express Post'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{language === 'fa' ? 'نام و نام خانوادگی تحویل‌گیرنده:' : 'Full Name:'}</span>
                </label>
                <input
                  type="text"
                  value={shippingAddress.fullName}
                  onChange={(e) => handleAddressChange('fullName', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{language === 'fa' ? 'شماره موبایل جهت پیامک رهگیری:' : 'Mobile Phone (09xx):'}</span>
                </label>
                <input
                  type="text"
                  value={shippingAddress.phone}
                  onChange={(e) => handleAddressChange('phone', e.target.value)}
                  placeholder="09123456789"
                  dir="ltr"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:bg-white focus:outline-none focus:border-emerald-500 text-right transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>{language === 'fa' ? 'استان:' : 'Province:'}</span>
                </label>
                <select
                  value={shippingAddress.province}
                  onChange={(e) => handleAddressChange('province', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition"
                >
                  <option value="تهران">تهران (Tehran)</option>
                  <option value="اصفهان">اصفهان (Isfahan)</option>
                  <option value="فارس">فارس (Fars - Shiraz)</option>
                  <option value="خراسان رضوی">خراسان رضوی (Mashhad)</option>
                  <option value="آذربایجان شرقی">آذربایجان شرقی (Tabriz)</option>
                  <option value="مازندران">مازندران (Mazandaran)</option>
                  <option value="گیلان">گیلان (Gilan - Rasht)</option>
                  <option value="البرز">البرز (Karaj)</option>
                  <option value="خوزستان">خوزستان (Khuzestan - Ahvaz)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  <span>{language === 'fa' ? 'شهر و کد پستی ۱۰ رقمی:' : 'City & Postal Code:'}</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => handleAddressChange('city', e.target.value)}
                    placeholder="شهر"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition"
                  />
                  <input
                    type="text"
                    value={shippingAddress.postalCode}
                    onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                    placeholder="کد پستی"
                    dir="ltr"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs text-slate-900 font-mono text-right focus:bg-white focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  <span>{language === 'fa' ? 'نشانی دقیق پستی (خیابان، پلاک، واحد):' : 'Full Postal Address:'}</span>
                </label>
                <textarea
                  rows={2}
                  value={shippingAddress.address}
                  onChange={(e) => handleAddressChange('address', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

            </div>
          </div>

          {/* Section 2: Iranian Payment Methods Selector */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-orange-500" />
                <h3 className="font-extrabold text-base text-slate-900">
                  {language === 'fa' ? 'انتخاب درگاه و شیوه پرداخت ایرانی' : 'Select Iranian Payment Gateway'}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200 font-bold">
                SHAPARAK / ZARINPAL v4
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Option 1: Zarinpal Gateway (Recommended) */}
              <div
                onClick={() => setSelectedPaymentMethod('zarinpal')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all relative ${
                  selectedPaymentMethod === 'zarinpal'
                    ? 'bg-emerald-50/50 border-emerald-600 ring-2 ring-emerald-600/20'
                    : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-sm shadow-xs">
                      Z
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                        {language === 'fa' ? 'درگاه رسمی زرین‌پال' : 'Zarinpal Payment Gateway'}
                      </h4>
                      <span className="text-[10px] text-emerald-700 font-bold">
                        {gatewayConfig.isSandbox ? 'محیط تست سندباکس v4' : 'Production Live'}
                      </span>
                    </div>
                  </div>
                  {selectedPaymentMethod === 'zarinpal' && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {language === 'fa'
                    ? 'پرداخت آنی امن با تمامی کارت‌های عضو شبکه شتاب همراه با اعتبارسنجی خودکار و شماره پیگیری شاپرک.'
                    : 'Official instant gateway for all Iranian bank cards with auto-verify and official Ref ID.'}
                </p>
              </div>

              {/* Option 2: Saman / Mellat Bank Gateway */}
              <div
                onClick={() => setSelectedPaymentMethod('saman_shaparak')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all relative ${
                  selectedPaymentMethod === 'saman_shaparak'
                    ? 'bg-orange-50/50 border-orange-500 ring-2 ring-orange-500/20'
                    : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                        {language === 'fa' ? 'درگاه شاپرک سامان / ملت' : 'Saman & Mellat Shaparak'}
                      </h4>
                      <span className="text-[10px] text-orange-600 font-bold">اتصال مستقیم PSP</span>
                    </div>
                  </div>
                  {selectedPaymentMethod === 'saman_shaparak' && (
                    <CheckCircle2 className="w-5 h-5 text-orange-600" />
                  )}
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {language === 'fa'
                    ? 'اتصال به درگاه مرکزی پرداخت الکترونیک شاپرک با پشتیبانی از رمز دوم پویا.'
                    : 'Direct Shetab bank terminal with dynamic SMS OTP verification.'}
                </p>
              </div>

              {/* Option 3: Card to Card */}
              <div
                onClick={() => setSelectedPaymentMethod('card_to_card')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all relative ${
                  selectedPaymentMethod === 'card_to_card'
                    ? 'bg-emerald-50/50 border-emerald-600 ring-2 ring-emerald-600/20'
                    : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                        {language === 'fa' ? 'کارت به کارت شتابی' : 'Card to Card Transfer'}
                      </h4>
                      <span className="text-[10px] text-emerald-700 font-bold">انتقال دستی / رسید</span>
                    </div>
                  </div>
                  {selectedPaymentMethod === 'card_to_card' && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {language === 'fa'
                    ? 'واریز به شماره کارت فروشگاه و ثبت شماره پیگیری بانکی جهت تأیید حسابداری.'
                    : 'Direct transfer to store bank card with reference receipt upload.'}
                </p>
              </div>

              {/* Option 4: SnappPay Installments */}
              <div
                onClick={() => setSelectedPaymentMethod('snapp_pay')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all relative ${
                  selectedPaymentMethod === 'snapp_pay'
                    ? 'bg-orange-50/50 border-orange-500 ring-2 ring-orange-500/20'
                    : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                        {language === 'fa' ? 'اقساطی اسنپ‌پی (۴ قسط)' : 'SnappPay 4 Installments'}
                      </h4>
                      <span className="text-[10px] text-orange-600 font-bold">بدون ضامن و بهره</span>
                    </div>
                  </div>
                  {selectedPaymentMethod === 'snapp_pay' && (
                    <CheckCircle2 className="w-5 h-5 text-orange-600" />
                  )}
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {language === 'fa'
                    ? `پرداخت در ۴ قسط مساوی ماهیانه ${formatPrice(Math.round(cartSummary.finalTotal / 4), true)} بدون کارمزد اضافه.`
                    : 'Pay in 4 equal monthly installments with zero interest.'}
                </p>
              </div>

            </div>

            {/* Security Assurance Badge */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>
                  {language === 'fa' 
                    ? 'اطلاعات بانکی با استاندارد شاپرک و پروتکل SSL پردازش می‌شوند.' 
                    : 'All banking data processed under encrypted Shaparak protocol.'}
                </span>
              </div>
              <span className="font-mono text-[10px] font-bold text-slate-500">TLS 1.3 / 256-BIT</span>
            </div>

          </div>

        </div>

        {/* Order Summary Column (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-5 sticky top-24 shadow-sm">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">
                {language === 'fa' ? 'خلاصه فاکتور سفارش' : 'Order Invoice'}
              </h3>
              <span className="text-xs text-slate-500 font-bold font-mono">
                {language === 'fa' ? `${toPersianDigits(cartSummary.totalItemCount)} قلم کالا` : `${cartSummary.totalItemCount} items`}
              </span>
            </div>

            {/* Items mini list */}
            <div className="max-h-48 overflow-y-auto space-y-3 pr-1 no-scrollbar">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 p-1 border border-slate-100 shrink-0 flex items-center justify-center">
                      <img src={item.product.image} alt="" className="max-h-full max-w-full object-contain" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 line-clamp-1">
                        {language === 'fa' ? item.product.titleFa : item.product.titleEn}
                      </h5>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {language === 'fa' ? `تعداد: ${toPersianDigits(item.quantity)}` : `Qty: ${item.quantity}`}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-orange-600 whitespace-nowrap text-xs font-mono">
                    {formatPrice(item.product.priceTomans * item.quantity, language === 'fa')}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>{language === 'fa' ? 'مجموع قیمت کالاها:' : 'Subtotal:'}</span>
                <span className="text-slate-900 font-mono font-bold">{formatPrice(cartSummary.subtotal, language === 'fa')}</span>
              </div>

              {cartSummary.discount > 0 && (
                <div className="flex justify-between text-orange-600 font-bold">
                  <span>{language === 'fa' ? 'تخفیف ویژه:' : 'Discount:'}</span>
                  <span className="font-mono">-{formatPrice(cartSummary.discount, language === 'fa')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{language === 'fa' ? 'هزینه ارسال پست:' : 'Shipping:'}</span>
                <span className="text-slate-900 font-mono font-bold">
                  {cartSummary.shippingFee === 0 ? (language === 'fa' ? 'رایگان' : 'Free') : formatPrice(cartSummary.shippingFee, language === 'fa')}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200 space-y-1">
                <div className="flex justify-between text-sm font-black text-slate-900">
                  <span>{language === 'fa' ? 'مبلغ نهایی (تومان):' : 'Total (Tomans):'}</span>
                  <span className="text-orange-600 font-mono text-lg font-black">
                    {formatPrice(cartSummary.finalTotal, language === 'fa')}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 font-mono font-bold">
                  <span>{language === 'fa' ? 'معادل به ریال:' : 'In Rials:'}</span>
                  <span>{formatRials(cartSummary.finalTotal, language === 'fa')}</span>
                </div>
              </div>
            </div>

            {/* Main Action Button */}
            <button
              disabled={isSubmitting}
              onClick={handlePay}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-4 rounded-2xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>
                {isSubmitting
                  ? (language === 'fa' ? 'در حال اتصال به درگاه زرین‌پال...' : 'Connecting to Gateway...')
                  : (language === 'fa' ? 'پرداخت اینترنتی و ثبت سفارش' : 'Pay & Complete Order')}
              </span>
              {language === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setActiveView('shop')}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-900 py-1 cursor-pointer font-bold"
            >
              {language === 'fa' ? 'انصراف و بازگشت به فروشگاه' : 'Cancel and return to store'}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};
