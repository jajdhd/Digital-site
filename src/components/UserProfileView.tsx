import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  User, 
  Wallet, 
  MapPin, 
  ShoppingBag, 
  ShieldCheck, 
  LogOut, 
  Plus, 
  ArrowRight, 
  Phone, 
  Mail, 
  Clock, 
  CreditCard, 
  ChevronLeft, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export const UserProfileView: React.FC = () => {
  const { 
    language, 
    currentUser, 
    logoutUser, 
    orders, 
    setActiveView, 
    chargeWallet, 
    showNotification,
    setCurrentOrder 
  } = useShop();

  const [topupAmount, setTopupAmount] = useState<number>(1000000);
  const [showChargeModal, setShowChargeModal] = useState<boolean>(false);

  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          {language === 'fa' ? 'وارد حساب کاربری خود شوید' : 'Sign in to your account'}
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          {language === 'fa' ? 'برای مشاهده سفارشات و کیف پول ابتدا وارد شوید.' : 'Please log in to view orders and wallet.'}
        </p>
        <button
          onClick={() => setActiveView('auth')}
          className="px-6 py-3 rounded-2xl bg-emerald-600 text-white text-sm font-bold shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition"
        >
          {language === 'fa' ? 'صفحه ورود و ثبت‌نام' : 'Go to Login'}
        </button>
      </div>
    );
  }

  const handleChargeWallet = () => {
    chargeWallet(topupAmount);
    setShowChargeModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Top Banner / User Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white flex items-center justify-center font-black text-2xl shadow-md shadow-emerald-600/20">
            {currentUser.fullName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">{currentUser.fullName}</h1>
              {currentUser.isVerified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>تأیید شده</span>
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-1 font-medium">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                <span dir="ltr">{currentUser.phone}</span>
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                <span>{currentUser.email}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setActiveView('payment-page')}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition"
          >
            <CreditCard className="w-4 h-4" />
            <span>{language === 'fa' ? 'پرداخت فاکتور آنلاین' : 'Online Pay'}</span>
          </button>
          <button
            onClick={() => {
              logoutUser();
              setActiveView('shop');
            }}
            className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>{language === 'fa' ? 'خروج' : 'Logout'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Wallet & Quick Stats */}
        <div className="lg:col-span-4 space-y-6">
          {/* Wallet Card */}
          <div className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800 rounded-3xl p-6 text-white shadow-lg shadow-emerald-700/15 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-emerald-100 flex items-center gap-1.5">
                  <Wallet className="w-4 h-4 text-orange-300" />
                  موجودی کیف پول رستم شاپ
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold">عضو طلایی</span>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-black">{currentUser.walletBalanceTomans.toLocaleString('fa-IR')}</span>
                <span className="text-xs text-emerald-200 mr-1.5">تومان</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowChargeModal(true)}
                  className="flex-1 py-2.5 rounded-xl bg-white text-emerald-800 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:bg-emerald-50 transition"
                >
                  <Plus className="w-4 h-4 text-orange-500" />
                  <span>افزایش موجودی آنلاین</span>
                </button>
                <button
                  onClick={() => setActiveView('payment-page')}
                  className="px-3 py-2.5 rounded-xl bg-emerald-900/40 text-emerald-100 hover:bg-emerald-900/60 font-bold text-xs flex items-center justify-center transition"
                  title="درگاه مستقیم"
                >
                  <CreditCard className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Saved Addresses */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                {language === 'fa' ? 'آدرس تحویل کالا' : 'Shipping Address'}
              </h3>
            </div>

            {currentUser.savedAddresses && currentUser.savedAddresses.length > 0 ? (
              currentUser.savedAddresses.map((addr, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span>{addr.province} - {addr.city}</span>
                    <span className="text-emerald-600 text-[11px]">آدرس پیش‌فرض</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{addr.address}</p>
                  <div className="flex items-center justify-between text-slate-500 pt-1 text-[11px]">
                    <span>کدپستی: <strong className="font-mono">{addr.postalCode}</strong></span>
                    <span>گیرنده: <strong>{addr.fullName}</strong></span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400">آدرسی ثبت نشده است.</p>
            )}
          </div>
        </div>

        {/* Right Column: Order History & Activities */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {language === 'fa' ? 'تاریخچه سفارشات و تراکنش‌های آنلاین' : 'Recent Orders & Transactions'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'fa' ? `${orders.length} سفارش ثبت شده در سیستم` : `${orders.length} orders recorded`}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveView('order-history')}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                <span>{language === 'fa' ? 'مشاهده همه و رهگیری پستی' : 'Track all'}</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                هنوز سفارشی ثبت نکرده‌اید.
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm font-mono">{ord.orderNumber}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                          پرداخت موفق شاپرک
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 flex flex-wrap gap-4">
                        <span>تاریخ: {new Date(ord.date).toLocaleDateString('fa-IR')}</span>
                        {ord.transactionRefId && <span>کد پیگیری: <strong className="font-mono text-slate-700">{ord.transactionRefId}</strong></span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200">
                      <div className="text-left sm:text-right">
                        <div className="font-extrabold text-orange-600 text-base font-mono">
                          {ord.total.toLocaleString('fa-IR')} <span className="text-xs text-slate-500 font-normal">تومان</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setCurrentOrder(ord);
                          setActiveView('order-success');
                        }}
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition"
                      >
                        {language === 'fa' ? 'فاکتور الکترونیک' : 'Invoice'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Charge Wallet Modal */}
      {showChargeModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">افزایش موجودی کیف پول</h3>
            <p className="text-xs text-slate-500 mb-4">مبلغ مورد نظر را انتخاب نموده و به درگاه متصل شوید.</p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {[500000, 1000000, 2000000, 5000000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setTopupAmount(amt)}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition ${
                    topupAmount === amt
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {amt.toLocaleString('fa-IR')} تومان
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowChargeModal(false)}
                className="flex-1 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition"
              >
                انصراف
              </button>
              <button
                onClick={handleChargeWallet}
                className="flex-1 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition"
              >
                شارژ آنی کیف پول
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
