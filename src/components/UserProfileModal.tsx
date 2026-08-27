import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Crown, 
  Wallet, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Trash2
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice, toPersianDigits } from '../utils/formatters';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from './ProductCard';

export const UserProfileModal: React.FC = () => {
  const { 
    language, 
    user, 
    updateUser, 
    orders, 
    wishlist, 
    toggleWishlist,
    setActiveTab,
    showNotification 
  } = useShop();

  const [activeSubTab, setActiveSubTab] = useState<'orders' | 'profile' | 'wishlist' | 'wallet' | 'addresses'>('orders');
  
  // Profile edit states
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);

  // Top-up wallet state
  const [topUpAmount, setTopUpAmount] = useState('500000');

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, phone, email });
  };

  const handleTopUpWallet = () => {
    const val = parseInt(topUpAmount, 10);
    if (!isNaN(val) && val > 0) {
      updateUser({ walletBalance: user.walletBalance + val });
      showNotification(language === 'fa' ? `مبلغ ${formatPrice(val, language)} به کیف پول شما اضافه شد!` : 'Wallet topped up successfully!');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 my-8">
      
      {/* Top Banner Summary Card */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 rounded-3xl p-6 text-white shadow-xl mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/40 text-[#ef4056] flex items-center justify-center font-black text-2xl">
              <User className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black">{user.name}</h1>
                {user.isPlusMember && (
                  <span className="bg-purple-600 text-white text-[11px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    دیجی‌پلاس
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">{user.phone} • {user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
            <div className="text-right">
              <span className="text-[11px] text-neutral-400 block">{language === 'fa' ? 'موجودی کیف پول:' : 'Wallet Balance:'}</span>
              <span className="font-black text-sm text-amber-300">{formatPrice(user.walletBalance, language)}</span>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div className="text-right">
              <span className="text-[11px] text-neutral-400 block">{language === 'fa' ? 'امتیاز دیجی‌کلاب:' : 'DigiClub Points:'}</span>
              <span className="font-black text-sm text-white">{toPersianDigits(user.digiClubPoints)} {language === 'fa' ? 'امتیاز' : 'pts'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Navigation Sidebar (3 cols) */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl p-4 border border-neutral-200 shadow-xs space-y-1">
            <button
              onClick={() => setActiveSubTab('orders')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeSubTab === 'orders' ? 'bg-red-50 text-[#ef4056]' : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                <span>{language === 'fa' ? 'سفارش‌های من' : 'My Orders'}</span>
              </div>
              <span className="bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full text-[10px] font-mono">
                {toPersianDigits(orders.length)}
              </span>
            </button>

            <button
              onClick={() => setActiveSubTab('wishlist')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeSubTab === 'wishlist' ? 'bg-red-50 text-[#ef4056]' : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>{language === 'fa' ? 'لیست علاقه‌مندی‌ها' : 'Wishlist'}</span>
              </div>
              <span className="bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full text-[10px] font-mono">
                {toPersianDigits(wishlist.length)}
              </span>
            </button>

            <button
              onClick={() => setActiveSubTab('wallet')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeSubTab === 'wallet' ? 'bg-red-50 text-[#ef4056]' : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                <span>{language === 'fa' ? 'کیف پول دیجی‌پی' : 'DigiPay Wallet'}</span>
              </div>
            </button>

            <button
              onClick={() => setActiveSubTab('addresses')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeSubTab === 'addresses' ? 'bg-red-50 text-[#ef4056]' : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{language === 'fa' ? 'آدرس‌های من' : 'Saved Addresses'}</span>
              </div>
            </button>

            <button
              onClick={() => setActiveSubTab('profile')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeSubTab === 'profile' ? 'bg-red-50 text-[#ef4056]' : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{language === 'fa' ? 'اطلاعات حساب کاربری' : 'Personal Info'}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Content Details (9 cols) */}
        <div className="lg:col-span-9 space-y-4">
          
          {/* TAB 1: ORDERS */}
          {activeSubTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="font-black text-sm sm:text-base text-neutral-900">
                {language === 'fa' ? 'تاریخچه و وضعیت سفارش‌های شما' : 'Order History'}
              </h2>

              {orders.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 text-center border border-neutral-200 space-y-2">
                  <Package className="w-12 h-12 text-neutral-300 mx-auto" />
                  <p className="text-xs text-neutral-500">شما تاکنون سفارشی ثبت نکرده‌اید.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div key={ord.id} className="bg-white rounded-3xl p-5 border border-neutral-200 shadow-xs space-y-3">
                      
                      {/* Order Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-100 text-xs">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-neutral-800">{ord.orderNumber}</span>
                          <span className="text-neutral-400">•</span>
                          <span className="text-neutral-500">{ord.date}</span>
                        </div>

                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                          ord.status === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {ord.status === 'delivered' ? 'تحویل شده' : 'در حال آماده‌سازی و ارسال'}
                        </span>
                      </div>

                      {/* Item thumbnails */}
                      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="w-16 h-16 rounded-xl bg-neutral-50 p-1 border border-neutral-100 shrink-0 flex items-center justify-center" title={item.product.titleFa}>
                            <img src={item.product.images[0]} alt="" className="w-full h-full object-contain" />
                          </div>
                        ))}
                      </div>

                      {/* Footer Info */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-neutral-100">
                        <div className="text-neutral-500">
                          <span>کد رهگیری مرسوله: </span>
                          <span className="font-mono font-bold text-blue-600">{ord.trackingCode}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500">مبلغ کل: </span>
                          <span className="font-black text-neutral-900">{formatPrice(ord.finalPrice, language)}</span>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WISHLIST */}
          {activeSubTab === 'wishlist' && (
            <div className="space-y-4">
              <h2 className="font-black text-sm sm:text-base text-neutral-900">
                {language === 'fa' ? 'کالاهای ذخیره شده در لیست علاقه‌مندی‌ها' : 'My Wishlist Items'}
              </h2>

              {wishlistProducts.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 text-center border border-neutral-200">
                  <Heart className="w-12 h-12 text-neutral-300 mx-auto mb-2" />
                  <p className="text-xs text-neutral-500">لیست علاقه‌مندی‌های شما خالی است.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlistProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: WALLET */}
          {activeSubTab === 'wallet' && (
            <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-6">
              <div>
                <h2 className="font-black text-base text-neutral-900">کیف پول دیجیتال دیجی‌پی</h2>
                <p className="text-xs text-neutral-500 mt-1">پرداخت سریع و بدون نیاز به درگاه بانکی در تمامی خریدهای دیجی‌کالا</p>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 max-w-sm space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-200 font-bold">دیجی‌پی / DigiPay</span>
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div className="py-2">
                  <span className="text-xs text-blue-200 block">موجودی فعلی شما:</span>
                  <span className="text-2xl font-black">{formatPrice(user.walletBalance, language)}</span>
                </div>
                <span className="text-[11px] text-blue-200 font-mono">**** **** **** 8942</span>
              </div>

              {/* Quick Top-up */}
              <div className="space-y-3 pt-4 border-t border-neutral-100 max-w-sm">
                <span className="text-xs font-bold text-neutral-800 block">افزایش موجودی کیف پول:</span>
                <div className="flex gap-2">
                  {['200000', '500000', '1000000'].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setTopUpAmount(amt)}
                      className={`text-xs px-3 py-1.5 rounded-xl border font-bold cursor-pointer ${
                        topUpAmount === amt ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-neutral-200'
                      }`}
                    >
                      {formatPrice(Number(amt), language)}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleTopUpWallet}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  شارژ آنلاین کیف پول
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: ADDRESSES */}
          {activeSubTab === 'addresses' && (
            <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-4">
              <h2 className="font-black text-base text-neutral-900">آدرس‌های ذخیره شده</h2>
              <div className="space-y-3">
                {user.addresses.map((addr, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-neutral-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900">{addr.fullName} ({addr.phoneNumber})</span>
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">آدرس پیش‌فرض</span>
                    </div>
                    <p className="text-neutral-600">{addr.province}، {addr.city}، {addr.streetAddress}، {addr.buildingNumber}، {addr.unit}</p>
                    <p className="text-neutral-400 font-mono">کد پستی: {addr.postalCode}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PROFILE EDIT */}
          {activeSubTab === 'profile' && (
            <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-4">
              <h2 className="font-black text-base text-neutral-900">ویرایش اطلاعات شخصی</h2>
              <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-neutral-700 block">نام و نام‌خانوادگی:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-neutral-700 block">شماره تلفن همراه:</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-800 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-neutral-700 block">ایمیل:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-800 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#ef4056] text-white font-bold px-6 py-2.5 rounded-xl hover:bg-[#e6123d] transition-colors cursor-pointer"
                >
                  ذخیره تغییرات
                </button>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
