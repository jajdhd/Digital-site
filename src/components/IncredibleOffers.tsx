import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Clock, Flame } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { toPersianDigits } from '../utils/formatters';

export const IncredibleOffers: React.FC = () => {
  const { language, setActiveTab, setSelectedCategory } = useShop();
  const scrollRef = useRef<HTMLDivElement>(null);

  // 12-hour countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 42, seconds: 35 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const shegeftangizProducts = PRODUCTS.filter((p) => p.isShegeftangiz);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto my-8 px-2 sm:px-4">
      {/* Signature Red Digikala Container */}
      <div className="bg-[#ef4056] rounded-3xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
        
        {/* Header Ribbon & Background Glow */}
        <div className="flex items-center justify-between text-white pb-4 border-b border-white/20 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <Flame className="w-6 h-6 text-amber-300 fill-amber-300 animate-bounce" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-black tracking-tight">
                {language === 'fa' ? 'پیشنهاد شگفت‌انگیز' : 'Incredible Offers'}
              </h2>
              <p className="text-xs text-white/80 font-medium">
                {language === 'fa' ? 'تخفیف‌های ویژه با زمان محدود' : 'Limited time high discount deals'}
              </p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-white/80" />
            <div className="flex items-center gap-1 font-mono text-xs sm:text-sm font-black">
              <span className="bg-white text-[#ef4056] px-2 py-1 rounded-lg shadow-xs min-w-[28px] text-center">
                {toPersianDigits(String(timeLeft.seconds).padStart(2, '0'))}
              </span>
              <span>:</span>
              <span className="bg-white text-[#ef4056] px-2 py-1 rounded-lg shadow-xs min-w-[28px] text-center">
                {toPersianDigits(String(timeLeft.minutes).padStart(2, '0'))}
              </span>
              <span>:</span>
              <span className="bg-white text-[#ef4056] px-2 py-1 rounded-lg shadow-xs min-w-[28px] text-center">
                {toPersianDigits(String(timeLeft.hours).padStart(2, '0'))}
              </span>
            </div>
          </div>
        </div>

        {/* Product Carousel */}
        <div className="relative">
          {/* Scroll Navigation Arrows */}
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

          {/* Horizontal Scroll Area */}
          <div 
            ref={scrollRef}
            className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth"
          >
            {/* First Feature Card (Digikala Shegeftangiz Box Intro) */}
            <div className="shrink-0 w-44 sm:w-52 rounded-2xl bg-white/10 backdrop-blur-xs p-4 flex flex-col justify-between text-white border border-white/20">
              <div className="space-y-2 text-center">
                <span className="text-3xl sm:text-4xl font-black block">٪۷۰</span>
                <span className="text-xs font-bold text-white/90 block">
                  {language === 'fa' ? 'حداکثر تخفیف کالاها' : 'Up to 70% off'}
                </span>
              </div>

              <div className="my-auto py-4 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-white/15 flex items-center justify-center animate-pulse-slow">
                  <Sparkles className="w-12 h-12 text-amber-300" />
                </div>
              </div>

              <button
                onClick={() => { setSelectedCategory('all'); setActiveTab('shegeftangiz'); }}
                className="w-full bg-white text-[#ef4056] font-black text-xs py-2.5 rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer shadow-md text-center"
              >
                {language === 'fa' ? 'مشاهده همه شگفت‌انگیزها' : 'View All Deals'}
              </button>
            </div>

            {/* Product Cards */}
            {shegeftangizProducts.map((product) => (
              <div key={product.id} className="shrink-0 w-56 sm:w-64">
                <ProductCard product={product} variant="shegeftangiz" />
              </div>
            ))}

            {/* View All Card at end of scroll */}
            <div 
              onClick={() => { setSelectedCategory('all'); setActiveTab('shegeftangiz'); }}
              className="shrink-0 w-44 rounded-2xl bg-white/15 hover:bg-white/25 transition-colors p-4 flex flex-col items-center justify-center text-white cursor-pointer border border-white/20 gap-3 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-white text-[#ef4056] flex items-center justify-center shadow-md">
                {language === 'fa' ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
              </div>
              <span className="font-bold text-xs sm:text-sm">
                {language === 'fa' ? 'مشاهده همه' : 'See All'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
