import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  Store, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Sparkles, 
  Check, 
  Crown, 
  Scale, 
  ThumbsUp, 
  MessageSquarePlus, 
  Zap,
  Info
} from 'lucide-react';
import { Product, ProductColor, SellerOption } from '../types';
import { useShop } from '../context/ShopContext';
import { formatPrice, formatPercent, toPersianDigits } from '../utils/formatters';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
  const { 
    language, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    addToCompare, 
    isComparing, 
    showNotification 
  } = useShop();

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0] || { name: 'پیش‌فرض', nameEn: 'Default', hex: '#333', code: 'DEF' }
  );
  const [selectedSeller, setSelectedSeller] = useState<SellerOption>(product.defaultSeller);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'desc' | 'reviews' | 'sellers'>('desc');
  const [showAllSellers, setShowAllSellers] = useState(false);

  // Review submission state
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewsList, setReviewsList] = useState(product.reviews || []);

  const isFav = isInWishlist(product.id);
  const isCompared = isComparing(product.id);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      userName: 'کاربر دیجی‌کالا',
      rating: newReviewRating,
      date: 'لحظاتی پیش',
      title: newReviewTitle || 'نظر خریدار',
      comment: newReviewComment,
      positivePoints: [],
      negativePoints: [],
      likes: 0,
      verifiedPurchase: true,
      colorBought: selectedColor.name,
      sellerBought: selectedSeller.name
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewTitle('');
    setNewReviewComment('');
    showNotification(language === 'fa' ? 'نظر شما با موفقیت ثبت شد و پس از بررسی نمایش داده می‌شود.' : 'Your review was submitted successfully.');
  };

  const handleAddToCartAction = () => {
    addToCart(product, selectedColor, selectedSeller, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          {/* Category breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium truncate">
            <span>{language === 'fa' ? 'دیجی‌کالا' : 'Digikala'}</span>
            <span>/</span>
            <span className="text-[#ef4056] font-bold">{language === 'fa' ? product.categoryFa : product.category}</span>
            <span>/</span>
            <span className="truncate">{language === 'fa' ? product.brandFa : product.brand}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => addToCompare(product)}
              className={`p-2 rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer ${
                isCompared ? 'text-[#ef4056]' : 'text-neutral-500'
              }`}
              title="مقایسه این کالا"
            >
              <Scale className="w-5 h-5" />
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-2 rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer ${
                isFav ? 'text-[#ef4056] fill-[#ef4056]' : 'text-neutral-500'
              }`}
              title="افزودن به علاقه‌مندی‌ها"
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1 space-y-8">
          
          {/* Top Section: Gallery + Product Info + Buy Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* 1. Left Gallery (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              {/* Main Active Image */}
              <div className="w-full h-64 sm:h-80 bg-neutral-50 rounded-2xl p-4 flex items-center justify-center border border-neutral-100 overflow-hidden">
                <img
                  src={product.images[selectedImgIndex] || product.images[0]}
                  alt={product.titleFa}
                  className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIndex(idx)}
                      className={`w-16 h-16 rounded-xl p-1 bg-neutral-50 border-2 overflow-hidden shrink-0 cursor-pointer transition-all ${
                        idx === selectedImgIndex ? 'border-[#ef4056]' : 'border-transparent hover:border-neutral-300'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}

              {/* Digikala Guarantee Ribbon */}
              <div className="bg-neutral-50 rounded-2xl p-3 border border-neutral-100 space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2 font-bold text-neutral-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'fa' ? 'ضمانت اصل بودن و سلامت کالا' : 'Originality & Health Guarantee'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>{language === 'fa' ? 'امکان تحویل اکسپرس در سراسر کشور' : 'Express delivery nationwide'}</span>
                </div>
              </div>
            </div>

            {/* 2. Middle Specs & Variants (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Title & Brand */}
              <div>
                <span className="text-xs font-bold text-[#ef4056]">
                  {language === 'fa' ? product.brandFa : product.brand}
                </span>
                <h1 className="text-base sm:text-lg font-black text-neutral-900 leading-snug mt-1">
                  {language === 'fa' ? product.titleFa : product.titleEn}
                </h1>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  {product.titleEn}
                </p>
              </div>

              {/* Rating & Buyer Satisfaction */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600 pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{toPersianDigits(product.rating.toFixed(1))}</span>
                </div>
                <span className="text-neutral-400">
                  ({toPersianDigits(product.ratingCount)} {language === 'fa' ? 'امتیاز خریداران' : 'ratings'})
                </span>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                  ٪{toPersianDigits(product.satisfiedPercent)} {language === 'fa' ? 'رضایت از خرید' : 'satisfaction'}
                </span>
              </div>

              {/* Colors Variant Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-neutral-700 block">
                    {language === 'fa' ? 'انتخاب رنگ:' : 'Select Color:'} {language === 'fa' ? selectedColor.name : selectedColor.nameEn}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => {
                      const isSelected = selectedColor.code === color.code;
                      return (
                        <button
                          key={color.code}
                          onClick={() => setSelectedColor(color)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#ef4056] bg-red-50/50 text-[#ef4056] ring-2 ring-red-100'
                              : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full border border-neutral-300 shrink-0"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span>{language === 'fa' ? color.name : color.nameEn}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#ef4056]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Highlights Bullet points */}
              {product.highlights && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-bold text-neutral-800 block">
                    {language === 'fa' ? 'ویژگی‌های کلیدی:' : 'Key Highlights:'}
                  </span>
                  <ul className="space-y-1 text-xs text-neutral-600 list-disc list-inside">
                    {product.highlights.map((h, i) => (
                      <li key={i} className="leading-relaxed">
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* DigiPlus Cashback Banner */}
              {product.cashback && (
                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3 flex items-center justify-between text-xs text-purple-900">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-purple-600" />
                    <span>{language === 'fa' ? 'هدیه نقدی ویژه اعضای دیجی‌پلاس:' : 'DigiPlus Cashback:'}</span>
                  </div>
                  <span className="font-black text-purple-800">
                    {formatPrice(product.cashback, language)}
                  </span>
                </div>
              )}

            </div>

            {/* 3. Right Multi-Seller Buy Box (3 cols) */}
            <div className="lg:col-span-3">
              <div className="bg-neutral-50/80 rounded-3xl p-4 sm:p-5 border border-neutral-200 space-y-4 shadow-sm">
                
                {/* Active Seller Header */}
                <div className="space-y-2 pb-3 border-b border-neutral-200 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">{language === 'fa' ? 'فروشنده انتخابی:' : 'Seller:'}</span>
                    <span className="bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded-md text-[11px]">
                      ٪{toPersianDigits(selectedSeller.satisfiedPercent)} {language === 'fa' ? 'رضایت' : 'score'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
                    <Store className="w-4 h-4 text-neutral-600" />
                    <span className="truncate">{selectedSeller.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-neutral-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="truncate">{selectedSeller.warranty}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-blue-600">
                    <Truck className="w-3.5 h-3.5" />
                    <span className="truncate">{selectedSeller.deliveryTime}</span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="space-y-1 text-left">
                  {product.originalPrice && product.originalPrice > selectedSeller.price && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="bg-[#ef4056] text-white text-[10px] font-black px-1.5 py-0.2 rounded-md">
                        {formatPercent(product.discountPercent || 15, language)}
                      </span>
                      <span className="text-neutral-400 line-through">
                        {formatPrice(product.originalPrice, language)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-500">{language === 'fa' ? 'قیمت نهایی:' : 'Price:'}</span>
                    <span className="text-base sm:text-lg font-black text-neutral-900">
                      {formatPrice(selectedSeller.price, language)}
                    </span>
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center justify-between bg-white rounded-xl p-1.5 border border-neutral-200 text-xs">
                  <span className="text-neutral-600 px-2 font-bold">{language === 'fa' ? 'تعداد:' : 'Qty:'}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.min(selectedSeller.stock, quantity + 1))}
                      className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 flex items-center justify-center font-bold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-black text-sm min-w-[20px] text-center">
                      {toPersianDigits(quantity)}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 flex items-center justify-center font-bold cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  onClick={handleAddToCartAction}
                  className="w-full bg-[#ef4056] hover:bg-[#e6123d] text-white text-sm font-black py-3 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 transition-all cursor-pointer hover:scale-102"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{language === 'fa' ? 'افزودن به سبد خرید' : 'Add to Cart'}</span>
                </button>

                {/* Other Sellers Accordion Trigger */}
                {product.otherSellers && product.otherSellers.length > 0 && (
                  <button
                    onClick={() => setShowAllSellers(!showAllSellers)}
                    className="w-full text-xs font-bold text-[#ef4056] hover:bg-red-50 py-2 rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer border border-red-200"
                  >
                    <span>
                      {language === 'fa' 
                        ? `${toPersianDigits(product.otherSellers.length)} فروشنده دیگر این کالا`
                        : `${product.otherSellers.length} other sellers`}
                    </span>
                    {showAllSellers ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                )}

              </div>
            </div>

          </div>

          {/* Other Sellers Comparison Table (Expandable) */}
          {showAllSellers && product.otherSellers && (
            <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 space-y-3 animate-in fade-in duration-200">
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900 flex items-center gap-1.5">
                <Store className="w-4 h-4 text-[#ef4056]" />
                <span>{language === 'fa' ? 'سایر فروشندگان این کالا در دیجی‌کالا' : 'Other Sellers Comparison'}</span>
              </h3>

              <div className="space-y-2">
                {product.otherSellers.map((seller) => {
                  const isCur = selectedSeller.id === seller.id;
                  return (
                    <div
                      key={seller.id}
                      className={`bg-white rounded-xl p-3 border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                        isCur ? 'border-[#ef4056] bg-red-50/20' : 'border-neutral-200'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-neutral-900">{seller.name}</span>
                          <span className="bg-neutral-100 text-neutral-700 px-1.5 py-0.2 rounded-md text-[10px] font-bold">
                            ٪{toPersianDigits(seller.satisfiedPercent)} رضایت
                          </span>
                        </div>
                        <p className="text-neutral-500 text-[11px]">{seller.warranty} • {seller.deliveryTime}</p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <span className="font-black text-neutral-900 text-sm">
                          {formatPrice(seller.price, language)}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedSeller(seller);
                            showNotification(language === 'fa' ? `فروشنده تغییر یافت به «${seller.name}»` : `Seller changed to ${seller.name}`);
                          }}
                          className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                            isCur
                              ? 'bg-emerald-600 text-white'
                              : 'bg-neutral-100 hover:bg-[#ef4056] hover:text-white text-neutral-800'
                          }`}
                        >
                          {isCur ? (language === 'fa' ? 'انتخاب شده' : 'Selected') : (language === 'fa' ? 'خرید از این فروشنده' : 'Choose Seller')}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Tabs: Description, Specs, Reviews */}
          <div className="pt-4 border-t border-neutral-200">
            {/* Tabs Header */}
            <div className="flex items-center gap-2 sm:gap-4 border-b border-neutral-200 pb-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('desc')}
                className={`pb-2 px-3 text-xs sm:text-sm font-bold transition-all cursor-pointer relative ${
                  activeTab === 'desc' ? 'text-[#ef4056]' : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                <span>{language === 'fa' ? 'بررسی تخصصی و معرفی' : 'Overview & Description'}</span>
                {activeTab === 'desc' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ef4056] rounded-full" />}
              </button>

              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 px-3 text-xs sm:text-sm font-bold transition-all cursor-pointer relative ${
                  activeTab === 'specs' ? 'text-[#ef4056]' : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                <span>{language === 'fa' ? 'مشخصات فنی' : 'Technical Specifications'}</span>
                {activeTab === 'specs' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ef4056] rounded-full" />}
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 px-3 text-xs sm:text-sm font-bold transition-all cursor-pointer relative ${
                  activeTab === 'reviews' ? 'text-[#ef4056]' : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                <span>
                  {language === 'fa' ? `دیدگاه‌های خریداران (${toPersianDigits(reviewsList.length)})` : `Reviews (${reviewsList.length})`}
                </span>
                {activeTab === 'reviews' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ef4056] rounded-full" />}
              </button>
            </div>

            {/* Tab 1: Description */}
            {activeTab === 'desc' && (
              <div className="py-6 space-y-4">
                <h3 className="font-bold text-sm sm:text-base text-neutral-900">
                  {language === 'fa' ? 'معرفی جامع کالا' : 'Product Overview'}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed max-w-4xl">
                  {product.description}
                </p>
              </div>
            )}

            {/* Tab 2: Specs Matrix */}
            {activeTab === 'specs' && (
              <div className="py-6 space-y-6">
                <h3 className="font-bold text-sm sm:text-base text-neutral-900">
                  {language === 'fa' ? 'جدول مشخصات فنی کالا' : 'Technical Specifications'}
                </h3>

                <div className="space-y-4">
                  {Object.entries(product.specs || {}).map(([sectionTitle, entries], sIdx) => (
                    <div key={sIdx} className="space-y-2">
                      <h4 className="font-black text-xs text-neutral-800 bg-neutral-100 px-3 py-1.5 rounded-lg inline-block">
                        {sectionTitle}
                      </h4>
                      <div className="grid grid-cols-1 gap-2 pt-1">
                        {Object.entries(entries).map(([key, val], rIdx) => (
                          <div key={rIdx} className="grid grid-cols-12 text-xs py-2 px-3 rounded-lg hover:bg-neutral-50 border-b border-neutral-100">
                            <span className="col-span-4 font-bold text-neutral-500">{key}</span>
                            <span className="col-span-8 font-medium text-neutral-800">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Reviews & Add Review */}
            {activeTab === 'reviews' && (
              <div className="py-6 space-y-6">
                
                {/* Submit New Review Form */}
                <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 space-y-3">
                  <h4 className="font-bold text-xs sm:text-sm text-neutral-900 flex items-center gap-1.5">
                    <MessageSquarePlus className="w-4 h-4 text-[#ef4056]" />
                    <span>{language === 'fa' ? 'ثبت دیدگاه جدید برای این کالا' : 'Submit Review'}</span>
                  </h4>

                  <form onSubmit={handleAddReview} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-neutral-600 font-bold">{language === 'fa' ? 'امتیاز شما:' : 'Your Rating:'}</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewReviewRating(star)}
                            className="cursor-pointer"
                          >
                            <Star className={`w-5 h-5 ${star <= newReviewRating ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <input
                      type="text"
                      placeholder={language === 'fa' ? 'عنوان دیدگاه شما...' : 'Review title...'}
                      value={newReviewTitle}
                      onChange={(e) => setNewReviewTitle(e.target.value)}
                      className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-hidden focus:border-[#ef4056]"
                    />

                    <textarea
                      rows={3}
                      placeholder={language === 'fa' ? 'متن دیدگاه، نقاط قوت و ضعف کالا...' : 'Write your detailed review here...'}
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-hidden focus:border-[#ef4056]"
                    />

                    <button
                      type="submit"
                      className="bg-[#ef4056] text-white text-xs font-bold px-5 py-2 rounded-xl hover:bg-[#e6123d] transition-colors cursor-pointer shadow-xs"
                    >
                      {language === 'fa' ? 'ارسال دیدگاه' : 'Submit Review'}
                    </button>
                  </form>
                </div>

                {/* Reviews List */}
                <div className="space-y-3">
                  {reviewsList.length === 0 ? (
                    <p className="text-xs text-neutral-400 text-center py-6">
                      {language === 'fa' ? 'هنوز دیدگاهی برای این کالا ثبت نشده است. اولین دیدگاه را شما بنویسید!' : 'No reviews yet. Be the first to review!'}
                    </p>
                  ) : (
                    reviewsList.map((rev) => (
                      <div key={rev.id} className="bg-white rounded-2xl p-4 border border-neutral-100 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-neutral-900">{rev.userName}</span>
                            {rev.verifiedPurchase && (
                              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-1.5 py-0.2 rounded-md">
                                {language === 'fa' ? 'خریدار این کالا' : 'Verified Buyer'}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-neutral-400">{rev.date}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'}`} />
                          ))}
                          <span className="font-bold text-neutral-800 mr-2">{rev.title}</span>
                        </div>

                        <p className="text-neutral-700 leading-relaxed">{rev.comment}</p>

                        {rev.positivePoints && rev.positivePoints.length > 0 && (
                          <div className="space-y-1 pt-1">
                            {rev.positivePoints.map((p, idx) => (
                              <span key={idx} className="text-emerald-600 text-[11px] block font-medium">
                                + {p}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
