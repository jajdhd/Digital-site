import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  ChevronDown, 
  Grid, 
  List, 
  X, 
  Check, 
  Zap, 
  Flame, 
  Crown, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/mockData';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { formatPrice, toPersianDigits } from '../utils/formatters';

export const ProductListing: React.FC = () => {
  const { 
    language, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery 
  } = useShop();

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyShegeftangiz, setOnlyShegeftangiz] = useState(false);
  const [onlyPlus, setOnlyPlus] = useState(false);
  const [onlyJet, setOnlyJet] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(120000000);
  const [sortBy, setSortBy] = useState<'relevant' | 'bestselling' | 'newest' | 'cheapest' | 'expensive'>('relevant');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract available brands for filter
  const allBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    PRODUCTS.forEach((p) => brandsSet.add(p.brand));
    return Array.from(brandsSet);
  }, []);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setOnlyInStock(false);
    setOnlyShegeftangiz(false);
    setOnlyPlus(false);
    setOnlyJet(false);
    setMaxPrice(120000000);
    setSelectedCategory('all');
    setSearchQuery('');
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.titleFa.toLowerCase().includes(q) || p.titleEn.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q) || p.brandFa.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand && !matchesDesc) return false;
      }

      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Brand
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }

      // In stock
      if (onlyInStock && p.stock <= 0) {
        return false;
      }

      // Deals
      if (onlyShegeftangiz && !p.isShegeftangiz) {
        return false;
      }

      // Plus
      if (onlyPlus && !p.isPlus) {
        return false;
      }

      // Jet
      if (onlyJet && !p.isJet) {
        return false;
      }

      // Max price
      if (p.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'bestselling':
          return b.salesCount - a.salesCount;
        case 'cheapest':
          return a.price - b.price;
        case 'expensive':
          return b.price - a.price;
        case 'newest':
          return b.id.localeCompare(a.id);
        case 'relevant':
        default:
          return b.rating - a.rating;
      }
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedBrands,
    onlyInStock,
    onlyShegeftangiz,
    onlyPlus,
    onlyJet,
    maxPrice,
    sortBy
  ]);

  const hasActiveFilters = 
    selectedBrands.length > 0 || 
    onlyInStock || 
    onlyShegeftangiz || 
    onlyPlus || 
    onlyJet || 
    maxPrice < 120000000 || 
    selectedCategory !== 'all' || 
    searchQuery.trim().length > 0;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 my-6">
      
      {/* Category Header Banner */}
      <div className="bg-white rounded-3xl p-5 border border-neutral-200 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <h1 className="text-lg sm:text-2xl font-black text-neutral-900">
            {selectedCategory === 'all'
              ? (language === 'fa' ? 'تمام کالاهای فروشگاه دیجی‌کالا' : 'All Digikala Products')
              : (CATEGORIES.find((c) => c.id === selectedCategory)?.[language === 'fa' ? 'titleFa' : 'titleEn'] || selectedCategory)}
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            {language === 'fa' 
              ? `نمایش ${toPersianDigits(filteredProducts.length)} کالا با تضمین اصالت و گارانتی رسمی` 
              : `Showing ${filteredProducts.length} items with official warranty`}
          </p>
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden flex items-center justify-center gap-2 bg-[#ef4056] text-white text-xs font-bold py-2.5 px-4 rounded-xl cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>{language === 'fa' ? 'فیلتر و دسته‌بندی' : 'Filters & Categories'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar Filters (Desktop 3 cols) */}
        <aside className={`lg:col-span-3 space-y-4 ${isMobileFilterOpen ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto block' : 'hidden lg:block'}`}>
          {isMobileFilterOpen && (
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-4">
              <h3 className="font-bold text-sm text-neutral-900">فیلترهای کالا</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 text-neutral-500">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="bg-white rounded-3xl p-5 border border-neutral-200 space-y-6 shadow-xs">
            
            {/* Header & Reset */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <span className="font-black text-sm text-neutral-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#ef4056]" />
                <span>{language === 'fa' ? 'فیلترها' : 'Filters'}</span>
              </span>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#ef4056] hover:underline flex items-center gap-1 font-bold cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{language === 'fa' ? 'حذف همه' : 'Clear All'}</span>
                </button>
              )}
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-neutral-800 block">
                {language === 'fa' ? 'دسته‌بندی:' : 'Category:'}
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-right text-xs py-1.5 px-2.5 rounded-xl font-bold transition-colors cursor-pointer ${
                    selectedCategory === 'all' ? 'bg-red-50 text-[#ef4056]' : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  {language === 'fa' ? 'همه دسته‌بندی‌ها' : 'All Categories'}
                </button>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`w-full text-right text-xs py-1.5 px-2.5 rounded-xl font-medium transition-colors cursor-pointer ${
                      selectedCategory === c.id ? 'bg-red-50 text-[#ef4056] font-bold' : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    {language === 'fa' ? c.titleFa : c.titleEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Toggles */}
            <div className="space-y-3 pt-3 border-t border-neutral-100">
              <label className="flex items-center justify-between text-xs font-bold text-neutral-700 cursor-pointer">
                <span>{language === 'fa' ? 'فقط کالاهای موجود' : 'In Stock Only'}</span>
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded-sm accent-[#ef4056] w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between text-xs font-bold text-neutral-700 cursor-pointer">
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-[#ef4056]" />
                  {language === 'fa' ? 'پیشنهادهای شگفت‌انگیز' : 'Incredible Deals Only'}
                </span>
                <input
                  type="checkbox"
                  checked={onlyShegeftangiz}
                  onChange={(e) => setOnlyShegeftangiz(e.target.checked)}
                  className="rounded-sm accent-[#ef4056] w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between text-xs font-bold text-neutral-700 cursor-pointer">
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-purple-600" />
                  {language === 'fa' ? 'ارسال فوری جت' : 'Fast Jet Delivery'}
                </span>
                <input
                  type="checkbox"
                  checked={onlyJet}
                  onChange={(e) => setOnlyJet(e.target.checked)}
                  className="rounded-sm accent-purple-600 w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between text-xs font-bold text-neutral-700 cursor-pointer">
                <span className="flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-purple-600" />
                  {language === 'fa' ? 'خدمات ویژه دیجی‌پلاس' : 'DigiPlus Items'}
                </span>
                <input
                  type="checkbox"
                  checked={onlyPlus}
                  onChange={(e) => setOnlyPlus(e.target.checked)}
                  className="rounded-sm accent-purple-600 w-4 h-4 cursor-pointer"
                />
              </label>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-3 pt-3 border-t border-neutral-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-800">{language === 'fa' ? 'حداکثر قیمت:' : 'Max Price:'}</span>
                <span className="font-black text-[#ef4056]">{formatPrice(maxPrice, language)}</span>
              </div>
              <input
                type="range"
                min={500000}
                max={120000000}
                step={500000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#ef4056] cursor-pointer"
              />
            </div>

            {/* Brand Filter */}
            <div className="space-y-2 pt-3 border-t border-neutral-100">
              <span className="text-xs font-bold text-neutral-800 block">
                {language === 'fa' ? 'برندها:' : 'Brands:'}
              </span>
              <div className="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar">
                {allBrands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center justify-between text-xs text-neutral-700 py-1 hover:text-[#ef4056] cursor-pointer"
                  >
                    <span>{brand}</span>
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="rounded-sm accent-[#ef4056] w-4 h-4 cursor-pointer"
                    />
                  </label>
                ))}
              </div>
            </div>

            {isMobileFilterOpen && (
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-[#ef4056] text-white text-xs font-bold py-3 rounded-2xl cursor-pointer mt-4"
              >
                اعمال فیلترها
              </button>
            )}

          </div>
        </aside>

        {/* Right Main Content (9 cols) */}
        <main className="lg:col-span-9 space-y-4">
          
          {/* Sorting Bar */}
          <div className="bg-white rounded-2xl px-4 py-3 border border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs shadow-2xs">
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
              <span className="text-neutral-400 font-bold ml-2">
                {language === 'fa' ? 'مرتب‌سازی:' : 'Sort by:'}
              </span>
              
              <button
                onClick={() => setSortBy('relevant')}
                className={`py-1.5 px-3 rounded-xl font-bold transition-colors cursor-pointer ${
                  sortBy === 'relevant' ? 'bg-red-50 text-[#ef4056]' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {language === 'fa' ? 'مرتبط‌ترین' : 'Most Relevant'}
              </button>

              <button
                onClick={() => setSortBy('bestselling')}
                className={`py-1.5 px-3 rounded-xl font-bold transition-colors cursor-pointer ${
                  sortBy === 'bestselling' ? 'bg-red-50 text-[#ef4056]' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {language === 'fa' ? 'پرفروش‌ترین' : 'Best Sellers'}
              </button>

              <button
                onClick={() => setSortBy('cheapest')}
                className={`py-1.5 px-3 rounded-xl font-bold transition-colors cursor-pointer ${
                  sortBy === 'cheapest' ? 'bg-red-50 text-[#ef4056]' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {language === 'fa' ? 'ارزان‌ترین' : 'Cheapest'}
              </button>

              <button
                onClick={() => setSortBy('expensive')}
                className={`py-1.5 px-3 rounded-xl font-bold transition-colors cursor-pointer ${
                  sortBy === 'expensive' ? 'bg-red-50 text-[#ef4056]' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {language === 'fa' ? 'گران‌ترین' : 'Most Expensive'}
              </button>

              <button
                onClick={() => setSortBy('newest')}
                className={`py-1.5 px-3 rounded-xl font-bold transition-colors cursor-pointer ${
                  sortBy === 'newest' ? 'bg-red-50 text-[#ef4056]' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {language === 'fa' ? 'جدیدترین' : 'Newest'}
              </button>
            </div>

            <span className="text-neutral-500 font-bold">
              {toPersianDigits(filteredProducts.length)} {language === 'fa' ? 'کالا' : 'items'}
            </span>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200 space-y-3">
              <div className="w-16 h-16 rounded-full bg-red-50 text-[#ef4056] mx-auto flex items-center justify-center">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-base text-neutral-800">
                {language === 'fa' ? 'کالایی با فیلترهای انتخابی شما یافت نشد' : 'No products found matching your filters'}
              </h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                {language === 'fa' ? 'لطفاً فیلترها را تغییر داده یا از بخش جستجو نام کالا را وارد کنید.' : 'Try adjusting your filters or search keywords.'}
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-[#ef4056] text-white text-xs font-bold px-6 py-2 rounded-xl hover:bg-[#e6123d] transition-colors cursor-pointer mt-2"
              >
                {language === 'fa' ? 'پاک کردن همه فیلترها' : 'Clear All Filters'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </main>

      </div>
    </div>
  );
};
