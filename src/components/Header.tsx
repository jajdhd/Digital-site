import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  User, 
  MapPin, 
  Globe, 
  Heart, 
  Sparkles, 
  ChevronDown, 
  Layers, 
  Crown, 
  LogOut, 
  Package, 
  Wallet,
  Scale
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice, toPersianDigits } from '../utils/formatters';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    cartTotalCount,
    cartFinalPrice,
    wishlist,
    compareList,
    user,
    setActiveTab,
    setIsSearchModalOpen,
    setIsAssistantOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategory
  } = useShop();

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('تهران، ونک');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveTab('catalog');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-xs">
      {/* Top Notification / Promo Ribbon */}
      <div className="bg-[#ef4056] text-white text-xs sm:text-sm py-1.5 px-4 font-medium flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-5xl mx-auto text-center justify-center w-full">
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-bold">
            {language === 'fa' ? 'جشنواره بهاره' : 'Spring Fest'}
          </span>
          <span>
            {language === 'fa' 
              ? 'تخفیف‌های ویژه شگفت‌انگیز دیجی‌کالا تا ۷۰٪ روی هزاران محصول انتخابی' 
              : 'Special Digikala Incredible discounts up to 70% on selected items'}
          </span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Right Section (in RTL): Logo & Search */}
        <div className="flex items-center gap-4 flex-1">
          {/* Digikala Brand Logo */}
          <button 
            onClick={() => { setActiveTab('home'); setSelectedCategory('all'); setSearchQuery(''); }}
            className="flex items-center gap-1.5 cursor-pointer shrink-0 group text-left"
            title="صفحه اصلی دیجی‌کالا"
          >
            {/* Custom SVG Digikala-style Red Smile Badge */}
            <div className="w-10 h-10 rounded-xl bg-[#ef4056] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14a8 8 0 0 0 16 0" />
                <circle cx="8" cy="9" r="1.5" fill="currentColor" />
                <circle cx="16" cy="9" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-[#ef4056] tracking-tighter leading-none">
                {language === 'fa' ? 'دیجی‌کالا' : 'digikala'}
              </span>
              <span className="text-[10px] text-neutral-400 font-semibold tracking-wider">
                ONLINE STORE
              </span>
            </div>
          </button>

          {/* Search Bar Input */}
          <div className="relative flex-1 max-w-2xl hidden md:block">
            <form onSubmit={handleSearchSubmit}>
              <div 
                onClick={() => setIsSearchModalOpen(true)}
                className="w-full bg-[#f0f0f1] hover:bg-[#e6e6e8] transition-colors rounded-xl py-2.5 px-4 flex items-center gap-3 cursor-pointer text-neutral-500 text-sm border border-transparent focus-within:border-[#ef4056] focus-within:bg-white"
              >
                <Search className="w-4 h-4 text-neutral-400 shrink-0" />
                <span className="truncate flex-1 text-neutral-500">
                  {searchQuery || (language === 'fa' ? 'جستجو در دیجی‌کالا (نام کالا، برند یا دسته‌بندی)...' : 'Search in Digikala (products, brands, categories)...')}
                </span>
                <span className="text-[11px] bg-white text-neutral-500 px-2 py-0.5 rounded-md border border-neutral-200 shadow-2xs">
                  Ctrl + K
                </span>
              </div>
            </form>
          </div>
        </div>

        {/* Left Section (in RTL): Language, AI Assistant, Location, User & Cart */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Mobile search trigger */}
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="md:hidden p-2 text-neutral-700 hover:bg-neutral-100 rounded-lg cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Digikala AI Shopping Assistant Button */}
          <button
            onClick={() => setIsAssistantOpen(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-xs hover:opacity-95 transition-all cursor-pointer hover:scale-105"
            title="دیجی‌دستیار هوشمند هوش مصنوعی"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="hidden sm:inline">
              {language === 'fa' ? 'دیجی‌دستیار هوشمند' : 'AI Advisor'}
            </span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'fa' ? 'en' : 'fa')}
            className="p-2 text-xs font-bold text-neutral-600 hover:text-[#ef4056] hover:bg-neutral-100 rounded-lg flex items-center gap-1 transition-colors cursor-pointer border border-neutral-200"
            title="تغییر زبان / Switch Language"
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase">{language === 'fa' ? 'EN' : 'فا'}</span>
          </button>

          {/* Comparison Tool Button */}
          {compareList.length > 0 && (
            <button
              onClick={() => setActiveTab('compare')}
              className="relative p-2 text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors cursor-pointer"
              title="مقایسه کالاها"
            >
              <Scale className="w-5 h-5 text-[#ef4056]" />
              <span className="absolute -top-1 -right-1 bg-[#ef4056] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {toPersianDigits(compareList.length)}
              </span>
            </button>
          )}

          {/* User Profile / Auth Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center gap-1.5 py-1.5 px-3 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors text-xs sm:text-sm font-medium text-neutral-800 cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-red-100 text-[#ef4056] flex items-center justify-center font-bold">
                <User className="w-4 h-4" />
              </div>
              <span className="hidden lg:inline max-w-[120px] truncate">{user.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div 
                className="absolute left-0 sm:left-auto right-0 sm:right-auto top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-neutral-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-right"
                onMouseLeave={() => setIsProfileDropdownOpen(false)}
              >
                <div className="pb-3 border-b border-neutral-100 px-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900 text-sm">{user.name}</span>
                    {user.isPlusMember && (
                      <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Crown className="w-3 h-3 text-purple-600" />
                        {language === 'fa' ? 'کاربر پلاس' : 'Plus Member'}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-neutral-400">{user.phone}</span>
                </div>

                <div className="py-2 space-y-1">
                  <button
                    onClick={() => { setActiveTab('profile'); setIsProfileDropdownOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <User className="w-4 h-4 text-neutral-400" />
                    <span>{language === 'fa' ? 'حساب کاربری من' : 'My Account'}</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('orders'); setIsProfileDropdownOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <Package className="w-4 h-4 text-neutral-400" />
                    <span>{language === 'fa' ? 'سفارش‌های من' : 'My Orders'}</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('plus'); setIsProfileDropdownOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-purple-700 hover:bg-purple-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <Crown className="w-4 h-4 text-purple-500" />
                    <span>{language === 'fa' ? 'اشتراک دیجی‌پلاس' : 'DigiPlus Membership'}</span>
                  </button>
                  <div className="px-2.5 py-2 bg-neutral-50 rounded-xl flex items-center justify-between text-xs">
                    <span className="text-neutral-500 flex items-center gap-1.5">
                      <Wallet className="w-3.5 h-3.5 text-neutral-400" />
                      {language === 'fa' ? 'کیف پول دیجی‌پی:' : 'Wallet:'}
                    </span>
                    <span className="font-bold text-neutral-800">{formatPrice(user.walletBalance, language)}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100">
                  <button
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{language === 'fa' ? 'خروج از حساب کاربری' : 'Sign Out'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart Icon & Badge */}
          <button
            onClick={() => setActiveTab('cart')}
            className="relative flex items-center gap-2 p-2.5 rounded-xl border border-neutral-200 hover:border-[#ef4056] hover:bg-red-50/40 transition-all cursor-pointer"
            title="سبد خرید"
          >
            <ShoppingCart className="w-5 h-5 text-neutral-800" />
            {cartTotalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#ef4056] text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-50">
                {toPersianDigits(cartTotalCount)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
