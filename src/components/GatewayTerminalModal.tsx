import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Clock, 
  KeyRound, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice, formatRials, formatCardNumber, detectIranianBank, toPersianDigits } from '../utils/formatters';

export const GatewayTerminalModal: React.FC = () => {
  const { 
    language, 
    isGatewayModalOpen, 
    gatewaySession, 
    closeGatewayModal, 
    submitGatewayPayment,
    gatewayConfig 
  } = useShop();

  if (!isGatewayModalOpen || !gatewaySession) return null;

  const [cardNumber, setCardNumber] = useState('6037997582914821');
  const [cvv2, setCvv2] = useState('482');
  const [expMonth, setExpMonth] = useState('08');
  const [expYear, setExpYear] = useState('06');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(120);
  const [captchaInput, setCaptchaInput] = useState('58392');
  const [captchaCode, setCaptchaCode] = useState('58392');
  const [isProcessing, setIsProcessing] = useState(false);

  const bankInfo = detectIranianBank(cardNumber);

  // OTP Timer countdown
  useEffect(() => {
    let interval: any;
    if (isOtpSent && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOtpSent, otpTimer]);

  const handleSendOtp = () => {
    setIsOtpSent(true);
    setOtpTimer(120);
    setTimeout(() => {
      setOtp('73910'); // Simulated Iranian dynamic OTP
    }, 600);
  };

  const handleRefreshCaptcha = () => {
    const randomCode = String(Math.floor(10000 + Math.random() * 90000));
    setCaptchaCode(randomCode);
    setCaptchaInput(randomCode);
  };

  const handleCardPreset = (presetCard: string) => {
    setCardNumber(presetCard);
  };

  const handlePaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(async () => {
      await submitGatewayPayment(true, formatCardNumber(cardNumber));
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative text-slate-900 my-auto font-sans" dir={language === 'fa' ? 'rtl' : 'ltr'}>
        
        {/* Shaparak / Zarinpal Terminal Header */}
        <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 border-b border-slate-200 p-5 sm:p-6 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-xl shadow-xs">
              Z
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  {language === 'fa' ? 'درگاه پرداخت اینترنتی شاپرک و زرین‌پال' : 'Shaparak & Zarinpal Payment Terminal'}
                </h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  {gatewayConfig.isSandbox ? 'SANDBOX v4' : 'PRODUCTION'}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {language === 'fa' ? 'پذیرنده: فروشگاه آنلاین هورا (Aura Shop)' : 'Merchant: Aura Tech Store'}
              </span>
            </div>
          </div>

          <button
            onClick={closeGatewayModal}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

        </div>

        {/* Transaction Meta Strip */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-600 font-medium">{language === 'fa' ? 'مبلغ قابل پرداخت:' : 'Amount:'}</span>
            <span className="font-mono font-black text-orange-600 text-base">
              {formatPrice(gatewaySession.amountTomans, language === 'fa')}
            </span>
            <span className="text-slate-500 font-mono text-[11px] font-bold">
              ({formatRials(gatewaySession.amountTomans, language === 'fa')})
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-600">
            <span>Authority:</span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
              {gatewaySession.authority.slice(0, 18)}...
            </span>
          </div>
        </div>

        {/* Test Card Presets Strip */}
        <div className="bg-emerald-50/50 px-6 py-2.5 border-b border-emerald-100 flex items-center justify-between text-xs">
          <span className="text-emerald-900 font-bold flex items-center gap-1 text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            {language === 'fa' ? 'انتخاب سریع کارت‌های تستی شتاب:' : 'Quick Test Card Presets:'}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleCardPreset('6037997582914821')}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-100 text-[10px] text-emerald-800 font-bold border border-emerald-200 cursor-pointer shadow-2xs"
            >
              بانک ملی
            </button>
            <button
              type="button"
              onClick={() => handleCardPreset('6104337890123456')}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-100 text-[10px] text-rose-700 font-bold border border-rose-200 cursor-pointer shadow-2xs"
            >
              بانک ملت
            </button>
            <button
              type="button"
              onClick={() => handleCardPreset('6219861012345678')}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-100 text-[10px] text-cyan-700 font-bold border border-cyan-200 cursor-pointer shadow-2xs"
            >
              بانک سامان / بلو
            </button>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handlePaySubmit} className="p-6 sm:p-7 space-y-5">
          
          {/* Card Number Input with Dynamic Bank Display */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-700">
                {language === 'fa' ? 'شماره ۱۶ رقمی کارت بانکی (شتاب):' : 'Card Number (16-digits):'}
              </label>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md bg-gradient-to-r ${bankInfo.color} text-white shadow-xs`}>
                {language === 'fa' ? bankInfo.nameFa : bankInfo.nameEn}
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                maxLength={19}
                value={formatCardNumber(cardNumber)}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="6037-99xx-xxxx-xxxx"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm sm:text-base font-mono font-bold text-slate-900 tracking-widest text-center focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                required
              />
              <CreditCard className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* CVV2 and Expiration Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* CVV2 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                {language === 'fa' ? 'کد اعتبارسنجی دوم (CVV2):' : 'CVV2 Code:'}
              </label>
              <input
                type="password"
                maxLength={4}
                value={cvv2}
                onChange={(e) => setCvv2(e.target.value)}
                placeholder="***"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-sm font-mono text-center text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            {/* Exp Date (Month / Year) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                {language === 'fa' ? 'تاریخ انقضای کارت (ماه / سال):' : 'Expiry Date (MM/YY):'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  maxLength={2}
                  value={expMonth}
                  onChange={(e) => setExpMonth(e.target.value)}
                  placeholder="ماه (۰۸)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs font-mono text-center text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500"
                  required
                />
                <input
                  type="text"
                  maxLength={2}
                  value={expYear}
                  onChange={(e) => setExpYear(e.target.value)}
                  placeholder="سال (۰۶)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs font-mono text-center text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>

          </div>

          {/* Dynamic OTP SMS & Captcha */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            
            {/* Dynamic OTP (رمز پویا) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-700">
                  {language === 'fa' ? 'رمز دوم پویا (پیامکی):' : 'Dynamic SMS OTP:'}
                </label>
                {isOtpSent && (
                  <span className="text-[10px] text-orange-600 font-mono font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {otpTimer}s
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="password"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="رمز ۵ یا ۶ رقمی"
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs font-mono text-center text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500"
                  required
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-extrabold text-xs px-3 py-2 rounded-2xl border border-emerald-200 cursor-pointer whitespace-nowrap"
                >
                  {isOtpSent ? (language === 'fa' ? 'ارسال مجدد' : 'Resend') : (language === 'fa' ? 'دریافت رمز پویا' : 'Get OTP')}
                </button>
              </div>
            </div>

            {/* Captcha Security Code */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                {language === 'fa' ? 'کد امنیتی تصویر:' : 'Security Captcha:'}
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs font-mono text-center text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500"
                  required
                />
                <div className="bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-2xl flex items-center gap-1.5 font-mono font-black text-sm tracking-widest text-emerald-800 select-none">
                  <span>{captchaCode}</span>
                  <button
                    type="button"
                    onClick={handleRefreshCaptcha}
                    className="text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-3">
            
            <button
              type="button"
              onClick={() => submitGatewayPayment(false)}
              className="bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 font-bold text-xs sm:text-sm py-3.5 rounded-2xl border border-slate-200 transition-all cursor-pointer"
            >
              {language === 'fa' ? 'انصراف از پرداخت' : 'Cancel Payment'}
            </button>

            <button
              type="submit"
              disabled={isProcessing}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-2xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <Lock className="w-4 h-4" />
              <span>
                {isProcessing
                  ? (language === 'fa' ? 'در حال ارسال به شاپرک...' : 'Processing Transaction...')
                  : (language === 'fa' ? 'پرداخت و تأیید نهایی' : 'Submit & Verify')}
              </span>
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};
