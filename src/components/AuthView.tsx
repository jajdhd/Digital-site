import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  User, 
  Phone, 
  Mail, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  KeyRound, 
  CheckCircle2, 
  Sparkles, 
  UserPlus, 
  LogIn, 
  Gift, 
  RefreshCw 
} from 'lucide-react';

export const AuthView: React.FC = () => {
  const { 
    language, 
    loginUser, 
    registerUser, 
    setActiveView, 
    showNotification,
    currentUser
  } = useShop();

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  // Login Form State
  const [loginPhone, setLoginPhone] = useState('09123456789');
  const [loginOtp, setLoginOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(120);

  // Register Form State
  const [fullName, setFullName] = useState('امیرمحمد حمیدی');
  const [regPhone, setRegPhone] = useState('09123456789');
  const [regEmail, setRegEmail] = useState('amyrmhmdhmydy342@gmail.com');
  const [nationalCode, setNationalCode] = useState('0012345678');
  const [password, setPassword] = useState('Aura@2026!');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // OTP Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOtpSent && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOtpSent, otpTimer]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPhone || loginPhone.length < 10) {
      showNotification(language === 'fa' ? 'لطفاً شماره موبایل معتبر ۱۱ رقمی وارد نمایید.' : 'Please enter a valid phone number.', 'error');
      return;
    }
    setIsOtpSent(true);
    setOtpTimer(120);
    setLoginOtp('8492'); // Pre-fill mock OTP code for super easy test
    showNotification(language === 'fa' ? 'کد تأیید پیامکی ارسال شد (کد تستی: ۸۴۹۲)' : 'OTP sent (Test Code: 8492)');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpSent) {
      handleSendOtp(e);
      return;
    }
    if (loginOtp !== '8492' && loginOtp.length < 4) {
      showNotification(language === 'fa' ? 'کد وارد شده صحیح نمی‌باشد.' : 'Invalid OTP code.', 'error');
      return;
    }

    loginUser(loginPhone, fullName || 'کاربر گرامی');
    setActiveView('user-profile');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !regPhone || !regEmail) {
      showNotification(language === 'fa' ? 'لطفاً تمامی فیلدهای الزامی را پر کنید.' : 'Please fill all required fields.', 'error');
      return;
    }
    if (!agreeTerms) {
      showNotification(language === 'fa' ? 'لطفاً قوانین و مقررات را بپذیرید.' : 'Please accept terms & conditions.', 'error');
      return;
    }

    registerUser({
      fullName,
      phone: regPhone,
      email: regEmail,
      nationalCode: nationalCode || undefined
    });
    setActiveView('user-profile');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={() => setActiveView('shop')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-600 transition"
        >
          <ArrowRight className="w-4 h-4" />
          <span>{language === 'fa' ? 'بازگشت به صفحه اصلی فروشگاه' : 'Back to Store'}</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Left Side Banner with Brand & Perks */}
        <div className="md:col-span-5 bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-52 h-52 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-52 h-52 bg-orange-500/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-orange-300" />
            </div>

            <h2 className="text-2xl font-black mb-2">
              {language === 'fa' ? 'فروشگاه اینترنتی رستم شاپ' : 'Rostam Online Shop'}
            </h2>
            <p className="text-emerald-100 text-xs leading-relaxed mb-6">
              {language === 'fa' 
                ? 'با ورود یا ثبت نام در رستم شاپ، از ۵۰۰ هزار تومان اعتبار هدیه کیف پول، خرید اقساطی بدون چک و پیگیری لحظه‌ای سفارشات بهره‌مند شوید.'
                : 'Join Rostam Shop to get a 500K Tomans welcome bonus, exclusive installment plans, and real-time order tracking.'}
            </p>

            <div className="space-y-3.5 text-xs text-emerald-50">
              <div className="flex items-center gap-3 bg-white/10 p-2.5 rounded-xl backdrop-blur-sm">
                <Gift className="w-4 h-4 text-orange-300 shrink-0" />
                <span>۵۰۰ هزار تومان اعتبار رایگان کیف پول</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-2.5 rounded-xl backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>تضمین اصالت کالا و گارانتی رسمی ۱۸ ماهه</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-2.5 rounded-xl backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>ارسال اکسپرس پستی با شناسه ۲۴ رقمی شاپرک</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-emerald-500/40 text-[11px] text-emerald-200">
            {language === 'fa' ? 'پشتیبانی ۲۴ ساعته: ۰۲۱-۸۸۸۸۸۸۸۸' : '24/7 Support: +98 21 8888 8888'}
          </div>
        </div>

        {/* Right Side: Auth Forms */}
        <div className="md:col-span-7 p-6 sm:p-10">
          {/* Mode Switcher Tabs */}
          <div className="flex rounded-2xl bg-slate-100 p-1.5 mb-8">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                authMode === 'login'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>{language === 'fa' ? 'ورود به حساب' : 'Log In'}</span>
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                authMode === 'register'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>{language === 'fa' ? 'ثبت‌نام کاربر جدید' : 'Register'}</span>
            </button>
          </div>

          {/* TAB 1: LOGIN (SMS OTP / Fast Auth) */}
          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                  {language === 'fa' ? 'ورود با شماره موبایل' : 'Login with Mobile Phone'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'fa' ? 'کد تأیید یکبار مصرف به شماره موبایل شما ارسال خواهد شد.' : 'A one-time OTP code will be sent to your phone.'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {language === 'fa' ? 'شماره موبایل' : 'Mobile Number'}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="tel"
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    required
                    dir="ltr"
                    className="w-full pr-10 pl-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-right"
                    placeholder="09123456789"
                  />
                </div>
              </div>

              {isOtpSent && (
                <div className="animate-fadeIn space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700">
                      {language === 'fa' ? 'کد تأیید پیامک شده' : 'SMS Verification Code'}
                    </label>
                    <span className="text-xs text-emerald-600 font-mono font-bold">
                      {Math.floor(otpTimer / 60)}:{String(otpTimer % 60).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-emerald-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={loginOtp}
                      onChange={(e) => setLoginOtp(e.target.value)}
                      required
                      maxLength={6}
                      dir="ltr"
                      className="w-full pr-10 pl-4 py-3 bg-slate-50 border border-emerald-300 rounded-2xl text-base font-mono font-bold tracking-widest text-center text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                      placeholder="8492"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                    <span>کد تستی سامانه: <strong>۸۴۹۲</strong></span>
                    {otpTimer === 0 && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="text-emerald-600 hover:underline font-bold flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" /> ارسال مجدد کد
                      </button>
                    )}
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2"
              >
                <span>{isOtpSent ? (language === 'fa' ? 'تأیید و ورود به حساب' : 'Verify & Login') : (language === 'fa' ? 'دریافت کد پیامکی' : 'Send OTP')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* TAB 2: FULL REGISTRATION */}
          {authMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                  {language === 'fa' ? 'ایجاد حساب کاربری جدید' : 'Create an Account'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'fa' ? 'اطلاعات خود را وارد نمایید تا عضو باشگاه مشتریان هورا شوید.' : 'Fill details to register your member profile.'}
                </p>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {language === 'fa' ? 'نام و نام خانوادگی' : 'Full Name'} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full pr-10 pl-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                      placeholder="امیرمحمد حمیدی"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {language === 'fa' ? 'شماره موبایل' : 'Phone'} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      required
                      dir="ltr"
                      className="w-full pr-10 pl-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition text-right"
                      placeholder="09123456789"
                    />
                  </div>
                </div>
              </div>

              {/* Email & National Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {language === 'fa' ? 'آدرس ایمیل' : 'Email Address'} *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                      dir="ltr"
                      className="w-full pr-10 pl-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition text-right"
                      placeholder="user@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {language === 'fa' ? 'کد ملی (۱۰ رقم)' : 'National Code'}
                  </label>
                  <input
                    type="text"
                    value={nationalCode}
                    onChange={(e) => setNationalCode(e.target.value)}
                    maxLength={10}
                    dir="ltr"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition text-right"
                    placeholder="0012345678"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {language === 'fa' ? 'کلمه عبور انتخابی' : 'Password'} *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pr-10 pl-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Agreement */}
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 accent-orange-500 rounded"
                />
                <span className="text-xs text-slate-600">
                  قوانین و مقررات خرید و حریم خصوصی را مطالعه کرده و می‌پذیرم.
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm shadow-md shadow-orange-500/20 transition flex items-center justify-center gap-2"
              >
                <span>{language === 'fa' ? 'تکمیل ثبت‌نام و دریافت هدیه ۵۰۰ هزار تومانی' : 'Complete Registration'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
