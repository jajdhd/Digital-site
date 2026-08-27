import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PaymentMethodType, DirectPaymentRequest } from '../types';
import { 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  Terminal, 
  Copy, 
  Check, 
  ArrowRight, 
  Code2, 
  Building2, 
  Phone, 
  User, 
  FileText, 
  Coins, 
  HelpCircle,
  Clock,
  Send
} from 'lucide-react';

export const PaymentPageView: React.FC = () => {
  const { 
    language, 
    startDirectPayment, 
    gatewayConfig, 
    setActiveView,
    currentUser,
    showNotification
  } = useShop();

  const [invoiceNumber, setInvoiceNumber] = useState<string>(() => `INV-${Math.floor(100000 + Math.random() * 900000)}`);
  const [payerName, setPayerName] = useState<string>(currentUser?.fullName || 'امیرمحمد حمیدی');
  const [payerPhone, setPayerPhone] = useState<string>(currentUser?.phone || '09123456789');
  const [payerEmail, setPayerEmail] = useState<string>(currentUser?.email || 'amyrmhmdhmydy342@gmail.com');
  const [amountTomans, setAmountTomans] = useState<number>(2500000);
  const [description, setDescription] = useState<string>('پرداخت فاکتور خدمات و سفارشات آنلاین');
  const [selectedGateway, setSelectedGateway] = useState<PaymentMethodType>('zarinpal');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copiedCurl, setCopiedCurl] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'form' | 'api-inspect'>('form');

  const presetAmounts = [
    { labelFa: '۵۰۰ هزار تومان', labelEn: '500K Tomans', val: 500000 },
    { labelFa: '۱ میلیون تومان', labelEn: '1M Tomans', val: 1000000 },
    { labelFa: '۲.۵ میلیون تومان', labelEn: '2.5M Tomans', val: 2500000 },
    { labelFa: '۵ میلیون تومان', labelEn: '5M Tomans', val: 5000000 },
    { labelFa: '۱۰ میلیون تومان', labelEn: '10M Tomans', val: 10000000 },
  ];

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amountTomans || amountTomans < 1000) {
      showNotification(language === 'fa' ? 'حداقل مبلغ پرداخت ۱,۰۰۰ تومان می‌باشد.' : 'Minimum payment is 1,000 Tomans.', 'error');
      return;
    }
    if (!payerPhone || payerPhone.length < 10) {
      showNotification(language === 'fa' ? 'شماره موبایل وارد شده نامعتبر است.' : 'Invalid mobile phone number.', 'error');
      return;
    }

    setIsProcessing(true);
    const req: DirectPaymentRequest = {
      invoiceNumber,
      payerName,
      payerPhone,
      payerEmail,
      amountTomans,
      description,
      gateway: selectedGateway
    };

    try {
      await startDirectPayment(req);
    } finally {
      setIsProcessing(false);
    }
  };

  const sampleCurl = `curl -X POST "https://payment.zarinpal.com/pg/v4/payment/request.json" \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json" \\
  -d '{
    "merchant_id": "${gatewayConfig.merchantId}",
    "amount": ${amountTomans},
    "currency": "${gatewayConfig.currency}",
    "description": "${description}",
    "callback_url": "${gatewayConfig.callbackUrl}",
    "metadata": {
      "mobile": "${payerPhone}",
      "email": "${payerEmail}",
      "order_id": "${invoiceNumber}"
    }
  }'`;

  const copyCurlToClipboard = () => {
    navigator.clipboard.writeText(sampleCurl);
    setCopiedCurl(true);
    showNotification(language === 'fa' ? 'دستور cURL در حافظه کپی شد!' : 'cURL command copied to clipboard!');
    setTimeout(() => setCopiedCurl(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-bold mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{language === 'fa' ? 'درگاه رسمی و امن الکترونیک شاپرک و زرین‌پال' : 'Official Zarinpal & Shaparak Payment Gateway'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {language === 'fa' ? 'صفحه پرداخت اختصاصی و فاکتور آنلاین' : 'Dedicated Online Payment & Invoice Page'}
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            {language === 'fa' 
              ? 'امکان پرداخت مستقیم فاکتور، شارژ حساب کاربری و تست زنده فراخوانی وب‌سرویس‌های درگاه پرداخت با پشتیبانی از پروتکل v4 زرین‌پال.'
              : 'Direct invoice payment, wallet charge, and live API gateway testing with Zarinpal v4 protocol support.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('dev-docs')}
            className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2 transition"
          >
            <Code2 className="w-4 h-4 text-emerald-600" />
            <span>{language === 'fa' ? 'مستندات فنی API' : 'Developer API Docs'}</span>
          </button>
          <button
            onClick={() => setActiveView('shop')}
            className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition"
          >
            <span>{language === 'fa' ? 'بازگشت به فروشگاه' : 'Back to Store'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Payment Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 text-lg">
                    {language === 'fa' ? 'مشخصات پرداخت و فاکتور' : 'Payment Details & Invoice'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {language === 'fa' ? 'اطلاعات را وارد کرده و درگاه مورد نظر را انتخاب نمایید.' : 'Enter details and select your preferred payment gateway.'}
                  </p>
                </div>
              </div>

              {/* Mode indicator */}
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                gatewayConfig.isSandbox 
                  ? 'bg-amber-50 text-amber-700 border-amber-200' 
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                {gatewayConfig.isSandbox ? (language === 'fa' ? 'محیط تستی (Sandbox)' : 'Sandbox Mode') : (language === 'fa' ? 'محیط عملیاتی شاپرک' : 'Production Mode')}
              </span>
            </div>

            <form onSubmit={handlePay} className="mt-6 space-y-5">
              {/* Invoice & Amount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {language === 'fa' ? 'شماره فاکتور / شناسه پرداخت' : 'Invoice / Order ID'}
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      required
                      className="w-full pr-10 pl-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                      placeholder="INV-928190"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {language === 'fa' ? 'مبلغ قابل پرداخت (تومان)' : 'Amount (Tomans)'}
                  </label>
                  <div className="relative">
                    <Coins className="w-4 h-4 text-orange-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="number"
                      value={amountTomans || ''}
                      onChange={(e) => setAmountTomans(Number(e.target.value))}
                      required
                      min={1000}
                      className="w-full pr-10 pl-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-orange-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                      placeholder="مثال: ۲۵۰۰۰۰۰"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Amount Pills */}
              <div>
                <span className="text-xs text-slate-500 mb-2 block font-medium">
                  {language === 'fa' ? 'انتخاب سریع مبالغ پرکاربرد:' : 'Quick amount presets:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {presetAmounts.map((p) => (
                    <button
                      key={p.val}
                      type="button"
                      onClick={() => setAmountTomans(p.val)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                        amountTomans === p.val
                          ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {language === 'fa' ? p.labelFa : p.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {language === 'fa' ? 'نام پرداخت کننده' : 'Payer Full Name'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={payerName}
                      onChange={(e) => setPayerName(e.target.value)}
                      required
                      className="w-full pr-10 pl-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                      placeholder="امیرمحمد حمیدی"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {language === 'fa' ? 'شماره موبایل (جهت دریافت پیامک رسید)' : 'Mobile Phone'}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      value={payerPhone}
                      onChange={(e) => setPayerPhone(e.target.value)}
                      required
                      dir="ltr"
                      className="w-full pr-10 pl-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-right"
                      placeholder="09123456789"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {language === 'fa' ? 'توضیحات و بابت تراکنش' : 'Payment Description'}
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                  placeholder="بابت تسویه فاکتور و خدمات پشتیبانی"
                />
              </div>

              {/* Select Payment Gateway */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-3">
                  {language === 'fa' ? 'انتخاب درگاه پرداخت آنلاین:' : 'Select Payment Gateway:'}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Gateway 1: Zarinpal */}
                  <label
                    onClick={() => setSelectedGateway('zarinpal')}
                    className={`flex items-center gap-3.5 p-4 rounded-2xl border-2 cursor-pointer transition ${
                      selectedGateway === 'zarinpal'
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">زرین‌پال شاپرک</span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">پیشنهادی</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">پروتکل v4 با تأیید لحظه‌ای</p>
                    </div>
                  </label>

                  {/* Gateway 2: Mellat Behpardakht */}
                  <label
                    onClick={() => setSelectedGateway('mellat_shaparak')}
                    className={`flex items-center gap-3.5 p-4 rounded-2xl border-2 cursor-pointer transition ${
                      selectedGateway === 'mellat_shaparak'
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-rose-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">به‌پرداخت ملت</span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">شتاب</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">درگاه مستقیم بانک ملت</p>
                    </div>
                  </label>

                  {/* Gateway 3: Saman SEP */}
                  <label
                    onClick={() => setSelectedGateway('saman_shaparak')}
                    className={`flex items-center gap-3.5 p-4 rounded-2xl border-2 cursor-pointer transition ${
                      selectedGateway === 'saman_shaparak'
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">سامان کیش (سپ)</span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">شاپرک</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">پرداخت الکترونیک سامان</p>
                    </div>
                  </label>

                  {/* Gateway 4: Card to Card */}
                  <label
                    onClick={() => setSelectedGateway('card_to_card')}
                    className={`flex items-center gap-3.5 p-4 rounded-2xl border-2 cursor-pointer transition ${
                      selectedGateway === 'card_to_card'
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">کارت به کارت شتاب</span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800">آنی</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">ثبت شماره ارجاع و پیگیری</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Payment CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-base flex items-center justify-center gap-3 shadow-lg shadow-orange-500/25 transition disabled:opacity-50"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>
                    {isProcessing
                      ? (language === 'fa' ? 'در حال اتصال به شاپرک...' : 'Connecting to gateway...')
                      : (language === 'fa' ? `پرداخت آنلاین ${amountTomans.toLocaleString('fa-IR')} تومان` : `Pay ${amountTomans.toLocaleString()} Tomans`)}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Side Panel: Live API Inspector & Trust info */}
        <div className="lg:col-span-5 space-y-6">
          {/* API Inspector Card */}
          <div className="bg-slate-900 rounded-3xl p-6 text-slate-100 shadow-sm border border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-sm text-slate-200">
                  {language === 'fa' ? 'درخواست وب‌سرویس Zarinpal v4' : 'Zarinpal v4 Request Payload'}
                </span>
              </div>
              <button
                onClick={copyCurlToClipboard}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition"
                title="Copy cURL"
              >
                {copiedCurl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCurl ? (language === 'fa' ? 'کپی شد' : 'Copied') : 'cURL'}</span>
              </button>
            </div>

            <div className="bg-slate-950/80 rounded-2xl p-4 font-mono text-xs text-slate-300 overflow-x-auto border border-slate-800/80 max-h-72">
              <div className="text-emerald-400 mb-2">// POST /pg/v4/payment/request.json</div>
              <pre className="text-[11px] leading-relaxed">
{JSON.stringify({
  merchant_id: gatewayConfig.merchantId,
  amount: amountTomans,
  currency: gatewayConfig.currency,
  description: description,
  callback_url: gatewayConfig.callbackUrl,
  metadata: {
    mobile: payerPhone,
    email: payerEmail,
    order_id: invoiceNumber
  }
}, null, 2)}
              </pre>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                درگاه آماده پذیرش تراکنش
              </span>
              <span className="font-mono text-slate-400">SSL 256-bit TLS 1.3</span>
            </div>
          </div>

          {/* Quick Features & Security Guarantees */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              {language === 'fa' ? 'امنیت و استانداردهای پرداخت الکترونیک' : 'Payment Security Standards'}
            </h3>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <span>دارای نماد اعتماد الکترونیکی (اینماد) و پروتکل رمزنگاری شاپرک</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <span>پشتیبانی از تمامی کارت‌های عضو شبکه بانکی شتاب کشور</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <span>صدور آنی فاکتور رسمی الکترونیک با کد رهگیری ۲۴ رقمی</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <span>پشتیبانی ۲۴ ساعته در ۷ روز هفته از طریق تیکت و شماره تماس</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
