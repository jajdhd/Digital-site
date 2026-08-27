import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Layers, 
  Zap, 
  ExternalLink,
  Plus
} from 'lucide-react';
import { formatPrice, toPersianDigits } from '../utils/formatters';

export const CompareModal: React.FC = () => {
  const { 
    language, 
    comparisonList, 
    removeFromComparison, 
    clearComparison, 
    isComparisonModalOpen, 
    setIsComparisonModalOpen,
    addToCart,
    setSelectedProductDetail,
    products,
    addToComparison
  } = useShop();

  if (!isComparisonModalOpen) return null;

  // Extract all unique spec keys across compared products
  const allSpecKeys: string[] = Array.from(
    new Set(
      comparisonList.flatMap((p) => {
        const specs = language === 'fa' ? p.specsFa : p.specsEn;
        return specs ? Object.keys(specs) : [];
      })
    )
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">
                {language === 'fa' ? 'مقایسه هوشمند محصولات در رستم شاپ' : 'Product Comparison - Rostam Shop'}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'fa' 
                  ? `مقایسه مشخصات فنی، قیمت و ویژگی‌های ${toPersianDigits(comparisonList.length)} کالا`
                  : `Comparing specs, prices, and features of ${comparisonList.length} items`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {comparisonList.length > 0 && (
              <button
                onClick={clearComparison}
                className="px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{language === 'fa' ? 'پاک کردن همه' : 'Clear All'}</span>
              </button>
            )}
            <button
              onClick={() => setIsComparisonModalOpen(false)}
              className="w-9 h-9 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {comparisonList.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Layers className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">
                {language === 'fa' ? 'کالایی برای مقایسه انتخاب نشده است' : 'No products in comparison list'}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {language === 'fa' 
                  ? 'برای مقایسه دقیق‌تر، روی آیکون مقایسه در کارت هر محصول کلیک کنید تا جدول مشخصات کنار هم قرار گیرد.'
                  : 'Click the comparison icon on any product card to compare specs side by side.'}
              </p>

              <div className="pt-4 flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                <span className="text-xs font-semibold text-slate-600 w-full mb-1">
                  {language === 'fa' ? 'پیشنهاد برای شروع مقایسه:' : 'Suggested items to compare:'}
                </span>
                {products.slice(0, 3).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => addToComparison(p)}
                    className="px-3 py-1.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1.5 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{p.titleFa}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="p-4 w-44 font-bold text-xs text-slate-400 bg-slate-50/80 rounded-tr-2xl">
                      {language === 'fa' ? 'ویژگی / محصول' : 'Feature / Product'}
                    </th>
                    {comparisonList.map((product) => (
                      <th key={product.id} className="p-4 min-w-[220px] max-w-[260px] align-top relative">
                        <button
                          onClick={() => removeFromComparison(product.id)}
                          className="absolute top-2 left-2 p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition"
                          title={language === 'fa' ? 'حذف از مقایسه' : 'Remove'}
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="flex flex-col items-center text-center space-y-3">
                          <div className="w-28 h-28 p-2 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                            <img
                              src={product.image}
                              alt={product.titleFa}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                              {product.brand}
                            </span>
                            <h4 
                              onClick={() => {
                                setSelectedProductDetail(product);
                                setIsComparisonModalOpen(false);
                              }}
                              className="font-extrabold text-xs text-slate-900 line-clamp-2 hover:text-emerald-600 cursor-pointer mt-1"
                            >
                              {product.titleFa}
                            </h4>
                          </div>
                          <div className="font-black text-sm text-orange-600 font-mono">
                            {formatPrice(product.priceTomans, language === 'fa')}
                          </div>
                          <button
                            onClick={() => addToCart(product, 1)}
                            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>{language === 'fa' ? 'افزودن به سبد' : 'Add to Cart'}</span>
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-xs">
                  {/* Rating */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-700 bg-slate-50/50">
                      {language === 'fa' ? 'امتیاز خریداران' : 'Customer Rating'}
                    </td>
                    {comparisonList.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <div className="inline-flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{toPersianDigits(product.rating)}</span>
                          <span className="text-slate-400 text-[10px]">({toPersianDigits(product.reviewCount)})</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Stock Status */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-700 bg-slate-50/50">
                      {language === 'fa' ? 'وضعیت موجودی' : 'Stock Availability'}
                    </td>
                    {comparisonList.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        {product.inStock ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-xl text-[11px]">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            {language === 'fa' ? 'موجود در انبار رستم شاپ' : 'In Stock'}
                          </span>
                        ) : (
                          <span className="text-rose-600 font-bold bg-rose-50 px-2.5 py-1 rounded-xl text-[11px]">
                            {language === 'fa' ? 'ناموجود' : 'Out of Stock'}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Warranty */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-700 bg-slate-50/50">
                      {language === 'fa' ? 'گارانتی و ضمانت' : 'Warranty'}
                    </td>
                    {comparisonList.map((product) => (
                      <td key={product.id} className="p-4 text-center text-slate-700 font-medium">
                        {product.warrantyFa || '۱۸ ماه گارانتی رسمی رستم شاپ'}
                      </td>
                    ))}
                  </tr>

                  {/* Dynamic Technical Specs */}
                  {allSpecKeys.map((key) => (
                    <tr key={key} className="hover:bg-slate-50/50">
                      <td className="p-4 font-bold text-slate-700 bg-slate-50/50">
                        {key}
                      </td>
                      {comparisonList.map((product) => {
                        const specs = language === 'fa' ? product.specsFa : product.specsEn;
                        return (
                          <td key={product.id} className="p-4 text-center text-slate-800 font-semibold">
                            {specs?.[key] || '—'}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{language === 'fa' ? 'تضمین اصالت و بهترین قیمت در کلیه کالاهای رستم شاپ' : 'Guaranteed authenticity on all Rostam Shop items'}</span>
          </div>
          <button
            onClick={() => setIsComparisonModalOpen(false)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold transition"
          >
            {language === 'fa' ? 'بستن پنجره مقایسه' : 'Close Comparison'}
          </button>
        </div>
      </div>
    </div>
  );
};
