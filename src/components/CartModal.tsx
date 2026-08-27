import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Crown, 
  Tag, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Truck,
  Zap,
  Check
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice, formatPercent, toPersianDigits } from '../utils/formatters';
import { PlacedOrder } from '../types';

export const CartModal: React.FC = () => {
  const { 
    language, 
    cart, 
    updateQuantity, 
    removeFromCart, 
    cartTotalCount, 
    cartTotalPrice, 
    cartTotalDiscount, 
    cartFinalPrice,
    user,
    placeOrder,
    setActiveTab,
    showNotification
  } = useShop();

  const [step, setStep] = useState<'cart' | 'shipping' | 'success'>('cart');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Shipping selection
  const [selectedAddress, setSelectedAddress] = useState(user.addresses[0]);
  const [selectedDate, setSelectedDate] = useState('فردا - پنج‌شنبه');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('ساعت ۹ تا ۱۲ صبح');
  const [paymentMethod, setPaymentMethod] = useState<'digipay' | 'gateway'>('gateway');

  // Success order result
  const [createdOrder, setCreatedOrder] = useState<PlacedOrder | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    if (promoCode.toUpperCase() === 'DIGI1403') {
      const discount = Math.min(200000, cartFinalPrice * 0.1);
      setDiscountAmount(discount);
      setPromoApplied(true);
      showNotification(language === 'fa' ? `کد تخفیف ${formatPrice(discount, language)} با موفقیت اعمال شد!` : 'Discount code applied successfully!');
    } else if (promoCode.toUpperCase() === 'PLUS') {
      setDiscountAmount(100000);
      setPromoApplied(true);
      showNotification(language === 'fa' ? 'کد تخفیف ۱۰۰,۰۰۰ تومانی دیجی‌پلاس اعمال شد!' : '100k Toman DigiPlus discount applied!');
    } else {
      showNotification(language === 'fa' ? 'کد تخفیف وارد شده معتبر نیست یا منقضی شده است.' : 'Invalid or expired promo code.');
    }
  };

  const handleFinalCheckout = () => {
    const order = placeOrder(selectedAddress, selectedTimeSlot, selectedDate, promoApplied ? promoCode : undefined);
    setCreatedOrder(order);
    setStep('success');

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const shippingFee = user.isPlusMember || cartFinalPrice > 500000 ? 0 : 49000;
  const grandTotal = Math.max(0, cartFinalPrice - discountAmount + shippingFee);

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="max-w-4xl mx-auto my-12 px-4 text-center">
        <div className="bg-white rounded-3xl p-10 border border-neutral-200 shadow-sm space-y-4">
          <div className="w-24 h-24 rounded-full bg-red-50 text-[#ef4056] mx-auto flex items-center justify-center">
            <ShoppingBag className="w-12 h-12" />
          </div>
          <h2 className="text-xl font-black text-neutral-900">
            {language === 'fa' ? 'سبد خرید شما خالی است!' : 'Your Shopping Cart is Empty!'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
            {language === 'fa' 
              ? 'می‌توانید برای مشاهده محصولات شگفت‌انگیز و تخفیف‌دار به صفحه اصلی دیجی‌کالا بازگردید.' 
              : 'Explore our catalog and discover amazing deals to add to your cart.'}
          </p>
          <button
            onClick={() => setActiveTab('home')}
            className="bg-[#ef4056] hover:bg-[#e6123d] text-white text-xs sm:text-sm font-black px-8 py-3 rounded-2xl shadow-lg shadow-red-500/20 transition-all cursor-pointer inline-block"
          >
            {language === 'fa' ? 'مشاهده محصولات شگفت‌انگیز' : 'Explore Incredible Offers'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 my-8">
      
      {/* Checkout Steps Progress Bar */}
      {step !== 'success' && (
        <div className="bg-white rounded-2xl p-4 border border-neutral-200 mb-6 flex items-center justify-center gap-4 text-xs font-bold shadow-2xs">
          <div className={`flex items-center gap-1.5 ${step === 'cart' ? 'text-[#ef4056]' : 'text-neutral-500'}`}>
            <span className="w-6 h-6 rounded-full bg-red-100 text-[#ef4056] flex items-center justify-center text-xs font-black">
              ۱
            </span>
            <span>{language === 'fa' ? 'سبد خرید' : 'Cart'}</span>
          </div>

          <div className="w-12 h-0.5 bg-neutral-200"></div>

          <div className={`flex items-center gap-1.5 ${step === 'shipping' ? 'text-[#ef4056]' : 'text-neutral-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
              step === 'shipping' ? 'bg-[#ef4056] text-white' : 'bg-neutral-100 text-neutral-500'
            }`}>
              ۲
            </span>
            <span>{language === 'fa' ? 'زمان و آدرس ارسال' : 'Shipping & Address'}</span>
          </div>

          <div className="w-12 h-0.5 bg-neutral-200"></div>

          <div className="flex items-center gap-1.5 text-neutral-400">
            <span className="w-6 h-6 rounded-full bg-neutral-100 text-neutral-500 flex items-center justify-center text-xs font-black">
              ۳
            </span>
            <span>{language === 'fa' ? 'پرداخت نهایی' : 'Payment'}</span>
          </div>
        </div>
      )}

      {/* STEP 1: CART ITEMS */}
      {step === 'cart' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Cart Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-neutral-200 shadow-xs space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <h2 className="font-black text-sm sm:text-base text-neutral-900 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#ef4056]" />
                  <span>{language === 'fa' ? 'کالاهای انتخابی شما' : 'Cart Items'}</span>
                </h2>
                <span className="text-xs text-neutral-500 font-bold">
                  {toPersianDigits(cartTotalCount)} {language === 'fa' ? 'کالا' : 'items'}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-4 divide-y divide-neutral-100">
                {cart.map((item, idx) => (
                  <div key={idx} className="pt-4 first:pt-0 flex flex-col sm:flex-row gap-4 justify-between">
                    
                    {/* Item Image & Title */}
                    <div className="flex gap-3 flex-1">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-neutral-50 rounded-2xl p-2 border border-neutral-100 shrink-0 flex items-center justify-center">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.titleFa}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="font-bold text-xs sm:text-sm text-neutral-900 line-clamp-2">
                          {language === 'fa' ? item.product.titleFa : item.product.titleEn}
                        </h3>

                        {/* Color badge */}
                        <div className="flex items-center gap-2 text-xs text-neutral-600">
                          <span
                            className="w-3 h-3 rounded-full border border-neutral-300 inline-block"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{language === 'fa' ? item.selectedColor.name : item.selectedColor.nameEn}</span>
                        </div>

                        {/* Seller & Warranty */}
                        <div className="text-[11px] text-neutral-500 space-y-0.5">
                          <p className="flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            <span>{item.selectedSeller.warranty}</span>
                          </p>
                          <p className="flex items-center gap-1 text-blue-600">
                            <Truck className="w-3 h-3" />
                            <span>{item.selectedSeller.name}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Price & Quantity Stepper */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
                      
                      {/* Price */}
                      <div className="text-left">
                        {item.product.originalPrice && item.product.originalPrice > item.selectedSeller.price && (
                          <span className="text-xs text-neutral-400 line-through block">
                            {formatPrice(item.product.originalPrice * item.quantity, language)}
                          </span>
                        )}
                        <span className="text-sm sm:text-base font-black text-neutral-900">
                          {formatPrice(item.selectedSeller.price * item.quantity, language)}
                        </span>
                      </div>

                      {/* Stepper & Delete */}
                      <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedColor.hex, item.selectedSeller.id, 1)}
                          className="w-7 h-7 rounded-lg bg-white hover:bg-neutral-200 text-neutral-800 flex items-center justify-center font-bold shadow-2xs cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        
                        <span className="font-black text-xs sm:text-sm min-w-[20px] text-center">
                          {toPersianDigits(item.quantity)}
                        </span>

                        {item.quantity === 1 ? (
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedColor.hex, item.selectedSeller.id)}
                            className="w-7 h-7 rounded-lg bg-white hover:bg-red-50 text-red-500 flex items-center justify-center shadow-2xs cursor-pointer"
                            title="حذف کالا"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedColor.hex, item.selectedSeller.id, -1)}
                            className="w-7 h-7 rounded-lg bg-white hover:bg-neutral-200 text-neutral-800 flex items-center justify-center font-bold shadow-2xs cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                    </div>

                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Cart Summary & Next Step (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-neutral-200 shadow-xs space-y-4">
              
              <h3 className="font-black text-sm text-neutral-900 pb-3 border-b border-neutral-100">
                {language === 'fa' ? 'خلاصه فاکتور خرید' : 'Order Summary'}
              </h3>

              {/* Price Details */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-neutral-600">
                  <span>{language === 'fa' ? `قیمت کالاها (${toPersianDigits(cartTotalCount)}):` : 'Items Total:'}</span>
                  <span className="font-bold text-neutral-800">{formatPrice(cartTotalPrice, language)}</span>
                </div>

                {cartTotalDiscount > 0 && (
                  <div className="flex items-center justify-between text-red-500 font-bold">
                    <span>{language === 'fa' ? 'سود شما از تخفیف‌ها:' : 'Total Discounts:'}</span>
                    <span>- {formatPrice(cartTotalDiscount, language)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-neutral-600">
                  <span>{language === 'fa' ? 'هزینه ارسال:' : 'Shipping Fee:'}</span>
                  <span className="font-bold text-emerald-600">
                    {shippingFee === 0 
                      ? (language === 'fa' ? 'رایگان (دیجی‌پلاس)' : 'Free')
                      : formatPrice(shippingFee, language)}
                  </span>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="font-black text-neutral-900 text-sm">{language === 'fa' ? 'مبلغ قابل پرداخت:' : 'Payable Amount:'}</span>
                  <span className="font-black text-base text-[#ef4056]">{formatPrice(grandTotal, language)}</span>
                </div>
              </div>

              {/* Next Step Button */}
              <button
                onClick={() => setStep('shipping')}
                className="w-full bg-[#ef4056] hover:bg-[#e6123d] text-white text-xs sm:text-sm font-black py-3 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 transition-all cursor-pointer"
              >
                <span>{language === 'fa' ? 'ادامه فرآیند خرید' : 'Proceed to Shipping'}</span>
                {language === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

            </div>
          </div>

        </div>
      )}

      {/* STEP 2: SHIPPING & ADDRESS */}
      {step === 'shipping' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-8 space-y-4">
            
            {/* Address Selector */}
            <div className="bg-white rounded-3xl p-5 border border-neutral-200 shadow-xs space-y-4">
              <h3 className="font-black text-sm sm:text-base text-neutral-900 flex items-center gap-2 pb-3 border-b border-neutral-100">
                <MapPin className="w-5 h-5 text-[#ef4056]" />
                <span>{language === 'fa' ? 'انتخاب آدرس تحویل سفارش' : 'Delivery Address'}</span>
              </h3>

              <div className="space-y-3">
                {user.addresses.map((addr, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedAddress(addr)}
                    className="p-4 rounded-2xl border-2 border-[#ef4056] bg-red-50/20 cursor-pointer space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900">{addr.fullName}</span>
                      <span className="text-neutral-500">{addr.phoneNumber}</span>
                    </div>
                    <p className="text-neutral-700">{addr.province}، {addr.city}، {addr.streetAddress}، {addr.buildingNumber}، {addr.unit}</p>
                    <p className="text-neutral-400 font-mono">کد پستی: {addr.postalCode}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Time Slot Picker */}
            <div className="bg-white rounded-3xl p-5 border border-neutral-200 shadow-xs space-y-4">
              <h3 className="font-black text-sm sm:text-base text-neutral-900 flex items-center gap-2 pb-3 border-b border-neutral-100">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>{language === 'fa' ? 'انتخاب زمان و روز تحویل کالا' : 'Choose Delivery Schedule'}</span>
              </h3>

              {/* Day Selection */}
              <div className="grid grid-cols-3 gap-3">
                {['امروز - ارسال فوری', 'فردا - پنج‌شنبه', 'پس‌فردا - جمعه'].map((d, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDate(d)}
                    className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all cursor-pointer ${
                      selectedDate === d
                        ? 'border-[#ef4056] bg-red-50/40 text-[#ef4056]'
                        : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              {/* Time Slots */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {['ساعت ۹ تا ۱۲ صبح', 'ساعت ۱۲ تا ۱۵ ظهر', 'ساعت ۱۵ تا ۱۹ عصر'].map((slot, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all cursor-pointer ${
                      selectedTimeSlot === slot
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-200'
                        : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Promo Code Box */}
            <div className="bg-white rounded-3xl p-5 border border-neutral-200 shadow-xs space-y-3">
              <h3 className="font-black text-xs sm:text-sm text-neutral-900 flex items-center gap-2">
                <Tag className="w-4 h-4 text-purple-600" />
                <span>{language === 'fa' ? 'کد تخفیف دیجی‌کالا' : 'Promo / Voucher Code'}</span>
              </h3>
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="کد تخفیف (مثال: DIGI1403 یا PLUS)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs uppercase font-mono focus:outline-hidden focus:border-[#ef4056]"
                />
                <button
                  type="submit"
                  className="bg-neutral-800 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  {language === 'fa' ? 'ثبت کد' : 'Apply'}
                </button>
              </form>
              {promoApplied && (
                <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>کد تخفیف با موفقیت کسر شد.</span>
                </p>
              )}
            </div>

          </div>

          {/* Shipping Summary */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-neutral-200 shadow-xs space-y-4">
              <h3 className="font-black text-sm text-neutral-900 pb-3 border-b border-neutral-100">
                {language === 'fa' ? 'تأیید نهایی و پرداخت' : 'Final Payment'}
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-neutral-600">
                  <span>مجموع کالاها:</span>
                  <span className="font-bold text-neutral-800">{formatPrice(cartFinalPrice, language)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-emerald-600 font-bold">
                    <span>کد تخفیف:</span>
                    <span>- {formatPrice(discountAmount, language)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-neutral-600">
                  <span>هزینه ارسال:</span>
                  <span className="font-bold text-emerald-600">{shippingFee === 0 ? 'رایگان' : formatPrice(shippingFee, language)}</span>
                </div>
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="font-black text-sm">مبلغ قابل پرداخت:</span>
                  <span className="font-black text-base text-[#ef4056]">{formatPrice(grandTotal, language)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleFinalCheckout}
                  className="w-full bg-[#ef4056] hover:bg-[#e6123d] text-white text-xs sm:text-sm font-black py-3 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 transition-all cursor-pointer hover:scale-102"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{language === 'fa' ? 'پرداخت امن و ثبت نهایی سفارش' : 'Complete Purchase'}</span>
                </button>

                <button
                  onClick={() => setStep('cart')}
                  className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  {language === 'fa' ? 'بازگشت به سبد خرید' : 'Back to Cart'}
                </button>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* STEP 3: ORDER SUCCESS / INVOICE */}
      {step === 'success' && createdOrder && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-xl text-center space-y-4">
            
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md animate-in zoom-in-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-neutral-900">
              {language === 'fa' ? 'سفارش شما با موفقیت در دیجی‌کالا ثبت شد!' : 'Order Placed Successfully!'}
            </h2>

            <p className="text-xs sm:text-sm text-neutral-600">
              {language === 'fa' 
                ? 'پیامک تأیید سفارش و کد رهگیری مرسوله برای شماره شما ارسال گردید.' 
                : 'A confirmation SMS and tracking code have been dispatched to your mobile.'}
            </p>

            {/* Official Invoice Box */}
            <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 text-xs space-y-2 text-right">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                <span className="text-neutral-500">شماره سفارش:</span>
                <span className="font-mono font-black text-neutral-900">{createdOrder.orderNumber}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                <span className="text-neutral-500">کد رهگیری پستی:</span>
                <span className="font-mono font-black text-blue-600">{createdOrder.trackingCode}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                <span className="text-neutral-500">تاریخ و زمان تحویل:</span>
                <span className="font-bold text-neutral-800">{createdOrder.deliveryDate} ({createdOrder.deliveryTimeSlot})</span>
              </div>
              <div className="flex items-center justify-between pt-1 font-bold text-sm">
                <span>مبلغ پرداخت شده:</span>
                <span className="font-black text-emerald-600">{formatPrice(createdOrder.finalPrice, language)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
              <button
                onClick={() => setActiveTab('orders')}
                className="w-full bg-[#ef4056] text-white text-xs font-bold py-3 rounded-2xl shadow-md cursor-pointer hover:bg-[#e6123d]"
              >
                {language === 'fa' ? 'پیگیری در سفارش‌های من' : 'Track in My Orders'}
              </button>
              <button
                onClick={() => setActiveTab('home')}
                className="w-full bg-neutral-100 text-neutral-700 text-xs font-bold py-3 rounded-2xl hover:bg-neutral-200 cursor-pointer"
              >
                {language === 'fa' ? 'بازگشت به صفحه اصلی' : 'Back to Home'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
