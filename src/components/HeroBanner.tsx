import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  RotateCcw, 
  Zap, 
  ArrowLeft,
  ArrowRight,
  Percent,
  ChevronLeft
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const HeroBanner: React.FC = () => {
  const { language, setSelectedCategory, products, addToCart, setActiveView } = useShop();
  const featuredProduct = products[0]; // iPhone 16 Pro Max

  return (
    <div className="relative overflow-hidden mb-10">
      
      {/* Background Soft Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Hero Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-sm">
        
        {/* Subtle decorative grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-60 pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Brand, Headline, Value Props */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                {language === 'fa' ? 'فروشگاه مدرن کالا و گجت‌های هوشمند' : 'Next-Gen Tech Marketplace'}
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold">
                <Percent className="w-3 h-3 text-orange-600" />
                {language === 'fa' ? 'کد تخفیف ویژه: NOWRUZ' : 'Spring Sale: NOWRUZ'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              {language === 'fa' ? (
                <>
                  خرید آنلاین هوشمند با اتصال امن به{' '}
                  <span className="text-emerald-600">
                    درگاه پرداخت زرین‌پال
                  </span>{' '}
                  و <span className="text-orange-500">شاپرک</span>
                </>
              ) : (
                <>
                  Premium Online Shopping with{' '}
                  <span className="text-emerald-600">
                    Zarinpal & Shaparak
                  </span>{' '}
                  <span className="text-orange-500">Payment Gateway</span>
                </>
              )}
            </h1>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl">
              {language === 'fa'
                ? 'تجربه سریع‌ترین خرید اینترنتی با جدیدترین گجت‌های دیجیتال، لوازم خانگی هوشمند، لپ‌تاپ و گوشی‌های پرچمدار با تضمین اصالت و تسویه آنی شبکه شتاب.'
                : 'Experience effortless shopping for flagship laptops, smartphones, and smart home gadgets with certified 18-month warranties and instant Shetab payments.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-md shadow-emerald-600/20 transition flex items-center gap-2 cursor-pointer"
              >
                <span>{language === 'fa' ? 'مشاهده همه محصولات' : 'Explore All Products'}</span>
                {language === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setActiveView('payment-page')}
                className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm px-5 py-3.5 rounded-2xl shadow-md shadow-orange-500/20 transition flex items-center gap-2 cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>{language === 'fa' ? 'صفحه پرداخت مستقیم فاکتور' : 'Direct Invoice Payment'}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Featured Product Spotlight Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 relative group shadow-xs hover:border-emerald-300 transition">
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-orange-500 text-white font-extrabold text-[10px] px-3 py-1 rounded-full shadow-xs">
                  {language === 'fa' ? 'پیشنهاد شگفت‌انگیز' : 'Special Spotlight'}
                </span>
              </div>

              <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden mb-4 bg-white border border-slate-100 flex items-center justify-center p-2">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.titleFa}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">{featuredProduct.brand}</span>
                  <span className="text-[11px] font-medium">{language === 'fa' ? 'موجودی انبار: ۸ عدد' : 'In Stock: 8 units'}</span>
                </div>

                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 line-clamp-1">
                  {language === 'fa' ? featuredProduct.titleFa : featuredProduct.titleEn}
                </h3>

                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-500 block">
                      {language === 'fa' ? 'قیمت شگفت‌انگیز' : 'Special Online Price'}
                    </span>
                    <span className="font-black text-base text-orange-600 font-mono">
                      {language === 'fa' ? '۹۸,۵۰۰,۰۰۰ تومان' : '98,500,000 Tomans'}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(featuredProduct)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1"
                  >
                    <span>{language === 'fa' ? 'افزودن به سبد' : 'Add to Cart'}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* 4 Guarantees Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-900">
              {language === 'fa' ? 'ضمانت اصالت ۱۰۰٪ کالا' : '100% Genuine Warranty'}
            </h4>
            <p className="text-[11px] text-slate-500">
              {language === 'fa' ? 'همراه با گارانتی ۱۸ ماهه شرکتی' : 'Official certified warranty'}
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-900">
              {language === 'fa' ? 'ارسال سریع پست پیشتاز' : 'Express Post Delivery'}
            </h4>
            <p className="text-[11px] text-slate-500">
              {language === 'fa' ? 'تحویل ۲۴ تا ۴۸ ساعته سراسر کشور' : '24-48h nationwide delivery'}
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-900">
              {language === 'fa' ? 'درگاه رسمی زرین‌پال و شاپرک' : 'Zarinpal Verified PG'}
            </h4>
            <p className="text-[11px] text-slate-500">
              {language === 'fa' ? 'تسویه آنی با پروتکل امنیتی v4' : 'Secure instant Shetab gateway'}
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-900">
              {language === 'fa' ? '۷ روز مهلت بازگشت وجه' : '7 Days Money Back'}
            </h4>
            <p className="text-[11px] text-slate-500">
              {language === 'fa' ? 'پشتیبانی و مرجوعی بدون قید و شرط' : 'No questions asked returns'}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
