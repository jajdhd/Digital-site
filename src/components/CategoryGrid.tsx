import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { useShop } from '../context/ShopContext';

export const CategoryGrid: React.FC = () => {
  const { language, setSelectedCategory, setActiveTab } = useShop();

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setActiveTab('catalog');
  };

  return (
    <section className="max-w-7xl mx-auto my-10 px-3 sm:px-6">
      <div className="text-center mb-6">
        <h2 className="text-lg sm:text-2xl font-black text-neutral-900">
          {language === 'fa' ? 'خرید بر اساس دسته‌بندی‌های دیجی‌کالا' : 'Shop by Digikala Categories'}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          {language === 'fa' ? 'دسته‌بندی‌های محبوب با بیشترین تنوع محصول' : 'Popular categories with maximum product variety'}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className="bg-white rounded-2xl p-4 border border-neutral-200/80 hover:border-[#ef4056] hover:shadow-md transition-all flex flex-col items-center text-center cursor-pointer group"
          >
            {/* Image Circle */}
            <div className="w-24 h-24 rounded-2xl overflow-hidden mb-3 bg-neutral-100 p-1 group-hover:scale-105 transition-transform">
              <img
                src={cat.image}
                alt={cat.titleFa}
                className="w-full h-full object-cover rounded-xl"
                loading="lazy"
              />
            </div>

            {/* Title */}
            <h3 className="font-bold text-xs sm:text-sm text-neutral-800 group-hover:text-[#ef4056] transition-colors line-clamp-1">
              {language === 'fa' ? cat.titleFa : cat.titleEn}
            </h3>

            {/* Subcategories count preview */}
            <span className="text-[11px] text-neutral-400 mt-1">
              {language === 'fa' ? `+${cat.subcategories.length * 4} کالا` : `${cat.subcategories.length * 4}+ items`}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
