import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, ShoppingCart, ArrowLeft, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/mockData';
import { Product } from '../types';
import { formatPrice } from '../utils/formatters';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  suggestedProducts?: Product[];
}

export const AIAssistantModal: React.FC = () => {
  const { 
    language, 
    isAssistantOpen, 
    setIsAssistantOpen, 
    setSelectedProduct, 
    addToCart 
  } = useShop();

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: language === 'fa'
        ? 'سلام! من «دیجی‌دستیار» هوش مصنوعی دیجی‌کالا هستم. در پیدا کردن بهترین کالا، مقایسه مشخصات فنی و خرید متناسب با بودجه‌تان چطور می‌تونم کمکتون کنم؟'
        : 'Hello! I am your Digikala AI Shopping Assistant. How can I help you find the best products, compare specs, or match your budget today?',
      suggestedProducts: [PRODUCTS[0], PRODUCTS[1], PRODUCTS[2]]
    }
  ]);

  if (!isAssistantOpen) return null;

  const quickPrompts = [
    'بهترین سرخ‌کن بدون روغن برای خانواده ۵ نفره؟',
    'گوشی پرچمدار با بهترین دوربین و فیلمبرداری',
    'هدفون نویز کنسلینگ عالی برای سفر و کار',
    'پیشنهاد کادویی ارگانیک و اصیل ایرانی'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    // Generate intelligent AI Response tailored to Digikala catalog
    setTimeout(() => {
      let replyText = '';
      let recommended: Product[] = [];

      const query = text.toLowerCase();

      if (query.includes('سرخ') || query.includes('فیلیپس') || query.includes('آشپز') || query.includes('غذا')) {
        replyText = language === 'fa'
          ? 'برای سرخ‌کن بدون روغن، پیشنهاد من مدل پرفروش «فیلیپس HD9270» است. این مدل با گنجایش ۶.۲ لیتری برای ۵ تا ۶ نفر کاملاً ایده‌آل است، ۹۰٪ مصرف روغن را کاهش می‌دهد و قطعات آن در ماشین ظرفشویی قابل شستشو هستند.'
          : 'For air fryers, I strongly recommend the Philips HD9270 XL. It has a 6.2L capacity perfect for 5-6 people and cuts oil by 90%.';
        recommended = [PRODUCTS[1], PRODUCTS[3]];
      } else if (query.includes('آیفون') || query.includes('موبایل') || query.includes('گوشی') || query.includes('دوربین') || query.includes('phone')) {
        replyText = language === 'fa'
          ? 'اگر به دنبال برترین پرچمدار با کیفیت فیلمبرداری سینماتیک 4K 120fps و باتری فوق‌العاده هستید، «آیفون ۱۶ پرو مکس» با چیپست A18 Pro و بدنه تیتانیوم گرید ۵ انتخاب اول است. همچنین دارای رجیستری رسمی شرکتی و گارانتی ۱۸ ماهه در دیجی‌کالا می‌باشد.'
          : 'For flagship smartphones with the highest camera benchmarks, iPhone 16 Pro Max is unmatched with A18 Pro chip and Titanium build.';
        recommended = [PRODUCTS[0], PRODUCTS[8]];
      } else if (query.includes('هدفون') || query.includes('صدا') || query.includes('موزیک') || query.includes('سونی') || query.includes('headphone')) {
        replyText = language === 'fa'
          ? 'هدفون «سونی WH-1000XM5» برترین سیستم حذف نویز جهان (Industry-Leading ANC) را دارد و با ۳۰ ساعت شارژدهی مداوم و پدهای ارگونومیک، بهترین تجربه شنیداری و مکالمه شفاف را رقم می‌زند.'
          : 'The Sony WH-1000XM5 headphones offer the world-leading active noise cancellation with 30-hour battery life.';
        recommended = [PRODUCTS[2]];
      } else if (query.includes('کادو') || query.includes('هدیه') || query.includes('سوغات') || query.includes('زعفران')) {
        replyText = language === 'fa'
          ? 'برای هدیه و سوغات اصیل ایرانی، «بسته ۵ گرمی زعفران سوپر نگین زروند با جعبه خاتم سنتی و هاون برنجی» با ۲۵٪ تخفیف شگفت‌انگیز و ارسال جت گزینه‌ای بسیار چشم‌نواز و ارزشمند است.'
          : 'For an authentic Persian gift, the Zarvand Super Negin Saffron in a traditional Khatam gift box with brass mortar is a top recommendation.';
        recommended = [PRODUCTS[4], PRODUCTS[5]];
      } else {
        replyText = language === 'fa'
          ? `بر اساس پرسش شما، این کالاهای منتخب با بالاترین امتیاز خریداران و گارانتی اصالت دیجی‌کالا را به شما پیشنهاد می‌کنم:`
          : 'Based on your request, here are top-rated products with guaranteed warranty:';
        recommended = PRODUCTS.slice(0, 3);
      }

      const aiMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: replyText,
        suggestedProducts: recommended
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[85vh] animate-in zoom-in-95 duration-200 border border-neutral-200">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <Bot className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm sm:text-base">
                  {language === 'fa' ? 'دیجی‌دستیار هوشمند (DigiAI Advisor)' : 'Digikala Smart AI Advisor'}
                </h3>
                <span className="bg-amber-400 text-purple-950 text-[10px] font-black px-1.5 py-0.2 rounded-md">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-purple-200">
                {language === 'fa' ? 'راهنمای هوشمند خرید، مقایسه قیمت و مشخصات کالاها' : 'Smart shopping advisor & specs comparisons'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAssistantOpen(false)}
            className="p-1.5 rounded-xl hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                msg.sender === 'user' ? 'bg-[#ef4056] text-white' : 'bg-purple-700 text-white'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className="space-y-3 max-w-[82%]">
                <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#ef4056] text-white rounded-tr-xs'
                    : 'bg-white border border-neutral-200 text-neutral-800 shadow-2xs rounded-tl-xs'
                }`}>
                  {msg.text}
                </div>

                {/* Suggested Products Cards in Chat */}
                {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                  <div className="space-y-2 pt-1">
                    {msg.suggestedProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setSelectedProduct(p);
                          setIsAssistantOpen(false);
                        }}
                        className="bg-white rounded-2xl p-2.5 border border-neutral-200 hover:border-[#ef4056] flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <img src={p.images[0]} alt="" className="w-12 h-12 object-contain bg-neutral-50 rounded-xl p-1 shrink-0" />
                          <div>
                            <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">
                              {language === 'fa' ? p.titleFa : p.titleEn}
                            </h4>
                            <span className="text-xs font-black text-[#ef4056]">
                              {formatPrice(p.price, language)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(p);
                          }}
                          className="bg-red-50 hover:bg-[#ef4056] text-[#ef4056] hover:text-white p-2 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0"
                          title="افزودن به سبد"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Prompts */}
        <div className="p-2.5 bg-white border-t border-neutral-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(qp)}
              className="bg-purple-50 hover:bg-purple-100 text-purple-800 text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap transition-colors cursor-pointer"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Chat Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder={language === 'fa' ? 'هر سوالی درباره کالاها و خرید از دیجی‌کالا دارید بپرسید...' : 'Ask any shopping or product questions...'}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 bg-neutral-100 rounded-xl px-4 py-2.5 text-xs text-neutral-800 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="bg-purple-700 hover:bg-purple-800 text-white p-2.5 rounded-xl transition-colors cursor-pointer shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
