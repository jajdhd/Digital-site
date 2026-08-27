import React from 'react';
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  Truck, 
  Sparkles, 
  Heart,
  Instagram,
  Send,
  Headphones,
  UserPlus
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { language, setActiveView } = useShop();

  return (
    <footer className="mt-20 border-t border-slate-200 bg-white text-slate-900 pt-14 pb-8">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top 4 Value Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-slate-100 pb-10">
          
          {/* Col 1: Brand story */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-orange-500 flex items-center justify-center text-white font-black text-sm shadow-xs">
                ر
              </div>
              <span className="font-black text-base text-slate-900 tracking-wide">
                {language === 'fa' ? 'فروشگاه اینترنتی رستم شاپ' : 'Rostam Shop Online'}
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {language === 'fa'
                ? 'مرجع تخصصی خرید جدیدترین گجت‌های هوشمند، گوشی‌های پرچمدار، لپ‌تاپ، لوازم دیجیتال و خرید اقساطی با ضمانت اصالت کالا و تسویه آنی شتاب.'
                : 'Premium Iranian marketplace for authentic electronics, next-gen gadgets, and instant verified Shetab card payments.'}
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-emerald-800">
              {language === 'fa' ? 'دسترسی سریع' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button onClick={() => setActiveView('shop')} className="hover:text-emerald-700 transition-colors cursor-pointer">
                  {language === 'fa' ? 'صفحه اصلی فروشگاه' : 'Shop Home'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('payment-page')} className="text-orange-600 font-bold hover:underline transition-colors cursor-pointer">
                  {language === 'fa' ? 'صفحه پرداخت و فاکتور مستقیم' : 'Direct Invoice Pay'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('auth')} className="hover:text-emerald-700 transition-colors cursor-pointer">
                  {language === 'fa' ? 'ثبت‌نام و ورود کاربران' : 'Sign Up / Login'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('order-history')} className="hover:text-emerald-700 transition-colors cursor-pointer">
                  {language === 'fa' ? 'پیگیری سفارشات و تراکنش‌ها' : 'Track Orders'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('gateway-settings')} className="hover:text-emerald-700 transition-colors cursor-pointer">
                  {language === 'fa' ? 'تنظیمات درگاه شاپرک و زرین‌پال' : 'Gateway Settings'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Service */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-emerald-800">
              {language === 'fa' ? 'پشتیبانی مشتریان ۲۴/۷' : 'Customer Support'}
            </h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-mono text-slate-900 font-bold">۰۲۱-۸۸۹۹۰۰۱۱</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span className="font-mono text-slate-900">support@rostamshop.ir</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{language === 'fa' ? 'تهران، خیابان ولیعصر، مجتمع تجاری رستم' : 'Tehran, Valiasr St., Rostam Complex'}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Official Iranian Trust Seals (نمادها) */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-orange-600">
              {language === 'fa' ? 'مجوزها و نمادهای الکترونیک' : 'Certificates & Trust Seals'}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              
              {/* Enamad Badge */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2.5 text-center space-y-1 hover:border-emerald-400 transition-colors">
                <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto" />
                <span className="text-[10px] font-bold text-slate-900 block">اینماد ۵ ستاره</span>
                <span className="text-[9px] text-slate-400 block">نماد اعتماد الکترونیکی</span>
              </div>

              {/* Zarinpal / Shaparak Badge */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2.5 text-center space-y-1 hover:border-orange-400 transition-colors">
                <CreditCard className="w-6 h-6 text-orange-500 mx-auto" />
                <span className="text-[10px] font-bold text-slate-900 block">زرین‌پال و شاپرک</span>
                <span className="text-[9px] text-slate-400 block">درگاه پرداخت رسمی v4</span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            {language === 'fa' 
              ? '© ۱۴۰۳ تمامی حقوق مادی و معنوی برای فروشگاه اینترنتی رستم شاپ محفوظ است.' 
              : '© 2025 Rostam Shop. All rights reserved.'}
          </p>

          <div className="flex items-center gap-4 text-slate-500">
            <span className="font-mono text-[11px] font-bold text-emerald-800">ROSTAM SHOP PAYMENT CORE v4</span>
          </div>
        </div>

      </div>

    </footer>
  );
};

