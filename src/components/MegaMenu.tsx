import React, { useState } from 'react';
import { 
  Menu, 
  Flame, 
  ShoppingBasket, 
  Gift, 
  Crown, 
  TrendingUp, 
  Percent, 
  MapPin, 
  ChevronDown, 
  Smartphone, 
  Home, 
  Shirt, 
  Sparkles, 
  Wrench,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { useShop } from '../context/ShopContext';
import { Category } from '../types';

export const MegaMenu: React.FC = () => {
  const { language, setActiveTab, setSelectedCategory, selectedCategory } = useShop();
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [activeHoverCategory, setActiveHoverCategory] = useState<Category>(CATEGORIES[0]);
  const [selectedCity, setSelectedCity] = useState('تهران، ونک');
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="w-4 h-4" />;
      case 'Home': return <Home className="w-4 h-4" />;
      case 'ShoppingBasket': return <ShoppingBasket className="w-4 h-4" />;
      case 'Shirt': return <Shirt className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Wrench': return <Wrench className="w-4 h-4" />;
      default: return <Smartphone className="w-4 h-4" />;
    }
  };

  const navLinks = [
    {
      id: 'shegeftangiz',
      titleFa: 'پیشنهادهای شگفت‌انگیز',
      titleEn: 'Incredible Deals',
      icon: Flame,
      color: 'text-red-500',
      action: () => { setSelectedCategory('all'); setActiveTab('shegeftangiz'); }
    },
    {
      id: 'supermarket',
      titleFa: 'سوپرمارکت',
      titleEn: 'Supermarket',
      icon: ShoppingBasket,
      color: 'text-emerald-600',
      action: () => { setSelectedCategory('supermarket'); setActiveTab('catalog'); }
    },
    {
      id: 'bestseller',
      titleFa: 'پرفروش‌ترین‌ها',
      titleEn: 'Best Sellers',
      icon: TrendingUp,
      color: 'text-neutral-500',
      action: () => { setSelectedCategory('all'); setActiveTab('catalog'); }
    },
    {
      id: 'gift',
      titleFa: 'کارت هدیه',
      titleEn: 'Gift Card',
      icon: Gift,
      color: 'text-rose-500',
      action: () => { setSelectedCategory('all'); setActiveTab('catalog'); }
    },
    {
      id: 'plus',
      titleFa: 'دیجی‌پلاس',
      titleEn: 'DigiPlus',
      icon: Crown,
      color: 'text-purple-600',
      action: () => { setActiveTab('plus'); }
    },
    {
      id: 'discounts',
      titleFa: 'تخفیف‌ها و حراج‌ها',
      titleEn: 'Discounts',
      icon: Percent,
      color: 'text-neutral-500',
      action: () => { setSelectedCategory('all'); setActiveTab('shegeftangiz'); }
    }
  ];

  return (
    <nav className="bg-white border-b border-neutral-100 relative z-30 text-xs font-semibold text-neutral-700">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between">
        
        {/* Navigation Categories & Quick Links */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2">
          
          {/* Mega Category Dropdown Button */}
          <div 
            className="relative"
            onMouseEnter={() => setIsCategoryMenuOpen(true)}
            onMouseLeave={() => setIsCategoryMenuOpen(false)}
          >
            <button
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className={`flex items-center gap-2 py-1.5 px-3 rounded-lg font-bold transition-colors cursor-pointer shrink-0 ${
                isCategoryMenuOpen ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-800 hover:bg-neutral-50'
              }`}
            >
              <Menu className="w-4 h-4 text-neutral-600" />
              <span>{language === 'fa' ? 'دسته‌بندی کالاها' : 'Categories'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            {/* Mega Category Dropdown Menu */}
            {isCategoryMenuOpen && (
              <div className="absolute right-0 top-full pt-1 w-[720px] max-w-[90vw] z-50 animate-in fade-in duration-150">
                <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex h-[420px]">
                  
                  {/* Category Sidebar List */}
                  <div className="w-60 bg-neutral-50 border-l border-neutral-200 overflow-y-auto no-scrollbar py-2">
                    {CATEGORIES.map((cat) => {
                      const isHovered = activeHoverCategory.id === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onMouseEnter={() => setActiveHoverCategory(cat)}
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            setActiveTab('catalog');
                            setIsCategoryMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-3 text-right text-xs transition-colors cursor-pointer ${
                            isHovered
                              ? 'bg-white text-[#ef4056] font-black border-r-4 border-[#ef4056]'
                              : 'text-neutral-700 hover:bg-neutral-100 font-medium'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            {getCategoryIcon(cat.icon)}
                            <span>{language === 'fa' ? cat.titleFa : cat.titleEn}</span>
                          </div>
                          {language === 'fa' ? <ChevronLeft className="w-3.5 h-3.5 text-neutral-400" /> : <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Subcategories Flyout Content */}
                  <div className="flex-1 p-5 overflow-y-auto bg-white">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-neutral-900 text-sm">
                          {language === 'fa' ? activeHoverCategory.titleFa : activeHoverCategory.titleEn}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedCategory(activeHoverCategory.id);
                          setActiveTab('catalog');
                          setIsCategoryMenuOpen(false);
                        }}
                        className="text-xs font-bold text-[#ef4056] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>{language === 'fa' ? 'مشاهده همه محصولات این دسته' : 'View all products'}</span>
                        {language === 'fa' ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                      </button>
                    </div>

                    {/* Subcategories Multi-Column Grid */}
                    <div className="grid grid-cols-2 gap-6">
                      {activeHoverCategory.subcategories.map((sub, idx) => (
                        <div key={idx} className="space-y-2">
                          <h4 
                            onClick={() => {
                              setSelectedCategory(activeHoverCategory.id);
                              setActiveTab('catalog');
                              setIsCategoryMenuOpen(false);
                            }}
                            className="font-bold text-neutral-900 text-xs flex items-center gap-1.5 cursor-pointer hover:text-[#ef4056]"
                          >
                            <span className="w-1.5 h-3 bg-[#ef4056] rounded-full inline-block"></span>
                            {language === 'fa' ? sub.titleFa : sub.titleEn}
                          </h4>
                          <ul className="space-y-1.5 pr-3 text-neutral-600 font-normal">
                            {sub.items.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                <button
                                  onClick={() => {
                                    setSelectedCategory(activeHoverCategory.id);
                                    setActiveTab('catalog');
                                    setIsCategoryMenuOpen(false);
                                  }}
                                  className="text-xs hover:text-[#ef4056] transition-colors cursor-pointer text-right"
                                >
                                  {item}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>

          <div className="h-4 w-px bg-neutral-200 hidden sm:block"></div>

          {/* Quick Direct Links */}
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={link.action}
                className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors whitespace-nowrap cursor-pointer shrink-0"
              >
                <Icon className={`w-3.5 h-3.5 ${link.color}`} />
                <span>{language === 'fa' ? link.titleFa : link.titleEn}</span>
              </button>
            );
          })}
        </div>

        {/* Location Selector (Left in RTL) */}
        <div className="hidden md:flex items-center gap-1.5 text-neutral-600 hover:text-neutral-900 cursor-pointer py-1.5 px-3 rounded-lg hover:bg-neutral-50 shrink-0">
          <MapPin className="w-4 h-4 text-neutral-400" />
          <span className="text-xs text-neutral-500">
            {language === 'fa' ? 'ارسال به' : 'Deliver to'}
          </span>
          <span className="text-xs font-bold text-neutral-800">
            {selectedCity}
          </span>
        </div>

      </div>
    </nav>
  );
};
