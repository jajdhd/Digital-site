import React from 'react';
import { 
  ChevronUp, 
  Truck, 
  CreditCard, 
  Headphones, 
  RotateCcw, 
  ShieldCheck, 
  Phone, 
  Smartphone,
  Award,
  CheckCircle
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { language } = useShop();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-neutral-200 mt-16 pt-8 pb-12 text-neutral-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Top: Logo & Back to Top */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#ef4056] flex items-center justify-center text-white font-black text-sm">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 14a8 8 0 0 0 16 0" />
                <circle cx="8" cy="9" r="1.5" fill="currentColor" />
                <circle cx="16" cy="9" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <span className="text-xl font-black text-[#ef4056]">
              {language === 'fa' ? 'دیجی‌کالا' : 'digikala'}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-neutral-500 font-medium">
              <span>{language === 'fa' ? 'تلفن پشتیبانی: ' : 'Support Hotline: '}</span>
              <span className="font-mono font-bold text-neutral-800">۰۲۱ - ۶۱۹۳۰۰۰۰</span>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-bold transition-colors cursor-pointer"
            >
              <span>{language === 'fa' ? 'بازگشت به بالا' : 'Back to Top'}</span>
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5 Core Feature Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center py-4 border-b border-neutral-100">
          
          <div className="flex flex-col items-center gap-2 p-2">
            <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-neutral-700">
              <Truck className="w-6 h-6 text-[#ef4056]" />
            </div>
            <span className="font-bold text-xs text-neutral-800">
              {language === 'fa' ? 'امکان تحویل اکسپرس' : 'Express Delivery'}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 p-2">
            <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-neutral-700">
              <CreditCard className="w-6 h-6 text-[#ef4056]" />
            </div>
            <span className="font-bold text-xs text-neutral-800">
              {language === 'fa' ? 'امکان پرداخت در محل' : 'Cash on Delivery'}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 p-2">
            <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-neutral-700">
              <Headphones className="w-6 h-6 text-[#ef4056]" />
            </div>
            <span className="font-bold text-xs text-neutral-800">
              {language === 'fa' ? '۷ روز، ۲۴ ساعته' : '24/7 Support'}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 p-2">
            <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-neutral-700">
              <RotateCcw className="w-6 h-6 text-[#ef4056]" />
            </div>
            <span className="font-bold text-xs text-neutral-800">
              {language === 'fa' ? '۷ روز ضمانت بازگشت کالا' : '7-Day Return Guarantee'}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 p-2 col-span-2 sm:col-span-1">
            <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-neutral-700">
              <ShieldCheck className="w-6 h-6 text-[#ef4056]" />
            </div>
            <span className="font-bold text-xs text-neutral-800">
              {language === 'fa' ? 'ضمانت اصل بودن کالا' : '100% Authentic Products'}
            </span>
          </div>

        </div>

        {/* Links Columns & Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <h4 className="font-black text-sm text-neutral-900">
              {language === 'fa' ? 'با دیجی‌کالا' : 'About Digikala'}
            </h4>
            <ul className="space-y-2 text-neutral-500">
              <li><a href="#about" className="hover:text-[#ef4056] transition-colors">{language === 'fa' ? 'اتاق خبر دیجی‌کالا' : 'Newsroom'}</a></li>
              <li><a href="#careers" className="hover:text-[#ef4056] transition-colors">{language === 'fa' ? 'فرصت‌های شغلی' : 'Careers'}</a></li>
              <li><a href="#sellers" className="hover:text-[#ef4056] transition-colors">{language === 'fa' ? 'فروشنده شوید در دیجی‌کالا' : 'Become a Seller'}</a></li>
              <li><a href="#investors" className="hover:text-[#ef4056] transition-colors">{language === 'fa' ? 'گزارش سالانه' : 'Annual Report'}</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-black text-sm text-neutral-900">
              {language === 'fa' ? 'خدمات مشتریان' : 'Customer Care'}
            </h4>
            <ul className="space-y-2 text-neutral-500">
              <li><a href="#faq" className="hover:text-[#ef4056] transition-colors">{language === 'fa' ? 'پاسخ به پرسش‌های متداول' : 'FAQ'}</a></li>
              <li><a href="#returns" className="hover:text-[#ef4056] transition-colors">{language === 'fa' ? 'رویه‌های بازگرداندن کالا' : 'Return Policy'}</a></li>
              <li><a href="#terms" className="hover:text-[#ef4056] transition-colors">{language === 'fa' ? 'شرایط استفاده و حریم خصوصی' : 'Terms & Privacy'}</a></li>
              <li><a href="#bug" className="hover:text-[#ef4056] transition-colors">{language === 'fa' ? 'گزارش خطای فنی' : 'Report Bug'}</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-black text-sm text-neutral-900">
              {language === 'fa' ? 'راهنمای خرید' : 'Shopping Guide'}
            </h4>
            <ul className="space-y-2 text-neutral-500">
              <li><a href="#how" className="hover:text-[#ef4056] transition-colors">{language === 'fa' ? 'نحوه ثبت سفارش' : 'How to Order'}</a></li>
              <li><a href="#ship" className="hover:text-[#ef4056] transition-colors">{language === 'fa' ? 'رویه ارسال سفارش' : 'Shipping Methods'}</a></li>
              <li><a href="#pay" className="hover:text-[#ef4056] transition-colors">{language === 'fa' ? 'شیوه‌های پرداخت' : 'Payment Options'}</a></li>
              <li><a href="#jet" className="hover:text-[#ef4056] transition-colors">{language === 'fa' ? 'دیجی‌کالا جت (سوپرمارکت فوری)' : 'DigiJet Quick Grocery'}</a></li>
            </ul>
          </div>

          {/* Trust Certificates & e-Namad */}
          <div className="space-y-3">
            <h4 className="font-black text-sm text-neutral-900">
              {language === 'fa' ? 'نمادهای اعتماد الکترونیکی' : 'Trust Certificates'}
            </h4>
            <div className="flex items-center gap-3">
              <div className="w-16 h-20 bg-neutral-50 rounded-2xl border border-neutral-200 p-2 flex flex-col items-center justify-center text-center">
                <Award className="w-6 h-6 text-blue-600 mb-1" />
                <span className="text-[9px] font-bold text-neutral-700">اینماد ۵ ستاره</span>
              </div>
              <div className="w-16 h-20 bg-neutral-50 rounded-2xl border border-neutral-200 p-2 flex flex-col items-center justify-center text-center">
                <CheckCircle className="w-6 h-6 text-emerald-600 mb-1" />
                <span className="text-[9px] font-bold text-neutral-700">ساماندهی دیجیتال</span>
              </div>
              <div className="w-16 h-20 bg-neutral-50 rounded-2xl border border-neutral-200 p-2 flex flex-col items-center justify-center text-center">
                <ShieldCheck className="w-6 h-6 text-[#ef4056] mb-1" />
                <span className="text-[9px] font-bold text-neutral-700">اتحادیه کسب‌وکار</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-neutral-100 text-center text-neutral-400 text-[11px] leading-relaxed">
          {language === 'fa' ? (
            <p>
              برای استفاده از مطالب دیجی‌کالا، داشتن «هدف غیرتجاری» و ذکر «منبع» کافیست. تمام حقوق اين وب‌سايت متعلق به فروشگاه آنلاین دیجی‌کالا است.
            </p>
          ) : (
            <p>
              © 2026 Digikala Online Store. All rights reserved. All product names, logos, and brands are property of their respective owners.
            </p>
          )}
        </div>

      </div>
    </footer>
  );
};
