import React from 'react';
import { X, Scale, Star, ShoppingCart, Check, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice, toPersianDigits } from '../utils/formatters';

export const ProductComparison: React.FC = () => {
  const { 
    language, 
    compareList, 
    removeFromCompare, 
    addToCart, 
    setActiveTab, 
    setSelectedProduct 
  } = useShop();

  if (compareList.length === 0) {
    return (
      <div className="max-w-4xl mx-auto my-12 px-4 text-center">
        <div className="bg-white rounded-3xl p-10 border border-neutral-200 shadow-sm space-y-4">
          <div className="w-20 h-20 rounded-full bg-red-50 text-[#ef4056] mx-auto flex items-center justify-center">
            <Scale className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-black text-neutral-900">
            {language === 'fa' ? 'کالایی برای مقایسه انتخاب نشده است' : 'No Items in Comparison'}
          </h2>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            {language === 'fa' 
              ? 'با کلیک روی آیکون ترازوی مقایسه در کارت هر کالا، مشخصات فنی را به طور همزمان مقایسه کنید.' 
              : 'Add products to compare by clicking the comparison scale icon.'}
          </p>
          <button
            onClick={() => setActiveTab('catalog')}
            className="bg-[#ef4056] text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-[#e6123d] transition-colors cursor-pointer inline-block"
          >
            {language === 'fa' ? 'مشاهده کاتالوگ محصولات' : 'Browse Catalog'}
          </button>
        </div>
      </div>
    );
  }

  // Extract all spec keys present in any product
  const allSpecSections: { [section: string]: Set<string> } = {};
  compareList.forEach((prod) => {
    Object.entries(prod.specs || {}).forEach(([section, keys]) => {
      if (!allSpecSections[section]) {
        allSpecSections[section] = new Set();
      }
      Object.keys(keys).forEach((k) => allSpecSections[section].add(k));
    });
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 my-8 space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 border border-neutral-200 flex items-center justify-between shadow-xs">
        <div>
          <h1 className="text-base sm:text-xl font-black text-neutral-900 flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#ef4056]" />
            <span>{language === 'fa' ? 'مقایسه مشخصات فنی کالاها' : 'Product Specification Comparison'}</span>
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            {language === 'fa' ? `مقایسه همزمان ${toPersianDigits(compareList.length)} کالا` : `Comparing ${compareList.length} items`}
          </p>
        </div>

        <button
          onClick={() => setActiveTab('catalog')}
          className="text-xs font-bold text-[#ef4056] hover:underline cursor-pointer"
        >
          {language === 'fa' ? '+ افزودن کالای دیگر' : '+ Add more'}
        </button>
      </div>

      {/* Comparison Grid Table */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm overflow-x-auto">
        
        {/* Products Header Row */}
        <div className="grid grid-cols-12 gap-4 pb-6 border-b border-neutral-200 min-w-[650px]">
          <div className="col-span-3 text-xs font-bold text-neutral-400 flex items-end pb-2">
            {language === 'fa' ? 'مشخصات / کالا' : 'Specs / Product'}
          </div>

          {compareList.map((prod) => (
            <div key={prod.id} className="col-span-3 space-y-3 relative group text-center">
              <button
                onClick={() => removeFromCompare(prod.id)}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors cursor-pointer"
                title="حذف از مقایسه"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div 
                onClick={() => setSelectedProduct(prod)}
                className="w-24 h-24 mx-auto bg-neutral-50 rounded-2xl p-2 border border-neutral-100 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
              >
                <img src={prod.images[0]} alt="" className="w-full h-full object-contain" />
              </div>

              <h3 
                onClick={() => setSelectedProduct(prod)}
                className="font-bold text-xs text-neutral-900 line-clamp-2 hover:text-[#ef4056] cursor-pointer"
              >
                {language === 'fa' ? prod.titleFa : prod.titleEn}
              </h3>

              <div className="text-center">
                <span className="font-black text-sm text-neutral-900 block">
                  {formatPrice(prod.price, language)}
                </span>
                <span className="text-[11px] text-amber-600 font-bold flex items-center justify-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {toPersianDigits(prod.rating.toFixed(1))}
                </span>
              </div>

              <button
                onClick={() => addToCart(prod)}
                className="w-full bg-[#ef4056] hover:bg-[#e6123d] text-white text-xs font-bold py-2 rounded-xl transition-colors cursor-pointer shadow-2xs"
              >
                {language === 'fa' ? 'افزودن به سبد' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>

        {/* Spec Sections */}
        <div className="divide-y divide-neutral-100 min-w-[650px]">
          {Object.entries(allSpecSections).map(([sectionTitle, keysSet], sIdx) => (
            <div key={sIdx} className="py-4 space-y-3">
              <h4 className="font-black text-xs text-[#ef4056] bg-red-50/70 px-3 py-1.5 rounded-lg inline-block">
                {sectionTitle}
              </h4>

              {Array.from(keysSet).map((specKey, kIdx) => (
                <div key={kIdx} className="grid grid-cols-12 gap-4 py-2 text-xs items-center hover:bg-neutral-50/70 rounded-lg px-2">
                  <div className="col-span-3 font-bold text-neutral-500">
                    {specKey}
                  </div>

                  {compareList.map((prod) => {
                    const val = prod.specs?.[sectionTitle]?.[specKey] || '-';
                    return (
                      <div key={prod.id} className="col-span-3 text-neutral-800 font-medium text-center">
                        {val}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
