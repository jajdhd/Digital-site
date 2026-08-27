import React from 'react';
import { 
  Zap, 
  ShoppingBag, 
  CreditCard, 
  Crown, 
  Gift, 
  ShieldCheck, 
  Sparkles, 
  Flame 
} from 'lucide-react';
import { SERVICE_STORIES } from '../data/mockData';
import { useShop } from '../context/ShopContext';

export const ServicesBar: React.FC = () => {
  const { language, setActiveTab, setSelectedCategory, showNotification } = useShop();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-6 h-6 text-white" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-white" />;
      case 'CreditCard': return <CreditCard className="w-6 h-6 text-white" />;
      case 'Crown': return <Crown className="w-6 h-6 text-white" />;
      case 'Gift': return <Gift className="w-6 h-6 text-white" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-white" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-white" />;
      case 'Flame': return <Flame className="w-6 h-6 text-white" />;
      default: return <Sparkles className="w-6 h-6 text-white" />;
    }
  };

  const handleServiceClick = (serviceId: string) => {
    switch (serviceId) {
      case 'jet':
      case 'fresh':
        setSelectedCategory('supermarket');
        setActiveTab('catalog');
        break;
      case 'plus':
        setActiveTab('plus');
        break;
      case 'style':
        setSelectedCategory('fashion');
        setActiveTab('catalog');
        break;
      case 'wheel':
        showNotification(language === 'fa' ? 'گردونه شانس روزانه: به شما ۵۰,۰۰۰ تومان کد تخفیف اختصاص یافت!' : 'Daily Lucky Wheel: You won a 50,000 Toman discount code!');
        break;
      default:
        setActiveTab('catalog');
        break;
    }
  };

  return (
    <section className="max-w-7xl mx-auto my-6 px-2 sm:px-4">
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4 text-center">
        {SERVICE_STORIES.map((service) => (
          <button
            key={service.id}
            onClick={() => handleServiceClick(service.id)}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            {/* Circular Icon with gradient & ring */}
            <div className="relative">
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${service.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform ring-4 ring-neutral-100 group-hover:ring-red-100`}>
                {getServiceIcon(service.icon)}
              </div>
              {service.badge && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full whitespace-nowrap shadow-xs">
                  {service.badge}
                </span>
              )}
            </div>

            {/* Title */}
            <span className="text-[11px] sm:text-xs font-bold text-neutral-800 group-hover:text-[#ef4056] transition-colors leading-tight">
              {language === 'fa' ? service.titleFa : service.titleEn}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
