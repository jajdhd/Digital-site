import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Calculator, 
  Zap, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  HelpCircle,
  ShoppingBag
} from 'lucide-react';
import { formatPrice, toPersianDigits } from '../utils/formatters';

interface InstallmentModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const InstallmentModal: React.FC<InstallmentModalProps> = ({ product, isOpen, onClose }) => {
  const { language, addToCart, setSelectedPaymentMethod, setActiveView } = useShop();

  const [selectedPlan, setSelectedPlan] = useState<'snapp_4' | 'digipay_6' | 'digipay_12' | 'bank_24'>('snapp_4');
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(25);

  if (!isOpen) return null;

  // Calculation parameters
  const plans = {
    snapp_4: {
      nameFa: 'خرید اقساطی ۴ ماهه اسنپ‌پی',
      nameEn: 'SnappPay 4 Months BNPL',
      months: 4,
      interestRate: 0, // 0% interest
      guaranteeNeededFa: 'بدون ضامن، بدون چک و بدون پیش‌پرداخت اجباری',
      provider: 'اسنپ‌پی (SnappPay)',
      tag: 'بدون کارمزد (۰٪)',
      tagColor: 'bg-emerald-100 text-emerald-800'
    },
    digipay_6: {
      nameFa: 'خرید اقساطی ۶ ماهه دیجی‌پی',
      nameEn: 'Digipay 6 Months',
      months: 6,
      interestRate: 4,
      guaranteeNeededFa: 'اعتبارسنجی آنلاین بانکی در ۳ دقیقه',
      provider: 'دیجی‌پی (Digipay)',
      tag: 'سود ۴٪ کل',
      tagColor: 'bg-blue-100 text-blue-800'
    },
    digipay_12: {
      nameFa: 'خرید اقساطی ۱۲ ماهه هوشمند',
      nameEn: 'Smart 12 Months',
      months: 12,
      interestRate: 8,
      guaranteeNeededFa: 'یک فقره چک صیادی بنفش یا سفته الکترونیک',
      provider: 'پلتفرم لندو و دیجی‌پی',
      tag: 'سود ۸٪ سالانه',
      tagColor: 'bg-purple-100 text-purple-800'
    },
    bank_24: {
      nameFa: 'وام بانکی ۲۴ ماهه ویژه رستم شاپ',
      nameEn: '24 Months Bank Facility',
      months: 24,
      interestRate: 15,
      guaranteeNeededFa: 'وام بدون ضامن با گواهی کسر از حقوق یا رتبه اعتباری A',
      provider: 'بانک ملت و تجارت',
      tag: 'بلندمدت',
      tagColor: 'bg-amber-100 text-amber-800'
    }
  };

  const currentPlan = plans[selectedPlan];
  const totalWithInterest = Math.round(product.priceTomans * (1 + currentPlan.interestRate / 100));
  
  // For SnappPay 4 months: 4 equal installments
  const isSnapp = selectedPlan === 'snapp_4';
  const downPaymentAmount = isSnapp 
    ? Math.round(product.priceTomans / 4) 
    : Math.round((totalWithInterest * downPaymentPercent) / 100);
  
  const remainingAmount = totalWithInterest - downPaymentAmount;
  const monthlyInstallment = isSnapp 
    ? Math.round(product.priceTomans / 4) 
    : Math.round(remainingAmount / (currentPlan.months - (downPaymentPercent > 0 ? 0 : 0)));

  const handleApplyPlan = () => {
    addToCart(product, 1);
    setSelectedPaymentMethod('snapp_pay');
    onClose();
    setActiveView('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-orange-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold shadow-md shadow-orange-500/20">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">
                {language === 'fa' ? 'محاسبه‌گر اقساط و خرید اعتباری (BNPL)' : 'Installment & BNPL Calculator'}
              </h2>
              <p className="text-xs text-slate-600">
                {language === 'fa' 
                  ? `خرید قسطی «${product.titleFa}» بدون فشار مالی`
                  : `Calculate monthly installments for ${product.titleEn}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-xs transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Product Summary Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="w-16 h-16 rounded-xl bg-white p-1 border border-slate-100 flex items-center justify-center shrink-0">
              <img src={product.image} alt={product.titleFa} className="max-h-full max-w-full object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-slate-900 text-sm truncate">{product.titleFa}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-slate-500 font-semibold">قیمت نقدی کالا:</span>
                <span className="text-sm font-black text-orange-600 font-mono">
                  {formatPrice(product.priceTomans, language === 'fa')}
                </span>
              </div>
            </div>
          </div>

          {/* Select Plan */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-3">
              {language === 'fa' ? 'طرح اقساطی مورد نظر را انتخاب فرمایید:' : 'Select Installment Plan:'}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(Object.keys(plans) as Array<keyof typeof plans>).map((key) => {
                const plan = plans[key];
                const isSelected = selectedPlan === key;
                return (
                  <div
                    key={key}
                    onClick={() => setSelectedPlan(key)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/40 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-bold text-xs text-slate-900">{plan.nameFa}</span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${plan.tagColor}`}>
                          {plan.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">{plan.guaranteeNeededFa}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100/80 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">مدت بازپرداخت:</span>
                      <span className="font-bold text-slate-800">{toPersianDigits(plan.months)} ماهه</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Calculation Results */}
          <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs text-slate-300 font-bold flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>برآورد دقیق هزینه‌ها و اقساط ماهانه:</span>
              </span>
              <span className="text-xs text-emerald-400 font-bold">{currentPlan.provider}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-3 rounded-xl bg-slate-800/80">
                <span className="text-[11px] text-slate-400 block mb-1">پیش‌پرداخت اولیه</span>
                <span className="text-sm font-black text-white font-mono">
                  {formatPrice(downPaymentAmount, language === 'fa')}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {isSnapp ? 'قسط اول (امروز)' : `${toPersianDigits(downPaymentPercent)}٪ نقد`}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/30">
                <span className="text-[11px] text-emerald-300 block mb-1">مبلغ هر قسط ماهانه</span>
                <span className="text-base font-black text-emerald-400 font-mono">
                  {formatPrice(monthlyInstallment, language === 'fa')}
                </span>
                <span className="text-[10px] text-emerald-200/70 block mt-0.5">
                  {toPersianDigits(currentPlan.months)} قسط متوالی
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-slate-800/80">
                <span className="text-[11px] text-slate-400 block mb-1">مجموع کل بازپرداخت</span>
                <span className="text-sm font-black text-orange-400 font-mono">
                  {formatPrice(totalWithInterest, language === 'fa')}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">شامل کارمزد و مالیات</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>کلیه مراحل احراز هویت و عقد قرارداد به صورت ۱۰۰٪ آنلاین و بدون نیاز به مراجعه حضوری است.</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>تایید اعتبار و ارسال سفارش ظرف ۲۴ ساعت کاری</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition"
            >
              {language === 'fa' ? 'انصراف' : 'Cancel'}
            </button>
            <button
              onClick={handleApplyPlan}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{language === 'fa' ? 'ثبت سفارش اقساطی' : 'Buy with Installment'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
