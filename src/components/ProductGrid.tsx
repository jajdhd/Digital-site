import React, { useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Sparkles, SearchX } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

export const ProductGrid: React.FC = () => {
  const { 
    language, 
    products, 
    selectedCategory, 
    searchQuery, 
    sortBy 
  } = useShop();

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitleFa = p.titleFa.toLowerCase().includes(q);
          const matchesTitleEn = p.titleEn.toLowerCase().includes(q);
          const matchesBrand = p.brand.toLowerCase().includes(q);
          return matchesTitleFa || matchesTitleEn || matchesBrand;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceTomans - b.priceTomans;
        if (sortBy === 'price-desc') return b.priceTomans - a.priceTomans;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'discount') return (b.discountPercent || 0) - (a.discountPercent || 0);
        return 0; // featured default
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      
      {/* Header bar */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="font-extrabold text-lg sm:text-xl text-slate-900">
            {language === 'fa' ? 'محصولات فروشگاه و کالاهای هوشمند' : 'Featured Products & Gadgets'}
          </h2>
        </div>

        <span className="text-xs text-slate-500 font-bold bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-xs">
          {language === 'fa' 
            ? `${toPersianDigits(filteredProducts.length)} کالا یافت شد` 
            : `${filteredProducts.length} items found`}
        </span>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3 shadow-xs">
          <SearchX className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">
            {language === 'fa' ? 'هیچ کالایی با این مشخصات یافت نشد' : 'No products found'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {language === 'fa'
              ? 'لطفاً عبارت جستجو را تغییر دهید یا دسته‌بندی دیگری را انتخاب کنید.'
              : 'Try adjusting your search terms or category filter.'}
          </p>
        </div>
      )}

    </div>
  );
};
