import React from 'react';
import { Crown, Truck, Sparkles, CheckCircle2, Coins, ArrowRight, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from './ProductCard';
import { formatPrice } from '../utils/formatters';

export const DigiPlusSection: React.FC = () => {
  const { language, user, updateUser, showNotification } = useShop();

  const plusProducts = PRODUCTS.filter((p) => p.isPlus);

  const handleToggleMembership = () => {
    if (user.isPlusMember) {
      updateUser({ isPlusMember: false });
      showNotification(language === 'fa' ? 'اشتراک دیجی‌پلاس شما غیرفعال شد' : 'DigiPlus membership deactivated');
    } else {
      updateUser({ isPlusMember: true });
      showNotification(language === 'fa' ? 'تبریک! اشتراک دیجی‌پلاس با موفقیت برای شما فعال شد' : 'Congratulations! DigiPlus membership activated');
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-8 px-3 sm:px-6">
      {/* VIP Purple Container */}
      <div className="bg-gradient-to-r from-[#591763] via-[#81258d] to-[#9e46a7] rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/20">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-purple-950 text-xs font-black px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 fill-purple-950" />
                DIGIPLUS VIP
              </span>
              <span className="text-white/80 text-xs">
                {language === 'fa' ? 'خدمات ویژه خریداران حرفه‌ای' : 'Exclusive VIP perks for regular shoppers'}
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black">
              {language === 'fa' ? 'اشتراک دیجی‌پلاس؛ خریدی سریع‌تر، ارزان‌تر و با کش‌بک نقدی' : 'DigiPlus Subscription: Faster, Cheaper with Cashback'}
            </h2>
          </div>

          <button
            onClick={handleToggleMembership}
            className="bg-amber-400 hover:bg-amber-300 text-purple-950 font-black text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-lg transition-transform hover:scale-105 cursor-pointer shrink-0"
          >
            {user.isPlusMember
              ? (language === 'fa' ? 'عضویت شما فعال است (تمدید)' : 'Active Member (Renew)')
              : (language === 'fa' ? 'خرید اشتراک ۳ ماهه (۹۹,۰۰۰ تومان)' : 'Join DigiPlus (99k Tomans)')}
          </button>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6">
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/15 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm">
                {language === 'fa' ? 'ارسال رایگان نامحدود' : 'Unlimited Free Delivery'}
              </h4>
              <p className="text-xs text-white/80 mt-0.5">
                {language === 'fa' ? 'ارسال رایگان تمام خریدهای دیجی‌کالا و سوپرمارکت' : 'Zero shipping fees on all Digikala orders'}
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/15 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm">
                {language === 'fa' ? 'هدیه نقدی (Cashback)' : 'Cashback Rewards'}
              </h4>
              <p className="text-xs text-white/80 mt-0.5">
                {language === 'fa' ? 'بازگشت درصد نقدی مستقیم به کیف پول دیجی‌پی' : 'Real cash refund directly into your DigiPay wallet'}
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/15 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm">
                {language === 'fa' ? 'پیشنهادهای شگفت‌انگیز اختصاصی' : 'Exclusive VIP Deals'}
              </h4>
              <p className="text-xs text-white/80 mt-0.5">
                {language === 'fa' ? 'دسترسی زودهنگام به حراج‌ها ۳۰ دقیقه قبل از بقیه' : '30-minute early access to flash sales'}
              </p>
            </div>
          </div>
        </div>

        {/* Plus Products Showcase */}
        <div className="pt-2">
          <h3 className="font-bold text-sm text-white/90 mb-4 flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-300" />
            <span>{language === 'fa' ? 'کالاهای ویژه همراه با هدیه نقدی دیجی‌پلاس:' : 'Featured items with DigiPlus cashback:'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {plusProducts.slice(0, 4).map((p) => (
              <div key={p.id} className="text-neutral-900">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
