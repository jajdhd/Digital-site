import React from 'react';
import { 
  CheckCircle2, 
  Package, 
  Printer, 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  Phone, 
  CreditCard, 
  ShieldCheck, 
  Copy,
  Calendar,
  Sparkles,
  Truck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice, formatRials, toPersianDigits } from '../utils/formatters';

export const OrderSuccessView: React.FC = () => {
  const { 
    language, 
    currentOrder, 
    setActiveView, 
    showNotification 
  } = useShop();

  if (!currentOrder) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4 text-slate-900">
        <h3 className="font-bold text-lg">سفارشی یافت نشد</h3>
        <button
          onClick={() => setActiveView('shop')}
          className="bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-2xl"
        >
          بازگشت به فروشگاه
        </button>
      </div>
    );
  }

  const order = currentOrder;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showNotification(language === 'fa' ? `${label} کپی شد!` : `${label} copied!`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-slate-900 space-y-8 animate-fadeIn">
      
      {/* Top Congratulation Banner */}
      <div className="bg-white border border-emerald-300 rounded-3xl p-6 sm:p-8 text-center space-y-3 relative overflow-hidden shadow-md">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 mx-auto shadow-xs">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-xs font-extrabold border border-emerald-200">
          {language === 'fa' ? 'پرداخت زرین‌پال تأیید شد و سفارش نهایی گردید' : 'Payment Verified & Order Confirmed'}
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          {language === 'fa' ? 'سفارش شما با موفقیت ثبت و پرداخت گردید' : 'Thank You! Your Order is Placed'}
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          {language === 'fa'
            ? 'فاکتور الکترونیک و شناسه رهگیری پستی صادر شد. پیامک تأییدیه حاوی جزئیات سفارش به شماره شما ارسال گردید.'
            : 'Your official invoice and postal tracking code are generated. Confirmation SMS has been dispatched.'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <button
            onClick={handlePrint}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-200 flex items-center gap-1.5 cursor-pointer transition"
          >
            <Printer className="w-4 h-4 text-emerald-600" />
            <span>{language === 'fa' ? 'چاپ فاکتور رسمی' : 'Print Invoice'}</span>
          </button>

          <button
            onClick={() => setActiveView('order-history')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm transition"
          >
            <Package className="w-4 h-4" />
            <span>{language === 'fa' ? 'مشاهده در لیست سفارشات' : 'View in Orders'}</span>
          </button>
        </div>
      </div>

      {/* Official Invoice Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        
        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-emerald-700 uppercase">AURA ONLINE MARKETPLACE</span>
            <h3 className="font-black text-lg text-slate-900">
              {language === 'fa' ? 'رسید دیجیتال پرداخت الکترونیک' : 'Official Electronic Receipt'}
            </h3>
            <span className="text-xs text-slate-500 block font-mono font-bold">
              {language === 'fa' ? `شماره فاکتور: ${order.orderNumber}` : `Order #${order.orderNumber}`}
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs space-y-1 text-right">
            <div className="flex items-center gap-2 text-slate-600 font-semibold">
              <Calendar className="w-3.5 h-3.5 text-orange-500" />
              <span>{new Date(order.date).toLocaleDateString('fa-IR')}</span>
            </div>
            <div className="text-emerald-700 font-mono font-extrabold text-xs">
              STATUS: PAID (VERIFIED)
            </div>
          </div>
        </div>

        {/* Key Codes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 font-bold block">
              {language === 'fa' ? 'شماره پیگیری تراکنش شاپرک (Ref ID):' : 'Transaction Ref ID:'}
            </span>
            <div className="flex items-center justify-between">
              <span className="font-mono font-black text-sm text-emerald-700">
                {order.transactionRefId}
              </span>
              <button 
                onClick={() => handleCopy(order.transactionRefId || '', 'شماره پیگیری')}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 font-bold block">
              {language === 'fa' ? 'کد رهگیری مرسوله پست پیشتاز:' : 'Postal Tracking Code:'}
            </span>
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-orange-600">
                {order.trackingCode}
              </span>
              <button 
                onClick={() => handleCopy(order.trackingCode, 'کد رهگیری')}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 font-bold block">
              {language === 'fa' ? 'درگاه و کارت پرداخت‌کننده:' : 'Payment Card & Gateway:'}
            </span>
            <span className="font-mono text-xs text-slate-800 font-bold block">
              {order.cardPan || '6037-99**-****-8392'}
            </span>
            <span className="text-[10px] text-emerald-600 font-bold">Zarinpal Gateway v4</span>
          </div>

        </div>

        {/* Shipping details */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-emerald-700 font-bold">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{language === 'fa' ? 'نشانی تحویل سفارش:' : 'Shipping Address:'}</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            {order.shippingAddress.province}، {order.shippingAddress.city}، {order.shippingAddress.address} (کد پستی: {order.shippingAddress.postalCode})
          </p>
          <div className="flex items-center gap-4 text-slate-600 pt-1">
            <span>گیرنده: <strong className="text-slate-900">{order.shippingAddress.fullName}</strong></span>
            <span>موبایل: <strong className="text-slate-900 font-mono" dir="ltr">{order.shippingAddress.phone}</strong></span>
          </div>
        </div>

        {/* Items Table */}
        <div className="space-y-2">
          <h4 className="font-bold text-xs text-slate-600">
            {language === 'fa' ? 'اقلام خریداری شده در این سفارش:' : 'Purchased Items:'}
          </h4>

          <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
            <div className="bg-slate-50 p-3 grid grid-cols-12 text-slate-700 font-bold border-b border-slate-200">
              <div className="col-span-7">{language === 'fa' ? 'شرح کالا' : 'Product'}</div>
              <div className="col-span-2 text-center">{language === 'fa' ? 'تعداد' : 'Qty'}</div>
              <div className="col-span-3 text-left">{language === 'fa' ? 'قیمت کل' : 'Total'}</div>
            </div>

            {order.items.map((item, idx) => (
              <div key={idx} className="p-3 grid grid-cols-12 items-center border-b border-slate-100 last:border-0 bg-white">
                <div className="col-span-7 flex items-center gap-2">
                  <img src={item.product.image} alt="" className="w-8 h-8 object-contain rounded bg-slate-50 p-0.5 border border-slate-100" />
                  <span className="font-bold text-slate-900 line-clamp-1">{language === 'fa' ? item.product.titleFa : item.product.titleEn}</span>
                </div>
                <div className="col-span-2 text-center font-mono text-slate-700 font-bold">
                  {language === 'fa' ? toPersianDigits(item.quantity) : item.quantity}
                </div>
                <div className="col-span-3 text-left font-mono font-bold text-orange-600">
                  {formatPrice(item.product.priceTomans * item.quantity, language === 'fa')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total Price Box */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
          <span className="font-bold text-sm text-slate-900">
            {language === 'fa' ? 'کل مبلغ پرداخت شده:' : 'Total Paid Amount:'}
          </span>
          <div className="text-left">
            <span className="font-mono font-black text-lg text-orange-600">
              {formatPrice(order.total, language === 'fa')}
            </span>
            <span className="block text-[10px] text-slate-500 font-mono font-bold">
              {formatRials(order.total, language === 'fa')}
            </span>
          </div>
        </div>

      </div>

      {/* Return to shop */}
      <div className="text-center">
        <button
          onClick={() => setActiveView('shop')}
          className="bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs px-6 py-3 rounded-2xl border border-slate-200 shadow-xs transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <span>{language === 'fa' ? 'ادامه خرید و مشاهده سایر کالاهای فروشگاه' : 'Continue Shopping'}</span>
          {language === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      </div>

    </div>
  );
};
