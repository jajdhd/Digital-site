import React, { useState } from 'react';
import { 
  Code2, 
  Copy, 
  ExternalLink, 
  Check, 
  Terminal, 
  ShieldCheck, 
  Globe, 
  ArrowLeft,
  BookOpen
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const DevDocsView: React.FC = () => {
  const { language, setActiveView, showNotification } = useShop();
  const [activeTab, setActiveTab] = useState<'flow' | 'nodejs' | 'curl'>('flow');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    showNotification(language === 'fa' ? 'کد با موفقیت کپی شد!' : 'Code copied to clipboard!');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const nodejsCode = `// Zarinpal v4 Payment Integration (Node.js / Express)
import axios from 'axios';

const ZARINPAL_REQUEST_URL = 'https://sandbox.zarinpal.com/pg/v4/payment/request.json';
const ZARINPAL_VERIFY_URL = 'https://sandbox.zarinpal.com/pg/v4/payment/verify.json';
const MERCHANT_ID = '12345678-1234-1234-1234-123456789012'; // Or your real 36-char ID

// 1. Request Step: Generate Authority
export async function requestPayment(amountTomans, userPhone, userEmail, callbackUrl) {
  const response = await axios.post(ZARINPAL_REQUEST_URL, {
    merchant_id: MERCHANT_ID,
    amount: amountTomans, // IRT
    currency: 'IRT',
    description: 'خرید از فروشگاه آنلاین هورا',
    callback_url: callbackUrl,
    metadata: {
      mobile: userPhone,
      email: userEmail
    }
  });

  const { data, errors } = response.data;
  if (data && (data.code === 100 || data.code === 200)) {
    // 2. Redirect URL:
    const paymentUrl = \`https://sandbox.zarinpal.com/pg/StartPay/\${data.authority}\`;
    return { authority: data.authority, paymentUrl };
  }
  throw new Error(errors?.message || 'Payment initiation failed');
}

// 3. Verification Step: After user returns to callback_url?Authority=...&Status=OK
export async function verifyPayment(authority, amountTomans) {
  const response = await axios.post(ZARINPAL_VERIFY_URL, {
    merchant_id: MERCHANT_ID,
    amount: amountTomans,
    authority: authority
  });

  const { data, errors } = response.data;
  if (data && (data.code === 100 || data.code === 101)) {
    return {
      success: true,
      refId: data.ref_id,
      cardPan: data.card_pan,
      cardHash: data.card_hash,
      message: 'پرداخت با موفقیت تأیید شد'
    };
  }
  return { success: false, code: data?.code, message: errors?.message };
}`;

  const curlCode = `# Step 1: Request Payment Token (Authority)
curl -X POST https://sandbox.zarinpal.com/pg/v4/payment/request.json \\
  -H "Content-Type: application/json" \\
  -d '{
    "merchant_id": "12345678-1234-1234-1234-123456789012",
    "amount": 50000,
    "currency": "IRT",
    "description": "خرید آنلاین محصول تست",
    "callback_url": "https://yoursite.ir/verify",
    "metadata": { "mobile": "09123456789" }
  }'

# Step 2: Customer is redirected to:
# https://sandbox.zarinpal.com/pg/StartPay/{authority}

# Step 3: Verify Payment (Upon return with ?Authority=...&Status=OK)
curl -X POST https://sandbox.zarinpal.com/pg/v4/payment/verify.json \\
  -H "Content-Type: application/json" \\
  -d '{
    "merchant_id": "12345678-1234-1234-1234-123456789012",
    "amount": 50000,
    "authority": "A00000000000000000000000000000000000"
  }'`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-slate-900 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-extrabold text-xl text-slate-900">
              {language === 'fa' ? 'مستندات و راهنمای فنی API درگاه زرین‌پال v4' : 'Zarinpal v4 Payment API Documentation'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {language === 'fa' ? 'راهنمای مرحله‌به‌مرحله اتصال درگاه شاپرک با نمونه کدهای آماده' : 'Step-by-step developer integration guide & code snippets'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveView('shop')}
          className="bg-white hover:bg-slate-50 text-xs text-slate-700 font-bold px-4 py-2 rounded-xl border border-slate-200 shadow-xs cursor-pointer"
        >
          {language === 'fa' ? 'بازگشت به فروشگاه' : 'Shop'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('flow')}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
            activeTab === 'flow' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {language === 'fa' ? '۱. چرخه پرداخت (Flow)' : '1. Payment Architecture'}
        </button>
        <button
          onClick={() => setActiveTab('nodejs')}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
            activeTab === 'nodejs' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Node.js / Express
        </button>
        <button
          onClick={() => setActiveTab('curl')}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
            activeTab === 'curl' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          cURL / HTTP Requests
        </button>
      </div>

      {/* Tab 1: Flow Architecture */}
      {activeTab === 'flow' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <h3 className="font-extrabold text-base text-slate-900">
            {language === 'fa' ? 'مراحل چهارگانه پرداخت آنلاین درگاه زرین‌پال' : '4-Step Zarinpal Gateway Payment Lifecycle'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">۱</span>
                <span>درخواست پرداخت (Request)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                ارسال مبلغ سفارش، کد مرچنت، آدرس بازگشت (Callback URL) و توضیحات به اندپوینت <code className="text-emerald-800 font-bold bg-emerald-100 px-1 py-0.5 rounded">/pg/v4/payment/request.json</code> و دریافت شناسه Authority.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-orange-600 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-black">۲</span>
                <span>هدایت خریدار به شاپرک (StartPay)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                هدایت کاربر به آدرس <code className="text-orange-600 font-bold bg-orange-100 px-1 py-0.5 rounded">https://sandbox.zarinpal.com/pg/StartPay/{'{authority}'}</code> برای ورود مشخصات کارت شتاب و رمز پویا.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-black">۳</span>
                <span>بازگشت به سایت (Callback)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                پس از انجام تراکنش در شاپرک، کاربر به آدرس شما به همراه پارامترهای <code className="text-slate-800 font-bold bg-slate-200 px-1 py-0.5 rounded">?Authority=...&Status=OK</code> بازگردانده می‌شود.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-black">۴</span>
                <span>اعتبارسنجی نهایی (Verify)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                ارسال Authority و مبلغ به <code className="text-emerald-800 font-bold bg-emerald-100 px-1 py-0.5 rounded">/pg/v4/payment/verify.json</code>. در صورت دریافت کد ۱۰۰ یا ۱۰۱، شماره پیگیری (Ref ID) صادر و سفارش قطعی می‌شود.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Tab 2: Node.js */}
      {activeTab === 'nodejs' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-800 font-bold">zarinpal-service.ts</span>
            <button
              onClick={() => handleCopyCode(nodejsCode, 'nodejs')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 flex items-center gap-1.5 cursor-pointer"
            >
              {copiedKey === 'nodejs' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'nodejs' ? 'کپی شد' : 'کپی کد'}</span>
            </button>
          </div>
          <pre className="bg-slate-950 text-slate-100 p-4 rounded-2xl text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed" dir="ltr">
            {nodejsCode}
          </pre>
        </div>
      )}

      {/* Tab 3: cURL */}
      {activeTab === 'curl' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-orange-600 font-bold">curl-requests.sh</span>
            <button
              onClick={() => handleCopyCode(curlCode, 'curl')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 flex items-center gap-1.5 cursor-pointer"
            >
              {copiedKey === 'curl' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'curl' ? 'کپی شد' : 'کپی کد'}</span>
            </button>
          </div>
          <pre className="bg-slate-950 text-slate-100 p-4 rounded-2xl text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed" dir="ltr">
            {curlCode}
          </pre>
        </div>
      )}

    </div>
  );
};
