import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Sparkles, 
  UserPlus, 
  LogIn, 
  Gift, 
  KeyRound, 
  CheckCircle2, 
  ArrowLeft,
  Eye,
  EyeOff,
  Zap,
  Smartphone
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { toPersianDigits } from '../utils/formatters';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalTab, 
    setAuthModalTab, 
    loginUser, 
    registerUser, 
    language, 
    showNotification,
    setActiveView 
  } = useShop();

  // Mode: Sign In vs Sign Up
  const [loginMethod, setLoginMethod] = useState<'otp' | 'password'>('otp');
  const [showPassword, setShowPassword] = useState(false);

  // Sign In state
  const [loginPhone, setLoginPhone] = useState('09123456789');
  const [loginPassword, setLoginPassword] = useState('Rostam@2026!');
  const [loginOtp, setLoginOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(120);

  // Sign Up state
  const [regFullName, setRegFullName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regNationalCode, setRegNationalCode] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPasswordConfirm, setRegPasswordConfirm] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Countdown timer for OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOtpSent && otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOtpSent, otpTimer]);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPhone || loginPhone.length < 10) {
      showNotification(language === 'fa' ? 'لطفاً شماره موبایل معتبر ۱۱ رقمی وارد نمایید.' : 'Please enter a valid 11-digit phone number.', 'error');
      return;
    }
    setIsOtpSent(true);
    setOtpTimer(120);
    setLoginOtp('8492'); // Test code auto-fill
    showNotification(language === 'fa' ? 'کد تایید پیامکی ارسال شد (کد تستی رستم شاپ: ۸۴۹۲)' : 'Verification code sent (Test: 8492)');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === 'otp') {
      if (!isOtpSent) {
        handleSendOtp(e);
        return;
      }
      if (loginOtp !== '8492' && loginOtp.length < 4) {
        showNotification(language === 'fa' ? 'کد تایید وارد شده نادرست است.' : 'Invalid verification code.', 'error');
        return;
      }
    } else {
      if (!loginPassword || loginPassword.length < 4) {
        showNotification(language === 'fa' ? 'لطفاً رمز عبور خود را وارد نمایید.' : 'Please enter your password.', 'error');
        return;
      }
    }

    loginUser(loginPhone, 'امیرمحمد حمیدی');
    setIsAuthModalOpen(false);
  };

  const handleFastDemoLogin = () => {
    loginUser('09123456789', 'امیرمحمد حمیدی (کاربر تستی)');
    setIsAuthModalOpen(false);
    showNotification(language === 'fa' ? 'ورود با حساب تستی با موفقیت انجام شد.' : 'Logged in with test account.', 'success');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regFullName.trim()) {
      showNotification(language === 'fa' ? 'لطفاً نام و نام خانوادگی خود را وارد نمایید.' : 'Please enter your full name.', 'error');
      return;
    }
    if (!regPhone || regPhone.length < 10) {
      showNotification(language === 'fa' ? 'شماره موبایل وارد شده معتبر نمی‌باشد.' : 'Invalid phone number.', 'error');
      return;
    }
    if (regPassword && regPasswordConfirm && regPassword !== regPasswordConfirm) {
      showNotification(language === 'fa' ? 'تکرار رمز عبور با رمز عبور مطابقت ندارد.' : 'Passwords do not match.', 'error');
      return;
    }
    if (!agreeTerms) {
      showNotification(language === 'fa' ? 'پذیرش قوانین و مقررات رستم شاپ الزامی است.' : 'Please accept terms & conditions.', 'error');
      return;
    }

    registerUser({
      fullName: regFullName,
      phone: regPhone,
      email: regEmail || `${regPhone}@rostamshop.ir`,
      nationalCode: regNationalCode || undefined
    });

    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto no-scrollbar shadow-2xl relative text-slate-900"
        dir={language === 'fa' ? 'rtl' : 'ltr'}
      >
        {/* Top Header */}
        <div className="sticky top-0 z-20 px-6 py-4 bg-white/95 backdrop-blur-md border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-orange-500 p-0.5 shadow-md shadow-emerald-600/20">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                {language === 'fa' ? 'ورود و ثبت‌نام در رستم شاپ' : 'Sign In / Sign Up • Rostam Shop'}
              </h3>
              <p className="text-[11px] text-slate-500 font-semibold">
                {language === 'fa' ? 'دسترسی امن به سفارشات، کیف پول و خرید اقساطی' : 'Secure access to wallet, orders & installments'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors border border-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="p-6 pb-2">
          <div className="grid grid-cols-2 p-1 bg-slate-100/90 rounded-2xl border border-slate-200">
            <button
              onClick={() => setAuthModalTab('signin')}
              className={`py-2.5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                authModalTab === 'signin'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LogIn className="w-4 h-4 text-emerald-600" />
              <span>{language === 'fa' ? 'ورود به حساب کاربری' : 'Sign In'}</span>
            </button>
            <button
              onClick={() => setAuthModalTab('signup')}
              className={`py-2.5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                authModalTab === 'signup'
                  ? 'bg-white text-orange-600 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-4 h-4 text-orange-500" />
              <span>{language === 'fa' ? 'ثبت‌نام جدید (هدیه ۱ میلیونی)' : 'Sign Up (Bonus)'}</span>
            </button>
          </div>
        </div>

        {/* TAB 1: SIGN IN */}
        {authModalTab === 'signin' && (
          <div className="p-6 pt-3 space-y-5">
            {/* Quick Demo Login Box */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-extrabold text-xs text-emerald-950 block">ورود سریع تستی با یک کلیک</span>
                  <span className="text-[11px] text-emerald-700">بدون نیاز به دریافت پیامک یا رمز عبور</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleFastDemoLogin}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shrink-0 shadow-xs"
              >
                ورود فوری
              </button>
            </div>

            {/* Login Method Radio */}
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="text-xs text-slate-500 font-bold">روش ورود:</span>
              <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="modalLoginMethod"
                  checked={loginMethod === 'otp'}
                  onChange={() => setLoginMethod('otp')}
                  className="accent-emerald-600"
                />
                <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                <span>کد تایید پیامکی (OTP)</span>
              </label>
              <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="modalLoginMethod"
                  checked={loginMethod === 'password'}
                  onChange={() => setLoginMethod('password')}
                  className="accent-emerald-600"
                />
                <Lock className="w-3.5 h-3.5 text-slate-600" />
                <span>رمز عبور</span>
              </label>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Phone Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  شماره موبایل:
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4 text-emerald-600" />
                  </div>
                  <input
                    type="tel"
                    dir="ltr"
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    placeholder="09123456789"
                    required
                    className="w-full pl-3 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 font-mono font-bold focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
                  />
                </div>
              </div>

              {/* OTP Mode */}
              {loginMethod === 'otp' && (
                <div>
                  {isOtpSent ? (
                    <div className="space-y-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600 font-bold">کد ۴ رقمی ارسال شده:</span>
                        <span className="text-emerald-700 font-mono font-bold">
                          {Math.floor(otpTimer / 60)}:{String(otpTimer % 60).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                          <KeyRound className="w-4 h-4 text-orange-500" />
                        </div>
                        <input
                          type="text"
                          dir="ltr"
                          value={loginOtp}
                          onChange={(e) => setLoginOtp(e.target.value)}
                          placeholder="8492"
                          maxLength={5}
                          className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-300 rounded-xl text-center text-base tracking-widest font-mono font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <p className="text-[11px] text-emerald-700">
                        کد تستی پیش‌فرض: <strong className="font-mono">۸۴۹۲</strong>
                      </p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-200"
                    >
                      <Zap className="w-4 h-4 text-orange-500" />
                      <span>ارسال کد تایید پیامکی</span>
                    </button>
                  )}
                </div>
              )}

              {/* Password Mode */}
              {loginMethod === 'password' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">کلمه عبور:</label>
                    <button
                      type="button"
                      onClick={() => showNotification(language === 'fa' ? 'لینک بازیابی رمز به موبایل شما ارسال خواهد شد.' : 'Password reset link sent.', 'info')}
                      className="text-[11px] text-emerald-600 hover:underline font-bold"
                    >
                      فراموشی رمز عبور؟
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4 text-emerald-600" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      dir="ltr"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 font-mono focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs sm:text-sm transition shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>{language === 'fa' ? 'ورود به حساب کاربری رستم شاپ' : 'Sign In to Rostam Shop'}</span>
              </button>
            </form>

            <div className="text-center pt-2">
              <span className="text-xs text-slate-500 font-semibold">حساب کاربری ندارید؟ </span>
              <button
                type="button"
                onClick={() => setAuthModalTab('signup')}
                className="text-xs text-orange-600 hover:text-orange-700 font-black hover:underline inline-flex items-center gap-1"
              >
                <span>ثبت نام و دریافت ۱ میلیون هدیه</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: SIGN UP */}
        {authModalTab === 'signup' && (
          <div className="p-6 pt-3 space-y-4">
            {/* 1M Bonus Banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Gift className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-extrabold text-orange-950 block">هدیه عضویت: ۱,۰۰۰,۰۰۰ تومان اعتبار کیف پول</span>
                <span className="text-orange-800 text-[11px]">با تکمیل ثبت‌نام، این مبلغ بلافاصله به کیف پول شما واریز می‌شود.</span>
              </div>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    نام و نام خانوادگی: <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                      <User className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <input
                      type="text"
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      placeholder="امیرمحمد حمیدی"
                      required
                      className="w-full pr-9 pl-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    شماره موبایل: <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <input
                      type="tel"
                      dir="ltr"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="09123456789"
                      required
                      className="w-full pr-9 pl-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono font-bold focus:bg-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* National Code */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    کد ملی (جهت صدور فاکتور و رجیستری):
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={regNationalCode}
                    onChange={(e) => setRegNationalCode(e.target.value)}
                    placeholder="0012345678"
                    maxLength={10}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:bg-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    آدرس ایمیل:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <input
                      type="email"
                      dir="ltr"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="amyrmhmdhmydy342@gmail.com"
                      className="w-full pr-9 pl-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:bg-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    رمز عبور:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <input
                      type="password"
                      dir="ltr"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pr-9 pl-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:bg-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    تکرار رمز عبور:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <input
                      type="password"
                      dir="ltr"
                      value={regPasswordConfirm}
                      onChange={(e) => setRegPasswordConfirm(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pr-9 pl-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:bg-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 accent-emerald-600 cursor-pointer"
                />
                <span className="text-xs text-slate-600 font-bold">
                  کلیه <span className="text-emerald-700 underline">قوانین و مقررات خرید از رستم شاپ</span> و حفظ حریم خصوصی را می‌پذیرم.
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-black text-xs sm:text-sm transition shadow-md shadow-orange-600/20 flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>ثبت‌نام و دریافت ۱,۰۰۰,۰۰۰ تومان هدیه کیف پول</span>
              </button>
            </form>

            <div className="text-center pt-1">
              <span className="text-xs text-slate-500 font-semibold">قبلاً ثبت نام کرده‌اید؟ </span>
              <button
                type="button"
                onClick={() => setAuthModalTab('signin')}
                className="text-xs text-emerald-700 hover:underline font-black"
              >
                ورود به حساب کاربری
              </button>
            </div>
          </div>
        )}

        {/* Security Badges Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
          <span className="flex items-center gap-1.5 text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>رمزنگاری امن پروتکل شاپرک</span>
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" />
            <span>احراز هویت پیامکی ۲ مرحله‌ای</span>
          </span>
        </div>
      </div>
    </div>
  );
};
