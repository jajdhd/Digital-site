import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_BANNERS } from '../data/mockData';
import { useShop } from '../context/ShopContext';

export const BannerSlider: React.FC = () => {
  const { language, setActiveTab, setSelectedCategory } = useShop();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length);
  };

  const handleBannerClick = (ctaLink: string) => {
    if (ctaLink === 'shegeftangiz') {
      setActiveTab('shegeftangiz');
    } else {
      setSelectedCategory(ctaLink);
      setActiveTab('catalog');
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-neutral-900 rounded-3xl group shadow-md my-4 max-w-7xl mx-auto">
      <div 
        className="flex transition-transform duration-700 ease-out h-[220px] sm:h-[320px] md:h-[380px]"
        style={{ transform: `translateX(${language === 'fa' ? currentSlide * 100 : -currentSlide * 100}%)` }}
      >
        {HERO_BANNERS.map((banner) => (
          <div
            key={banner.id}
            onClick={() => handleBannerClick(banner.ctaLink)}
            className="w-full flex-shrink-0 relative cursor-pointer overflow-hidden"
          >
            {/* Background image */}
            <img
              src={banner.image}
              alt={banner.titleFa}
              className="w-full h-full object-cover brightness-[0.75] group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-end md:items-center p-6 md:p-12">
              <div className="text-white max-w-xl space-y-2 sm:space-y-4">
                <span className="inline-block bg-[#ef4056] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {language === 'fa' ? banner.badgeFa : banner.badgeEn}
                </span>
                <h2 className="text-xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight">
                  {language === 'fa' ? banner.titleFa : banner.titleEn}
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-neutral-200 font-medium line-clamp-2">
                  {language === 'fa' ? banner.subtitleFa : banner.subtitleEn}
                </p>
                <div className="pt-2">
                  <button className="bg-white text-neutral-900 font-black text-xs sm:text-sm px-5 py-2 rounded-xl hover:bg-[#ef4056] hover:text-white transition-colors cursor-pointer shadow-md">
                    {language === 'fa' ? 'مشاهده و خرید' : 'Shop Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slider Controls */}
      <button
        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
        className="absolute top-1/2 -translate-y-1/2 right-3 w-10 h-10 rounded-full bg-white/70 hover:bg-white text-neutral-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
        className="absolute top-1/2 -translate-y-1/2 left-3 w-10 h-10 rounded-full bg-white/70 hover:bg-white text-neutral-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {HERO_BANNERS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              idx === currentSlide ? 'w-6 bg-[#ef4056]' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
