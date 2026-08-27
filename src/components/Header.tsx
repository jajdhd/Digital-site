import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Settings2, 
  Package, 
  Code2, 
  Sparkles, 
  Globe, 
  Menu, 
  X,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Zap,
  User,
  Heart,
  Layers,
  Flame
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { toPersianDigits } from '../utils/formatters';

export const Header: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    activeView, 
    setActiveView, 
    cartSummary, 
    setIsCartDrawerOpen,
    searchQuery,
    setSearchQuery,
    gatewayConfig,
    currentUser,
    wishlist,
    comparisonList,
    setIsComparisonModalOpen
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      
      {/* Top micro-bar for Iranian e-commerce trust guarantees */}
      <div className="bg-emerald-50/70 border-b border-emerald-100/80 py-1.5 px-4 text-[11px] text-emerald-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-800 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {language === 'fa' ? 'فروشگاه اینترنتی رستم شاپ • درگاه پرداخت مستقیم شاپرک و زرین‌پال v4' : 'Rostam Shop • Official Zarinpal & Shaparak Payment Gateway'}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-600 font-medium">
              <Zap className="w-3 h-3 text-orange-500" />
              {language === 'fa' ? 'ارسال اکسپرس رایگان برای خریدهای بالای ۱۰ میلیون تومان' : 'Free Express Shipping Over 10M Tomans'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:flex items-center gap-1 font-mono text-[10px] text-slate-500 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {gatewayConfig.isSandbox ? 'درگاه تستی شاپرک (Sandbox)' : 'شاپرک عملیاتی'}
            </span>

            {/* Language switch */}
            <button
              onClick={() => setLanguage(language === 'fa' ? 'en' : 'fa')}
              className="flex items-center gap-1 text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer text-[11px] bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-xs font-semibold"
            >
              <Globe className="w-3 h-3 text-emerald-600" />
              <span>{language === 'fa' ? 'English' : 'فارسی'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('shop')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-orange-500 p-0.5 shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <div>
              <span className="font-black text-xl tracking-tight text-slate-900 flex items-center gap-1">
                رستم <span className="text-orange-500">شاپ</span>
              </span>
              <span className="text-[10px] text-slate-500 block -mt-1 font-semibold">
                {language === 'fa' ? 'فروشگاه تخصصی کالا و درگاه پرداخت' : 'Rostam Digital Shop & Gateway'}
              </span>
            </div>
          </button>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-4 relative">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'fa' ? 'جستجوی لپ‌تاپ، گوشی، هدفون، ساعت هوشمند در رستم شاپ...' : 'Search laptops, smartphones, headphones...'}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pr-10 pl-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-700">
          <button
            onClick={() => setActiveView('shop')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              activeView === 'shop'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'hover:text-emerald-700 hover:bg-slate-50'
            }`}
          >
            {language === 'fa' ? 'فروشگاه' : 'Store'}
          </button>

          {/* DEDICATED PAYMENT PAGE */}
          <button
            onClick={() => setActiveView('payment-page')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeView === 'payment-page'
                ? 'bg-orange-50 text-orange-700 border border-orange-200 shadow-xs'
                : 'hover:text-orange-600 hover:bg-orange-50/50'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-orange-500" />
            <span>{language === 'fa' ? 'صفحه پرداخت و فاکتور' : 'Online Pay'}</span>
          </button>

          {/* Compare Button */}
          <button
            onClick={() => setIsComparisonModalOpen(true)}
            className="px-3 py-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-50 transition flex items-center gap-1.5 relative"
            title="مقایسه کالاها"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'fa' ? 'مقایسه' : 'Compare'}</span>
            {comparisonList.length > 0 && (
              <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {toPersianDigits(comparisonList.length)}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveView('order-history')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeView === 'order-history'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'hover:text-emerald-700 hover:bg-slate-50'
            }`}
          >
            <Package className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'fa' ? 'پیگیری سفارشات' : 'My Orders'}</span>
          </button>

          <button
            onClick={() => setActiveView('dev-docs')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeView === 'dev-docs'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'hover:text-emerald-700 hover:bg-slate-50'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-slate-500" />
            <span>{language === 'fa' ? 'مستندات API' : 'API Docs'}</span>
          </button>

          <button
            onClick={() => setActiveView('gateway-settings')}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
            title="تنظیمات درگاه"
          >
            <Settings2 className="w-4 h-4" />
          </button>
        </nav>

        {/* Right Actions: User Auth, Wishlist & Cart Drawer */}
        <div className="flex items-center gap-2">
          {/* Wishlist Quick Counter */}
          <button
            onClick={() => {
              // Scroll to product grid or open wishlist info
              setActiveView('shop');
            }}
            className="hidden sm:flex items-center justify-center p-2.5 rounded-2xl bg-white border border-slate-200 hover:border-rose-300 text-slate-600 hover:text-rose-500 transition relative"
            title="لیست علاقه‌مندی‌ها"
          >
            <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -left-1.5 bg-rose-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {toPersianDigits(wishlist.length)}
              </span>
            )}
          </button>

          {/* User Button */}
          {currentUser ? (
            <button
              onClick={() => setActiveView('user-profile')}
              className={`flex items-center gap-2 px-3 py-2 rounded-2xl border text-xs font-bold transition shadow-xs ${
                activeView === 'user-profile'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">
                {currentUser.fullName.charAt(0)}
              </div>
              <span className="hidden sm:inline font-semibold">{currentUser.fullName.split(' ')[0]}</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveView('auth')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white border border-slate-200 hover:border-orange-300 hover:bg-orange-50 text-slate-700 hover:text-orange-600 text-xs font-bold transition shadow-xs"
            >
              <User className="w-4 h-4 text-orange-500" />
              <span>{language === 'fa' ? 'ورود / ثبت‌نام' : 'Login / Register'}</span>
            </button>
          )}

          {/* Cart Button */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="relative bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 sm:px-4 py-2.5 rounded-2xl transition shadow-md shadow-emerald-600/20 flex items-center gap-2 cursor-pointer group"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-100 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-extrabold hidden sm:inline">
              {language === 'fa' ? 'سبد خرید' : 'Cart'}
            </span>
            {cartSummary.totalItemCount > 0 && (
              <span className="bg-orange-500 text-white font-black text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-xs">
                {language === 'fa' ? toPersianDigits(cartSummary.totalItemCount) : cartSummary.totalItemCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-2xl bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-3 shadow-lg">
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'fa' ? 'جستجوی کالا در رستم شاپ...' : 'Search products...'}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              onClick={() => { setActiveView('shop'); setIsMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 text-right"
            >
              {language === 'fa' ? 'محصولات فروشگاه' : 'Store Products'}
            </button>
            <button
              onClick={() => { setActiveView('payment-page'); setIsMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-700 text-right"
            >
              {language === 'fa' ? 'صفحه پرداخت و فاکتور' : 'Online Pay'}
            </button>
            <button
              onClick={() => { setIsComparisonModalOpen(true); setIsMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-right flex items-center justify-between"
            >
              <span>{language === 'fa' ? 'مقایسه محصولات' : 'Compare'}</span>
              <span className="text-emerald-600 font-bold">{toPersianDigits(comparisonList.length)}</span>
            </button>
            <button
              onClick={() => { setActiveView(currentUser ? 'user-profile' : 'auth'); setIsMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 text-right"
            >
              {currentUser ? (language === 'fa' ? 'پروفایل کاربری' : 'Profile') : (language === 'fa' ? 'ورود / ثبت‌نام' : 'Sign In')}
            </button>
            <button
              onClick={() => { setActiveView('order-history'); setIsMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 text-right"
            >
              {language === 'fa' ? 'پیگیری سفارشات' : 'My Orders'}
            </button>
            <button
              onClick={() => { setActiveView('dev-docs'); setIsMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 text-right"
            >
              {language === 'fa' ? 'مستندات API' : 'API Docs'}
            </button>
            <button
              onClick={() => { setActiveView('gateway-settings'); setIsMobileMenuOpen(false); }}
              className="col-span-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 text-center"
            >
              {language === 'fa' ? 'تنظیمات درگاه پرداخت شاپرک' : 'Gateway Config'}
            </button>
          </div>
        </div>
      )}

    </header>
  );
};

