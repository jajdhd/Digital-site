import React, { useState, useEffect } from 'react';
import { Search, X, TrendingUp, Clock, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/mockData';
import { formatPrice, toPersianDigits } from '../utils/formatters';

export const SearchModal: React.FC = () => {
  const { 
    language, 
    isSearchModalOpen, 
    setIsSearchModalOpen, 
    recentSearches, 
    addRecentSearch, 
    clearRecentSearches, 
    setSelectedProduct, 
    searchQuery, 
    setSearchQuery, 
    setActiveTab 
  } = useShop();

  const [inputVal, setInputVal] = useState(searchQuery);

  useEffect(() => {
    setInputVal(searchQuery);
  }, [searchQuery]);

  if (!isSearchModalOpen) return null;

  const popularSearches = [
    'آیفون ۱۶ پرو مکس',
    'سرخ کن بدون روغن فیلیپس',
    'هدفون سونی WH-1000XM5',
    'اسپرسوساز دلونگی',
    'زعفران قائنات کادویی',
    'گلکسی واچ ۷ سامسونگ'
  ];

  const matchedProducts = inputVal.trim()
    ? PRODUCTS.filter((p) => {
        const q = inputVal.toLowerCase();
        return (
          p.titleFa.toLowerCase().includes(q) ||
          p.titleEn.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.brandFa.toLowerCase().includes(q)
        );
      }).slice(0, 5)
    : [];

  const handleSelectSearch = (query: string) => {
    addRecentSearch(query);
    setSearchQuery(query);
    setActiveTab('catalog');
    setIsSearchModalOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      handleSelectSearch(inputVal);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-20">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200 border border-neutral-200">
        
        {/* Search Input Box */}
        <form onSubmit={handleFormSubmit} className="p-4 border-b border-neutral-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#ef4056] shrink-0" />
          <input
            type="text"
            autoFocus
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={language === 'fa' ? 'جستجو در دیجی‌کالا (نام کالا، برند، مشخصات)...' : 'Search for products, brands, specs...'}
            className="flex-1 text-sm sm:text-base font-medium text-neutral-900 focus:outline-hidden"
          />
          {inputVal && (
            <button
              type="button"
              onClick={() => setInputVal('')}
              className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchModalOpen(false)}
            className="p-1.5 rounded-xl text-neutral-500 hover:bg-neutral-100 transition-colors cursor-pointer text-xs font-bold"
          >
            {language === 'fa' ? 'بستن' : 'Close'}
          </button>
        </form>

        <div className="p-5 max-h-[70vh] overflow-y-auto space-y-6">
          
          {/* Live Search Results */}
          {inputVal.trim() && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-neutral-400 block">
                {language === 'fa' ? 'نتایج یافت شده:' : 'Matching Products:'}
              </span>

              {matchedProducts.length === 0 ? (
                <p className="text-xs text-neutral-400 py-2">
                  {language === 'fa' ? 'کالای مستقیمی یافت نشد، برای جستجوی کامل دکمه Enter را بزنید.' : 'No direct matches. Press Enter to search all.'}
                </p>
              ) : (
                <div className="space-y-2">
                  {matchedProducts.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        setSelectedProduct(prod);
                        setIsSearchModalOpen(false);
                      }}
                      className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-neutral-50 rounded-xl p-1 shrink-0 flex items-center justify-center">
                          <img src={prod.images[0]} alt="" className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">
                            {language === 'fa' ? prod.titleFa : prod.titleEn}
                          </h4>
                          <span className="text-[11px] text-neutral-400">{prod.brand}</span>
                        </div>
                      </div>

                      <span className="text-xs font-black text-neutral-900 shrink-0">
                        {formatPrice(prod.price, language)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-600 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{language === 'fa' ? 'جستجوهای اخیر شما' : 'Recent Searches'}</span>
                </span>
                <button
                  onClick={clearRecentSearches}
                  className="text-[11px] text-neutral-400 hover:text-red-500 cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>{language === 'fa' ? 'پاک کردن تاریخچه' : 'Clear'}</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {recentSearches.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSearch(s)}
                    className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>{s}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-neutral-600 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#ef4056]" />
              <span>{language === 'fa' ? 'بیشترین جستجوهای دیجی‌کالا' : 'Trending Searches'}</span>
            </span>

            <div className="flex flex-wrap gap-2">
              {popularSearches.map((ps, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSearch(ps)}
                  className="bg-red-50/60 hover:bg-red-100 text-[#ef4056] text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                >
                  {ps}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
