import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { MegaMenu } from './components/MegaMenu';
import { BannerSlider } from './components/BannerSlider';
import { ServicesBar } from './components/ServicesBar';
import { IncredibleOffers } from './components/IncredibleOffers';
import { FreshOffers } from './components/FreshOffers';
import { CategoryGrid } from './components/CategoryGrid';
import { DigiPlusSection } from './components/DigiPlusSection';
import { ProductListing } from './components/ProductListing';
import { ProductDetail } from './components/ProductDetail';
import { ProductComparison } from './components/ProductComparison';
import { CartModal } from './components/CartModal';
import { UserProfileModal } from './components/UserProfileModal';
import { SearchModal } from './components/SearchModal';
import { AIAssistantModal } from './components/AIAssistantModal';
import { Footer } from './components/Footer';
import { ProductCard } from './components/ProductCard';
import { PRODUCTS, BRAND_LOGOS } from './data/mockData';
import { Sparkles, ArrowLeft, ArrowRight, Flame, Crown, CheckCircle2 } from 'lucide-react';

const MainShopContent: React.FC = () => {
  const { 
    language, 
    activeTab, 
    setActiveTab, 
    selectedProduct, 
    setSelectedProduct, 
    setSelectedCategory, 
    notification,
    setIsAssistantOpen
  } = useShop();

  const popularProducts = PRODUCTS.slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f0f1] text-[#242424]">
      
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-bold animate-in fade-in slide-in-from-bottom-4 duration-150 border border-white/10 max-w-[90vw]">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header & Navigation MegaMenu */}
      <Header />
      <MegaMenu />

      {/* View Switcher */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME PAGE */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            
            {/* Promotional Hero Slider */}
            <BannerSlider />

            {/* Circular Services Stories */}
            <ServicesBar />

            {/* Incredible Offers Flash Sale Box */}
            <IncredibleOffers />

            {/* Fresh Supermarket Deals */}
            <FreshOffers />

            {/* Category Circles Grid */}
            <CategoryGrid />

            {/* DigiPlus VIP Perks */}
            <DigiPlusSection />

            {/* Most Visited / Popular Products Grid */}
            <section className="max-w-7xl mx-auto my-10 px-3 sm:px-6">
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-5 bg-[#ef4056] rounded-full inline-block"></span>
                  <h2 className="text-base sm:text-xl font-black text-neutral-900">
                    {language === 'fa' ? 'منتخب پرفروش‌ترین و محبوب‌ترین کالاها' : 'Best Selling & Popular Products'}
                  </h2>
                </div>

                <button
                  onClick={() => { setSelectedCategory('all'); setActiveTab('catalog'); }}
                  className="text-xs font-bold text-[#ef4056] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{language === 'fa' ? 'مشاهده همه محصولات' : 'View All'}</span>
                  {language === 'fa' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {popularProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Popular Brands Section */}
            <section className="max-w-7xl mx-auto my-10 px-3 sm:px-6">
              <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs">
                <div className="text-center mb-6">
                  <h3 className="font-black text-base sm:text-lg text-neutral-900">
                    {language === 'fa' ? 'محبوب‌ترین برندهای اصیل در دیجی‌کالا' : 'Authentic Top Brands'}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    {language === 'fa' ? 'تضمین اصالت ۱۰۰٪ تمامی کالاهای برندهای مطرح جهان' : '100% Guaranteed authenticity'}
                  </p>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                  {BRAND_LOGOS.map((brand, idx) => (
                    <div
                      key={idx}
                      onClick={() => { setSelectedCategory('all'); setActiveTab('catalog'); }}
                      className="p-4 rounded-2xl border border-neutral-100 hover:border-red-200 bg-neutral-50/50 hover:bg-red-50/20 transition-all flex flex-col items-center justify-center cursor-pointer group text-center"
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden mb-2 bg-white p-1 shadow-2xs group-hover:scale-105 transition-transform">
                        <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <span className="text-xs font-bold text-neutral-800 group-hover:text-[#ef4056]">
                        {language === 'fa' ? brand.nameFa : brand.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>
        )}

        {/* VIEW 2: CATALOG / SEARCH LISTING */}
        {activeTab === 'catalog' && <ProductListing />}

        {/* VIEW 3: INCREDIBLE OFFERS PAGE */}
        {activeTab === 'shegeftangiz' && (
          <div className="space-y-6 pt-4">
            <IncredibleOffers />
            <ProductListing />
          </div>
        )}

        {/* VIEW 4: DIGIPLUS PAGE */}
        {activeTab === 'plus' && (
          <div className="pt-4">
            <DigiPlusSection />
          </div>
        )}

        {/* VIEW 5: CART & CHECKOUT */}
        {activeTab === 'cart' && <CartModal />}

        {/* VIEW 6: USER PROFILE & ORDERS */}
        {(activeTab === 'profile' || activeTab === 'orders') && <UserProfileModal />}

        {/* VIEW 7: PRODUCT COMPARISON */}
        {activeTab === 'compare' && <ProductComparison />}

      </main>

      {/* Floating AI Shopping Assistant Launcher */}
      <button
        onClick={() => setIsAssistantOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-purple-700 to-indigo-700 text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-transform cursor-pointer flex items-center gap-2 border-2 border-white/20 group"
        title="دیجی‌دستیار هوش مصنوعی"
      >
        <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
        <span className="text-xs font-black hidden group-hover:inline pr-1 transition-all">
          {language === 'fa' ? 'دیجی‌دستیار هوشمند' : 'AI Shopping Advisor'}
        </span>
      </button>

      {/* Modals & Overlays */}
      {selectedProduct && (
        <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
      <SearchModal />
      <AIAssistantModal />

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainShopContent />
    </ShopProvider>
  );
}
