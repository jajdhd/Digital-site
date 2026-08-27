import React from 'react';
import { Heart, Star, Zap, Crown, ShoppingCart, Scale } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { formatPrice, formatPercent, toPersianDigits } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'shegeftangiz';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'default' }) => {
  const { 
    language, 
    setSelectedProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    addToCompare, 
    isComparing 
  } = useShop();

  const isFav = isInWishlist(product.id);
  const isCompared = isComparing(product.id);

  return (
    <div 
      onClick={() => setSelectedProduct(product)}
      className="bg-white rounded-2xl p-3 sm:p-4 border border-neutral-100 hover:border-neutral-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between cursor-pointer group relative overflow-hidden h-full"
    >
      {/* Top Badges & Actions */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-1">
          {product.isShegeftangiz && (
            <span className="bg-[#ef4056] text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-2xs">
              {language === 'fa' ? 'شگفت‌انگیز' : 'Special Deal'}
            </span>
          )}
          {product.isJet && (
            <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
              <Zap className="w-2.5 h-2.5" />
              {language === 'fa' ? 'جت' : 'Jet'}
            </span>
          )}
        </div>

        {/* Favorite & Compare Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCompare(product);
            }}
            className={`p-1.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer ${
              isCompared ? 'text-[#ef4056]' : 'text-neutral-300 hover:text-neutral-600'
            }`}
            title="افزودن به مقایسه"
          >
            <Scale className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-1.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer ${
              isFav ? 'text-[#ef4056] fill-[#ef4056]' : 'text-neutral-300 hover:text-neutral-600'
            }`}
            title="افزودن به علاقه‌مندی‌ها"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Product Image */}
      <div className="my-3 relative flex items-center justify-center h-40 sm:h-48 overflow-hidden rounded-xl bg-neutral-50/50">
        <img
          src={product.images[0]}
          alt={product.titleFa}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Colors Preview Dots */}
        {product.colors && product.colors.length > 1 && (
          <div className="absolute bottom-1 right-2 flex items-center gap-1 bg-white/80 backdrop-blur-xs px-1.5 py-0.5 rounded-full shadow-2xs">
            {product.colors.slice(0, 4).map((c, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full border border-neutral-300"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Title & Brand */}
      <div className="space-y-1.5 flex-1">
        <span className="text-[11px] font-semibold text-neutral-400">
          {language === 'fa' ? product.brandFa : product.brand}
        </span>
        <h3 className="text-xs sm:text-sm font-bold text-neutral-800 line-clamp-2 leading-snug group-hover:text-[#ef4056] transition-colors">
          {language === 'fa' ? product.titleFa : product.titleEn}
        </h3>
      </div>

      {/* Stock & Rating */}
      <div className="pt-2 mt-2 border-t border-neutral-50 flex items-center justify-between text-[11px] text-neutral-500">
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="font-bold text-neutral-700">
            {toPersianDigits(product.rating.toFixed(1))}
          </span>
          <span className="text-neutral-400">({toPersianDigits(product.ratingCount)})</span>
        </div>

        {product.stock <= 5 ? (
          <span className="text-red-500 text-[10px] font-bold">
            {language === 'fa' ? `تنها ${toPersianDigits(product.stock)} عدد در انبار` : `Only ${product.stock} left`}
          </span>
        ) : (
          <span className="text-emerald-600 text-[10px] font-semibold">
            {language === 'fa' ? 'موجود در انبار' : 'In Stock'}
          </span>
        )}
      </div>

      {/* Price & Discount Section */}
      <div className="pt-2 flex items-center justify-between">
        {/* Discount Badge */}
        {product.discountPercent ? (
          <span className="bg-[#ef4056] text-white text-xs font-black px-2 py-0.5 rounded-full">
            {formatPercent(product.discountPercent, language)}
          </span>
        ) : (
          <div></div>
        )}

        {/* Prices */}
        <div className="text-left flex flex-col items-end">
          {product.originalPrice && (
            <span className="text-xs text-neutral-400 line-through">
              {formatPrice(product.originalPrice, language)}
            </span>
          )}
          <span className="text-sm sm:text-base font-black text-neutral-900">
            {formatPrice(product.price, language)}
          </span>
        </div>
      </div>

      {/* Quick Add Button */}
      <div className="pt-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="w-full bg-neutral-100 hover:bg-[#ef4056] text-neutral-700 hover:text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>{language === 'fa' ? 'افزودن به سبد' : 'Add to Cart'}</span>
        </button>
      </div>

    </div>
  );
};
