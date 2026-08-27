import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Star, 
  Eye, 
  Check, 
  Heart,
  Layers,
  Calculator,
  ShieldCheck
} from 'lucide-react';
import { Product, ProductColor } from '../types';
import { useShop } from '../context/ShopContext';
import { formatPrice, toPersianDigits } from '../utils/formatters';
import { InstallmentModal } from './InstallmentModal';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    language, 
    addToCart, 
    setSelectedProductDetail, 
    wishlist, 
    toggleWishlist, 
    addToComparison,
    comparisonList 
  } = useShop();

  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0] : undefined
  );
  const [isInstallmentOpen, setIsInstallmentOpen] = useState(false);

  const isFavorite = wishlist.includes(product.id);
  const isInCompare = comparisonList.some((p) => p.id === product.id);

  // SnappPay 4-month installment per month
  const monthlySnapp = Math.round(product.priceTomans / 4);

  return (
    <div className="group bg-white hover:bg-slate-50/50 border border-slate-200/90 hover:border-emerald-400/80 rounded-3xl p-4 transition-all duration-300 flex flex-col justify-between relative shadow-xs hover:shadow-xl hover:shadow-emerald-950/5">
      
      {/* Top Bar: Badges & Wishlist / Compare Quick Actions */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {product.badge ? (
            <span className="bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-xl">
              {product.badge}
            </span>
          ) : (
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {product.brand}
            </span>
          )}

          {product.discountPercent && product.discountPercent > 0 && (
            <span className="bg-orange-500 text-white font-black text-[11px] px-2 py-0.5 rounded-lg shadow-xs">
              {language === 'fa' ? `${toPersianDigits(product.discountPercent)}٪ تخفیف` : `${product.discountPercent}% OFF`}
            </span>
          )}
        </div>

        {/* Action icons: Wishlist & Compare */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => addToComparison(product)}
            className={`p-1.5 rounded-xl border transition ${
              isInCompare 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-emerald-600 hover:bg-slate-100'
            }`}
            title={language === 'fa' ? 'افزودن به لیست مقایسه' : 'Add to Compare'}
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`p-1.5 rounded-xl border transition ${
              isFavorite 
                ? 'bg-rose-50 text-rose-600 border-rose-200' 
                : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-rose-500 hover:bg-slate-100'
            }`}
            title={language === 'fa' ? 'افزودن به علاقه‌مندی‌ها' : 'Add to Wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Product Image Stage with Quick View overlay */}
      <div className="relative h-48 sm:h-52 rounded-2xl overflow-hidden bg-slate-50 mb-3 p-2 flex items-center justify-center border border-slate-100 group-hover:bg-white transition-colors">
        <img
          src={product.image}
          alt={product.titleFa}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Quick View Button */}
        <button
          onClick={() => setSelectedProductDetail(product)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 hover:bg-emerald-600 text-slate-800 hover:text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-sm shadow-md"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{language === 'fa' ? 'مشاهده جزئیات' : 'Quick View'}</span>
        </button>
      </div>

      {/* Color Swatches */}
      {product.colors && product.colors.length > 0 && (
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-[10px] text-slate-500 font-semibold">
            {language === 'fa' ? 'رنگ:' : 'Color:'}
          </span>
          <div className="flex items-center gap-1">
            {product.colors.map((color) => {
              const isSelected = selectedColor?.hex === color.hex;
              return (
                <button
                  key={color.hex}
                  onClick={() => setSelectedColor(color)}
                  title={language === 'fa' ? color.nameFa : color.nameEn}
                  className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                    isSelected ? 'ring-2 ring-emerald-500 ring-offset-1 ring-offset-white border-slate-900' : 'border-slate-300 opacity-75 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  {isSelected && <Check className="w-2 h-2 text-white mix-blend-difference" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Product Titles & Ratings */}
      <div className="space-y-1 mb-3 flex-1">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="text-[11px] text-slate-600 font-bold">{product.brand}</span>
          <div className="flex items-center gap-1 text-amber-500 font-bold text-[11px]">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{language === 'fa' ? toPersianDigits(product.rating) : product.rating}</span>
            <span className="text-slate-400 font-normal text-[10px]">
              ({language === 'fa' ? toPersianDigits(product.reviewCount) : product.reviewCount})
            </span>
          </div>
        </div>

        <h3 
          onClick={() => setSelectedProductDetail(product)}
          className="font-extrabold text-xs sm:text-sm text-slate-900 hover:text-emerald-600 transition-colors line-clamp-2 cursor-pointer leading-snug"
        >
          {language === 'fa' ? product.titleFa : product.titleEn}
        </h3>

        {/* Installment tag */}
        <button
          onClick={() => setIsInstallmentOpen(true)}
          className="w-full text-right py-1 px-2 rounded-lg bg-orange-50/70 hover:bg-orange-100/80 border border-orange-200/50 text-[10px] font-bold text-orange-800 flex items-center justify-between transition mt-1"
        >
          <span className="flex items-center gap-1">
            <Calculator className="w-3 h-3 text-orange-600" />
            <span>{language === 'fa' ? `قسطی از ماهانه ${formatPrice(monthlySnapp, true)}` : `From ${formatPrice(monthlySnapp, false)}/mo`}</span>
          </span>
          <span className="text-[9px] text-orange-600">۴ ماهه ۰٪</span>
        </button>
      </div>

      {/* Price & Action Button */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          {product.originalPriceTomans && (
            <span className="text-[10px] sm:text-[11px] text-slate-400 line-through block font-mono">
              {formatPrice(product.originalPriceTomans, language === 'fa')}
            </span>
          )}
          <span className="font-black text-xs sm:text-sm text-orange-600 font-mono">
            {formatPrice(product.priceTomans, language === 'fa')}
          </span>
        </div>

        <button
          onClick={() => addToCart(product, 1, selectedColor)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs p-2.5 sm:px-3 sm:py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-sm shadow-emerald-600/20"
          title={language === 'fa' ? 'افزودن به سبد خرید' : 'Add to Cart'}
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="hidden sm:inline">
            {language === 'fa' ? 'خرید' : 'Add'}
          </span>
        </button>
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

