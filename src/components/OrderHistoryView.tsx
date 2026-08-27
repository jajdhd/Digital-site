import React from 'react';
import { 
  Package, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  ExternalLink, 
  Truck, 
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice, toPersianDigits } from '../utils/formatters';

export const OrderHistoryView: React.FC = () => {
  const { 
    language, 
    orders, 
    setActiveView, 
    setCurrentOrder 
  } = useShop();

  const handleViewReceipt = (order: any) => {
    setCurrentOrder(order);
    setActiveView('order-success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 text-slate-900 space-y-6 animate-fadeIn">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-xl text-slate-900">
              {language === 'fa' ? 'تاریخچه سفارشات و رهگیری مرسولات' : 'Order History & Tracking'}
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              {language === 'fa' ? 'سفارشات ثبت و پرداخت شده در درگاه رسمی' : 'All verified and completed orders'}
            </span>
          </div>
        </div>

        <button
          onClick={() => setActiveView('shop')}
          className="bg-white hover:bg-slate-50 text-xs text-slate-700 font-bold px-4 py-2 rounded-xl border border-slate-200 shadow-xs cursor-pointer"
        >
          {language === 'fa' ? 'بازگشت به فروشگاه' : 'Shop'}
        </button>
      </div>

      {/* Orders List */}
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs hover:border-emerald-300 transition-all"
            >
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {order.orderNumber}
                  </span>
                  <span className="text-slate-500">
                    {new Date(order.date).toLocaleDateString('fa-IR')}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-extrabold border border-emerald-200 text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{order.status === 'PAID' ? 'پرداخت موفق شاپرک' : order.status}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">کد رهگیری پست:</span>
                  <span className="font-mono text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded-lg border border-orange-200">
                    {order.trackingCode}
                  </span>
                </div>
              </div>

              {/* Items in this order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white p-1 shrink-0 flex items-center justify-center border border-slate-200">
                      <img src={item.product.image} alt="" className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-xs text-slate-900 truncate">
                        {language === 'fa' ? item.product.titleFa : item.product.titleEn}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                        <span>{language === 'fa' ? `تعداد: ${toPersianDigits(item.quantity)}` : `Qty: ${item.quantity}`}</span>
                        {item.selectedColor && (
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full border border-slate-300" style={{ backgroundColor: item.selectedColor.hex }}></span>
                            <span>{language === 'fa' ? item.selectedColor.nameFa : item.selectedColor.nameEn}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer & Action */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <span className="text-slate-500">
                    شماره پیگیری شاپرک: <strong className="text-slate-900 font-mono">{order.transactionRefId || 'N/A'}</strong>
                  </span>
                  <span className="block text-orange-600 font-black font-mono text-sm">
                    مبلغ کل: {formatPrice(order.total, language === 'fa')}
                  </span>
                </div>

                <button
                  onClick={() => handleViewReceipt(order)}
                  className="bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs px-4 py-2 rounded-xl border border-slate-200 shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>{language === 'fa' ? 'مشاهده و چاپ فاکتور' : 'View Full Receipt'}</span>
                  {language === 'fa' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3 shadow-xs">
          <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="font-bold text-base text-slate-900">
            {language === 'fa' ? 'تاکنون سفارشی ثبت نکرده‌اید' : 'No orders placed yet'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {language === 'fa'
              ? 'پس از افزودن کالا و پرداخت از طریق درگاه زرین‌پال، سفارشات شما در این بخش نمایش داده می‌شوند.'
              : 'Completed store orders with Zarinpal payment receipts will appear here.'}
          </p>
          <button
            onClick={() => setActiveView('shop')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-2xl cursor-pointer shadow-sm transition"
          >
            {language === 'fa' ? 'مشاهده محصولات فروشگاه' : 'Start Shopping'}
          </button>
        </div>
      )}

    </div>
  );
};
