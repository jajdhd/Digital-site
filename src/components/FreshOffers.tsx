import React, { useRef } from 'react';
import { ShoppingBasket, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

export const FreshOffers: React.FC = () => {
  const { language, setActiveTab, setSelectedCategory } = useShop();
  const scrollRef = useRef<HTMLDivElement>(null);

  const freshProducts = PRODUCTS.filter((p) => p.isFresh || p.category === 'supermarket');

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto my-8 px-2 sm:px-4">
      <div className="bg-[#029a4a] rounded-3xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between text-white pb-4 border-b border-white/20 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <ShoppingBasket className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-2xl font-black">
                  {language === 'fa' ? 'شگفت‌انگیز سوپرمارکتی' : 'Fresh Supermarket Deals'}
                </h2>
                <span className="bg-emerald-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5" />
                  {language === 'fa' ? 'ارسال سریع جت' : 'Jet Delivery'}
                </span>
              </div>
              <p className="text-xs text-white/80 font-medium">
                {language === 'fa' ? 'خرید روزانه با تخفیف‌های فوق‌العاده' : 'Daily essentials with massive discounts'}
              </p>
            </div>
          </div>

          <button
            onClick={() => { setSelectedCategory('supermarket'); setActiveTab('catalog'); }}
            className="text-xs font-bold bg-white text-[#029a4a] px-4 py-2 rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer shadow-sm"
          >
            {language === 'fa' ? 'بیش از ۲۰۰۰ کالا' : '2000+ Items'}
          </button>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white text-neutral-800 shadow-xl items-center justify-center hover:bg-neutral-50 transition-colors cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white text-neutral-800 shadow-xl items-center justify-center hover:bg-neutral-50 transition-colors cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div 
            ref={scrollRef}
            className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth"
          >
            {freshProducts.map((product) => (
              <div key={product.id} className="shrink-0 w-56 sm:w-64">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
