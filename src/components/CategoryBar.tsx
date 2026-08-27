import React from 'react';
import { 
  Grid, 
  Smartphone, 
  Headphones, 
  Gamepad2, 
  Sparkles,
  Home,
  ShoppingBag,
  ArrowUpDown
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';
import { ProductCategory } from '../types';
import { toPersianDigits } from '../utils/formatters';

export const CategoryBar: React.FC = () => {
  const { 
    language, 
    selectedCategory, 
    setSelectedCategory, 
    sortBy, 
    setSortBy,
    products 
  } = useShop();

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'smartphones-laptops':
        return <Smartphone className="w-4 h-4" />;
      case 'audio-wearables':
        return <Headphones className="w-4 h-4" />;
      case 'gaming-console':
        return <Gamepad2 className="w-4 h-4" />;
      case 'smart-home':
        return <Home className="w-4 h-4" />;
      case 'digital-gadgets':
        return <Sparkles className="w-4 h-4" />;
      case 'lifestyle-accessories':
        return <ShoppingBag className="w-4 h-4" />;
      default:
        return <Grid className="w-4 h-4" />;
    }
  };

  return (
    <div className="mb-8 space-y-4">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ProductCategory)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/50 border border-slate-200'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{language === 'fa' ? cat.nameFa : cat.nameEn}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {language === 'fa' ? toPersianDigits(cat.count) : cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
          <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'fa' ? 'مرتب‌سازی:' : 'Sort:'}</span>
          </span>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-2xl px-3.5 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 cursor-pointer shadow-xs"
          >
            <option value="featured">{language === 'fa' ? 'منتخب و ویژه' : 'Featured'}</option>
            <option value="discount">{language === 'fa' ? 'بیشترین تخفیف' : 'Highest Discount'}</option>
            <option value="price-asc">{language === 'fa' ? 'ارزان‌ترین' : 'Price: Low to High'}</option>
            <option value="price-desc">{language === 'fa' ? 'گران‌ترین' : 'Price: High to Low'}</option>
            <option value="rating">{language === 'fa' ? 'بالاترین امتیاز' : 'Top Rated'}</option>
          </select>
        </div>

      </div>

    </div>
  );
};
