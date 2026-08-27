import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryBar } from './components/CategoryBar';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutView } from './components/CheckoutView';
import { GatewayTerminalModal } from './components/GatewayTerminalModal';
import { OrderSuccessView } from './components/OrderSuccessView';
import { OrderHistoryView } from './components/OrderHistoryView';
import { GatewaySettingsModal } from './components/GatewaySettingsModal';
import { DevDocsView } from './components/DevDocsView';
import { PaymentPageView } from './components/PaymentPageView';
import { AuthView } from './components/AuthView';
import { UserProfileView } from './components/UserProfileView';
import { CompareModal } from './components/CompareModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Sparkles 
} from 'lucide-react';

const ShopAppContent: React.FC = () => {
  const { 
    language, 
    activeView, 
    notification 
  } = useShop();

  return (
    <div 
      className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white font-sans" 
      dir={language === 'fa' ? 'rtl' : 'ltr'}
    >
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className={`px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs sm:text-sm font-bold border backdrop-blur-md ${
            notification.type === 'error'
              ? 'bg-rose-50 text-rose-800 border-rose-200 shadow-rose-900/10'
              : notification.type === 'info'
              ? 'bg-orange-50 text-orange-800 border-orange-200 shadow-orange-900/10'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200 shadow-emerald-900/10'
          }`}>
            {notification.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
            {notification.type === 'info' && <Info className="w-4 h-4 text-orange-600 shrink-0" />}
            {notification.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: STORE FRONT (SHOP) */}
        {activeView === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <HeroBanner />
            <CategoryBar />
            <ProductGrid />
          </div>
        )}

        {/* VIEW 2: DIRECT INVOICE PAYMENT PAGE */}
        {activeView === 'payment-page' && <PaymentPageView />}

        {/* VIEW 3: AUTHENTICATION (LOGIN / REGISTER) */}
        {activeView === 'auth' && <AuthView />}

        {/* VIEW 4: USER PROFILE & WALLET */}
        {activeView === 'user-profile' && <UserProfileView />}

        {/* VIEW 5: CHECKOUT & IRANIAN PAYMENT METHOD SELECTOR */}
        {activeView === 'checkout' && <CheckoutView />}

        {/* VIEW 6: ORDER SUCCESS RECEIPT & POSTAL TRACKING */}
        {activeView === 'order-success' && <OrderSuccessView />}

        {/* VIEW 7: ORDER HISTORY & LOGS */}
        {activeView === 'order-history' && <OrderHistoryView />}

        {/* VIEW 8: ZARINPAL GATEWAY CONFIGURATION */}
        {activeView === 'gateway-settings' && <GatewaySettingsModal />}

        {/* VIEW 9: DEVELOPER API DOCS & CODE SNIPPETS */}
        {activeView === 'dev-docs' && <DevDocsView />}

      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal />

      {/* Compare Modal */}
      <CompareModal />

      {/* Auth Modal (Sign In / Sign Up) */}
      <AuthModal />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Interactive Zarinpal / Shaparak Payment Terminal Modal */}
      <GatewayTerminalModal />

      {/* Main Store Footer with Trust Seals */}
      <Footer />

    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <ShopAppContent />
    </ShopProvider>
  );
}

