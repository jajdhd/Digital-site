import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  CreditCard,
  Zap,
  Info,
  Heart,
  Layers,
  Calculator,
  MessageSquarePlus,
  UserCheck,
  Send
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductColor } from '../types';
import { formatPrice, toPersianDigits } from '../utils/formatters';
import { InstallmentModal } from './InstallmentModal';

export const ProductDetailModal: React.FC = () => {
  const { 
    language, 
    selectedProductDetail, 
    setSelectedProductDetail, 
    addToCart,
    setIsCartDrawerOpen,
    wishlist,
    toggleWishlist,
    addToComparison,
    comparisonList,
    addProductReview,
    currentUser,
    showNotification
  } = useShop();

  if (!selectedProductDetail) return null;

  const product = selectedProductDetail;
  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [isInstallmentOpen, setIsInstallmentOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs');

  // Review form state
  const [reviewAuthor, setReviewAuthor] = useState(currentUser?.fullName || '');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const isFavorite = wishlist.includes(product.id);
  const isInCompare = comparisonList.some((p) => p.id === product.id);

  const handleAddToCartAndCheckout = () => {
    addToCart(product, quantity, selectedColor);
    setSelectedProductDetail(null);
    setIsCartDrawerOpen(true);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      showNotification(language === 'fa' ? 'لطفاً متن دیدگاه خود را بنویسید.' : 'Please enter your review.', 'error');
      return;
    }
    addProductReview(product.id, {
      author: reviewAuthor || (language === 'fa' ? 'خریدار محترم' : 'Customer'),
      rating: reviewRating,
      comment: reviewComment
    });
    setReviewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto no-scrollbar shadow-2xl relative text-slate-900">
        
        {/* Top Control Bar: Close, Wishlist, Compare */}
        <div className="sticky top-0 z-30 px-6 py-4 bg-white/95 backdrop-blur-md border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-2 rounded-xl border transition flex items-center gap-1.5 text-xs font-bold ${
                isFavorite 
                  ? 'bg-rose-50 text-rose-600 border-rose-200' 
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{isFavorite ? (language === 'fa' ? 'در علاقه‌مندی‌ها' : 'Wishlisted') : (language === 'fa' ? 'علاقه‌مندی' : 'Wishlist')}</span>
            </button>

            <button
              onClick={() => addToComparison(product)}
              className={`p-2 rounded-xl border transition flex items-center gap-1.5 text-xs font-bold ${
                isInCompare 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>{isInCompare ? (language === 'fa' ? 'در لیست مقایسه' : 'In Compare') : (language === 'fa' ? 'مقایسه فنی' : 'Compare')}</span>
            </button>
          </div>

          <button
            onClick={() => setSelectedProductDetail(null)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors border border-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Gallery & Trust */}
          <div className="md:col-span-5 space-y-4">
            <div className="h-64 sm:h-80 bg-slate-50 rounded-2xl p-4 flex items-center justify-center border border-slate-100 overflow-hidden">
              <img
                src={selectedImage}
                alt={product.titleFa}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Gallery thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`w-16 h-16 rounded-xl bg-slate-50 p-1 border cursor-pointer transition-all ${
                      selectedImage === imgUrl ? 'border-emerald-600 ring-2 ring-emerald-500/20' : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-contain rounded-lg" />
                  </button>
                ))}
              </div>
            )}

            {/* Installment BNPL Banner */}
            <div 
              onClick={() => setIsInstallmentOpen(true)}
              className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/80 cursor-pointer hover:border-orange-300 transition space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-orange-950 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-orange-600" />
                  <span>طرح خرید اقساطی رستم شاپ</span>
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-orange-500 text-white">
                  اسنپ‌پی ۴ ماهه ۰٪
                </span>
              </div>
              <p className="text-[11px] text-orange-800 leading-snug">
                امکان پرداخت در ۴ قسط بدون کارمزد، بدون ضامن و بدون چک. برای مشاهده جزئیات کلیک کنید.
              </p>
            </div>

            {/* Trust highlights */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{language === 'fa' ? 'گارانتی ۱۸ ماهه رسمی و ضمانت اصالت کالا' : '18-Month Official Warranty'}</span>
              </div>
              <div className="flex items-center gap-2 text-orange-600 font-bold">
                <Truck className="w-4 h-4 text-orange-500" />
                <span>{language === 'fa' ? 'ارسال اکسپرس رایگان با پست پیشتاز یا پیک فوری' : 'Free Express Nationwide Delivery'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <span>{language === 'fa' ? 'پشتیبانی از پروتکل v4 زرین‌پال و شاپرک' : 'Zarinpal PG & Shaparak Support'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Specs, Reviews, Options, Pricing */}
          <div className="md:col-span-7 space-y-5">
            
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                <span className="font-bold text-emerald-700 uppercase bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200/60">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{language === 'fa' ? toPersianDigits(product.rating) : product.rating}</span>
                  <span className="text-slate-400 text-xs font-normal">
                    ({language === 'fa' ? toPersianDigits(product.reviewCount) : product.reviewCount} دیدگاه)
                  </span>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                {language === 'fa' ? product.titleFa : product.titleEn}
              </h2>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              {language === 'fa' ? product.descriptionFa : product.descriptionEn}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block">
                  {language === 'fa' ? 'انتخاب رنگ:' : 'Select Color:'}{' '}
                  <span className="text-emerald-700 font-normal">
                    {language === 'fa' ? selectedColor?.nameFa : selectedColor?.nameEn}
                  </span>
                </span>
                <div className="flex items-center gap-2">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor?.hex === color.hex;
                    return (
                      <button
                        key={color.hex}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-2 cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600' 
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-300" style={{ backgroundColor: color.hex }}></span>
                        <span>{language === 'fa' ? color.nameFa : color.nameEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tabs: Specs vs Reviews */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                    activeTab === 'specs'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {language === 'fa' ? 'مشخصات فنی' : 'Specs'}
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
                    activeTab === 'reviews'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{language === 'fa' ? 'دیدگاه‌ها و نظرات' : 'Reviews'}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'reviews' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    {toPersianDigits(product.reviews?.length || 0)}
                  </span>
                </button>
              </div>

              {activeTab === 'specs' ? (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden text-xs">
                  {Object.entries(language === 'fa' ? product.specsFa : product.specsEn).map(([key, val], i) => (
                    <div key={key} className={`flex items-start justify-between p-2.5 ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                      <span className="text-slate-500 font-medium shrink-0 ml-4">{key}</span>
                      <span className="text-slate-900 text-left font-sans font-bold">{val}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 max-h-60 overflow-y-auto no-scrollbar pr-1">
                  {/* Reviews List */}
                  {product.reviews && product.reviews.length > 0 ? (
                    <div className="space-y-2.5">
                      {product.reviews.map((rev) => (
                        <div key={rev.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-800">{rev.author}</span>
                              {rev.verifiedBuyer && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md font-semibold">
                                  <UserCheck className="w-3 h-3 text-emerald-600" />
                                  <span>خریدار تایید شده</span>
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-amber-500 font-bold text-[11px]">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span>{toPersianDigits(rev.rating)}</span>
                            </div>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-xs text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      هنوز دیدگاهی برای این کالا ثبت نشده است. اولین نفری باشید که نظر می‌دهد!
                    </div>
                  )}

                  {/* Add Review Form */}
                  <form onSubmit={handleReviewSubmit} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <span className="text-xs font-bold text-slate-800 block">ثبت دیدگاه جدید:</span>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">امتیاز شما:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setReviewRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 text-amber-400 hover:scale-110 transition"
                          >
                            <Star className={`w-4 h-4 ${(hoverRating || reviewRating) >= star ? 'fill-amber-400' : 'text-slate-300'}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={reviewAuthor}
                        onChange={(e) => setReviewAuthor(e.target.value)}
                        placeholder="نام شما"
                        className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                      />
                      <input
                        type="text"
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="دیدگاه و تجربه استفاده..."
                        required
                        className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>ارسال دیدگاه</span>
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Price, Quantity & Purchase */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block font-medium">
                    {language === 'fa' ? 'قیمت نهایی با تخفیف:' : 'Final Price:'}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-black text-orange-600 font-mono">
                      {formatPrice(product.priceTomans, language === 'fa')}
                    </span>
                    {product.originalPriceTomans && (
                      <span className="text-xs text-slate-400 line-through font-mono">
                        {formatPrice(product.originalPriceTomans, language === 'fa')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center cursor-pointer shadow-xs"
                  >
                    -
                  </button>
                  <span className="px-2 font-mono font-bold text-sm text-slate-900">
                    {language === 'fa' ? toPersianDigits(quantity) : quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center cursor-pointer shadow-xs"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    addToCart(product, quantity, selectedColor);
                    setSelectedProductDetail(null);
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm py-3 rounded-2xl border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-slate-600" />
                  <span>{language === 'fa' ? 'افزودن به سبد خرید' : 'Add to Cart'}</span>
                </button>

                <button
                  onClick={handleAddToCartAndCheckout}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm py-3 rounded-2xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>{language === 'fa' ? 'خرید مستقیم و پرداخت' : 'Instant Checkout'}</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Installment Modal */}
      <InstallmentModal
        product={product}
        isOpen={isInstallmentOpen}
        onClose={() => setIsInstallmentOpen(false)}
      />

    </div>
  );
};

