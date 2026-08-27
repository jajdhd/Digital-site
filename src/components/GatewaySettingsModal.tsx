import React, { useState } from 'react';
import { 
  CreditCard, 
  Settings2, 
  Key, 
  Globe, 
  Server, 
  CheckCircle2, 
  RefreshCw, 
  Copy, 
  ShieldAlert, 
  Sparkles,
  Terminal,
  Zap
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ZARINPAL_CONFIG, requestZarinpalPayment } from '../services/zarinpalService';

export const GatewaySettingsModal: React.FC = () => {
  const { 
    language, 
    gatewayConfig, 
    updateGatewayConfig, 
    setActiveView, 
    showNotification 
  } = useShop();

  const [merchantId, setMerchantId] = useState(gatewayConfig.merchantId);
  const [isSandbox, setIsSandbox] = useState(gatewayConfig.isSandbox);
  const [currency, setCurrency] = useState<'IRT' | 'IRR'>(gatewayConfig.currency);
  const [callbackUrl, setCallbackUrl] = useState(gatewayConfig.callbackUrl);

  // Live test API state
  const [testAmount, setTestAmount] = useState('50000');
  const [apiTesting, setApiTesting] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateGatewayConfig({
      merchantId,
      isSandbox,
      currency,
      callbackUrl
    });
  };

  const handleResetSandbox = () => {
    setMerchantId(ZARINPAL_CONFIG.DEFAULT_MERCHANT_ID);
    setIsSandbox(true);
    setCurrency('IRT');
    showNotification(language === 'fa' ? 'اطلاعات درگاه به مقادیر پیش‌فرض سندباکس بازگردانده شد.' : 'Reset to default Sandbox credentials.');
  };

  const handleRunApiTest = async () => {
    setApiTesting(true);
    setTestResult(null);

    try {
      const resp = await requestZarinpalPayment({
        merchant_id: merchantId,
        amount: Number(testAmount) || 50000,
        currency,
        description: 'تست اتصال API درگاه زرین‌پال فروشگاه',
        callback_url: callbackUrl,
        metadata: {
          mobile: '09123456789',
          email: 'test@shop.ir'
        }
      });

      setTestResult(resp);
      showNotification(language === 'fa' ? 'درخواست اتصال درگاه با موفقیت ارسال شد!' : 'Gateway API request executed successfully!');
    } catch (err: any) {
      setTestResult({ error: err.message });
      showNotification(language === 'fa' ? 'خطا در برقراری ارتباط' : 'API Connection Error', 'error');
    } finally {
      setApiTesting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-slate-900 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-extrabold text-xl text-slate-900">
              {language === 'fa' ? 'تنظیمات درگاه پرداخت زرین‌پال و شاپرک' : 'Payment Gateway & API Settings'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {language === 'fa' ? 'مدیریت مرچنت‌کد اختصاصی، محیط تست (Sandbox) و بررسی زنده ارتباط API' : 'Manage your Merchant ID, Sandbox switch, and live API endpoints'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveView('shop')}
          className="bg-white hover:bg-slate-50 text-xs text-slate-700 font-bold px-4 py-2 rounded-xl border border-slate-200 shadow-xs cursor-pointer"
        >
          {language === 'fa' ? 'بازگشت به فروشگاه' : 'Back to Shop'}
        </button>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Merchant ID */}
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-orange-500" />
                <span>{language === 'fa' ? 'شناسه درگاه اختصاصی (Merchant ID ۳۶ کاراکتری):' : 'Zarinpal Merchant ID (36-char):'}</span>
              </label>
              <button
                type="button"
                onClick={handleResetSandbox}
                className="text-[11px] text-emerald-700 font-bold hover:underline cursor-pointer"
              >
                {language === 'fa' ? 'استفاده از مرچنت‌کد تست سندباکس' : 'Use Default Sandbox ID'}
              </button>
            </div>

            <input
              type="text"
              value={merchantId}
              onChange={(e) => setMerchantId(e.target.value)}
              placeholder="12345678-1234-1234-1234-123456789012"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm font-mono text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition"
              required
            />
            <span className="text-[11px] text-slate-500 block">
              {language === 'fa' 
                ? 'مرچنت‌کد اختصاصی دریافتی از پنل زرین‌پال خود را اینجا وارد کنید یا از حالت سندباکس پیش‌فرض استفاده نمایید.' 
                : 'Enter your 36-char merchant code obtained from Zarinpal panel, or use Sandbox default.'}
            </span>
          </div>

          {/* Sandbox Toggle */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                {language === 'fa' ? 'محیط آزمایشی (Sandbox Mode):' : 'Sandbox Test Mode:'}
              </span>
              <button
                type="button"
                onClick={() => setIsSandbox(!isSandbox)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  isSandbox ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform absolute top-1 ${
                  isSandbox ? (language === 'fa' ? 'left-1' : 'right-1') : (language === 'fa' ? 'right-1' : 'left-1')
                }`} />
              </button>
            </div>
            <p className="text-[11px] text-slate-600">
              {isSandbox 
                ? 'تراکنش‌ها به صورت آزمایشی در محیط تست زرین‌پال پردازش می‌شوند و پولی کسر نمی‌شود.' 
                : 'محیط فعال پروداکشن برای تراکنش‌های واقعی مشتریان.'}
            </p>
          </div>

          {/* Currency (Toman vs Rial) */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <label className="text-xs font-bold text-slate-800 block">
              {language === 'fa' ? 'واحد پولی ارسال به درگاه:' : 'Gateway Base Currency:'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCurrency('IRT')}
                className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  currency === 'IRT' ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                تومان (IRT)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('IRR')}
                className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  currency === 'IRR' ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                ریال (IRR)
              </button>
            </div>
          </div>

          {/* Callback URL */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-orange-500" />
              <span>{language === 'fa' ? 'آدرس بازگشت (Callback URL):' : 'Gateway Callback URL:'}</span>
            </label>
            <input
              type="url"
              value={callbackUrl}
              onChange={(e) => setCallbackUrl(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition"
              required
            />
          </div>

        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-sm transition-all cursor-pointer"
          >
            {language === 'fa' ? 'ذخیره تنظیمات درگاه' : 'Save Gateway Configuration'}
          </button>
        </div>

      </form>

      {/* Live API Tester Box */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Terminal className="w-5 h-5 text-orange-500" />
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
            {language === 'fa' ? 'تست زنده درخواست به اندپوینت زرین‌پال v4' : 'Live Zarinpal Request.json Tester'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="text-xs text-slate-600 block mb-1 font-bold">
              {language === 'fa' ? 'مبلغ تستی (تومان):' : 'Test Amount (Tomans):'}
            </label>
            <input
              type="number"
              value={testAmount}
              onChange={(e) => setTestAmount(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              disabled={apiTesting}
              onClick={handleRunApiTest}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-3 rounded-2xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>{apiTesting ? 'در حال ارسال...' : 'ارسال درخواست Request'}</span>
            </button>
          </div>
        </div>

        {/* Test Result Display */}
        {testResult && (
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-slate-700 block">
              {language === 'fa' ? 'پاسخ دریافتی از سرور زرین‌پال:' : 'Zarinpal API Response:'}
            </span>
            <pre className="bg-slate-900 text-emerald-400 p-4 rounded-2xl text-xs font-mono border border-slate-800 overflow-x-auto" dir="ltr">
              {JSON.stringify(testResult, null, 2)}
            </pre>
          </div>
        )}
      </div>

    </div>
  );
};
