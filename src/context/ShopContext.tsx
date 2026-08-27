import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Product, 
  CartItem, 
  ProductCategory, 
  ProductColor, 
  ShippingAddress, 
  PaymentMethodType, 
  Order, 
  PaymentGatewayConfig,
  Language,
  ActiveView,
  UserAccount,
  DirectPaymentRequest,
  ZarinpalRequestPayload 
} from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { 
  ZARINPAL_CONFIG, 
  requestZarinpalPayment, 
  verifyZarinpalPayment, 
  generateRefId 
} from '../services/zarinpalService';

interface CartSummary {
  subtotal: number;
  discount: number;
  shippingFee: number;
  finalTotal: number;
  totalItemCount: number;
}

interface CouponState {
  code: string;
  percent: number;
  applied: boolean;
}

interface ShopContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  products: Product[];
  
  // Views
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;

  // User Auth & Profile
  currentUser: UserAccount | null;
  loginUser: (phone: string, fullName?: string) => boolean;
  registerUser: (userData: { fullName: string; phone: string; email: string; nationalCode?: string }) => boolean;
  logoutUser: () => void;
  chargeWallet: (amountTomans: number) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalTab: 'signin' | 'signup';
  setAuthModalTab: (tab: 'signin' | 'signup') => void;
  openAuthModal: (tab?: 'signin' | 'signup') => void;

  // Filter & Search
  selectedCategory: ProductCategory;
  setSelectedCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount') => void;
  selectedProductDetail: Product | null;
  setSelectedProductDetail: (prod: Product | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: ProductColor) => void;
  removeFromCart: (productId: string, colorHex?: string) => void;
  updateQuantity: (productId: string, quantity: number, colorHex?: string) => void;
  clearCart: () => void;
  cartSummary: CartSummary;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Product Comparison
  comparisonList: Product[];
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;
  isComparisonModalOpen: boolean;
  setIsComparisonModalOpen: (open: boolean) => void;

  // Product Reviews
  addProductReview: (productId: string, review: { author: string; rating: number; comment: string }) => void;

  // Discount Coupons
  coupon: CouponState | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Checkout & Shipping
  shippingAddress: ShippingAddress;
  setShippingAddress: React.Dispatch<React.SetStateAction<ShippingAddress>>;
  selectedPaymentMethod: PaymentMethodType;
  setSelectedPaymentMethod: (method: PaymentMethodType) => void;

  // Gateway Config & API Settings
  gatewayConfig: PaymentGatewayConfig;
  updateGatewayConfig: (cfg: Partial<PaymentGatewayConfig>) => void;

  // Payment Execution & Shaparak/Zarinpal Terminal Modal
  isGatewayModalOpen: boolean;
  gatewaySession: {
    authority: string;
    amountTomans: number;
    description: string;
    orderId: string;
    gatewayName: string;
    isDirectPayment?: boolean;
    directPaymentData?: DirectPaymentRequest;
  } | null;
  startCheckoutPayment: () => Promise<void>;
  startDirectPayment: (request: DirectPaymentRequest) => Promise<void>;
  closeGatewayModal: () => void;
  submitGatewayPayment: (isSuccess: boolean, pan?: string) => Promise<void>;

  // Orders
  orders: Order[];
  currentOrder: Order | null;
  setCurrentOrder: (order: Order | null) => void;

  // Toast
  notification: { message: string; type: 'success' | 'error' | 'info' } | null;
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const DEFAULT_SHIPPING: ShippingAddress = {
  fullName: 'امیرمحمد حمیدی',
  phone: '09123456789',
  province: 'تهران',
  city: 'تهران',
  postalCode: '1987654321',
  address: 'خیابان ولیعصر، بالاتر از میرداماد، برج آرین، طبقه ۸، واحد ۴',
  recipientNote: 'لطفاً قبل از ارسال تماس حاصل فرمایید.',
  deliveryMethod: 'instant_courier',
  preferredTimeSlot: 'morning'
};

const DEFAULT_CONFIG: PaymentGatewayConfig = {
  merchantId: ZARINPAL_CONFIG.DEFAULT_MERCHANT_ID,
  isSandbox: true,
  currency: 'IRT',
  callbackUrl: typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://rostam-shop.ir/callback',
};

const DEFAULT_USER: UserAccount = {
  id: 'usr-8392',
  fullName: 'امیرمحمد حمیدی',
  fullNameFa: 'امیرمحمد حمیدی',
  phone: '09123456789',
  email: 'amyrmhmdhmydy342@gmail.com',
  nationalCode: '0012345678',
  isVerified: true,
  registeredAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  walletBalanceTomans: 3500000,
  savedAddresses: [DEFAULT_SHIPPING]
};

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-8092',
    orderNumber: 'ROSTAM-2026-8092',
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
    items: [
      {
        product: INITIAL_PRODUCTS[4], // Sony XM5
        quantity: 1,
        selectedColor: INITIAL_PRODUCTS[4].colors?.[0]
      }
    ],
    subtotal: 18400000,
    discount: 0,
    shippingFee: 0,
    total: 18400000,
    status: 'DELIVERED',
    paymentMethod: 'zarinpal',
    transactionRefId: '8294710382',
    authority: 'A00000000000000000000000000098472910',
    cardPan: '6037-99**-****-8392',
    shippingAddress: DEFAULT_SHIPPING,
    trackingCode: '29840192847591028471'
  }
];

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fa');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeView, setActiveView] = useState<ActiveView>('shop');
  
  // User Authentication
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('rostam_shop_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  // Filter & Search
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('featured');
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('rostam_shop_cart');
      return saved ? JSON.parse(saved) : [
        {
          product: INITIAL_PRODUCTS[4], // Sony XM5
          quantity: 1,
          selectedColor: INITIAL_PRODUCTS[4].colors?.[0]
        }
      ];
    } catch {
      return [];
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [coupon, setCoupon] = useState<CouponState | null>(null);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rostam_shop_wishlist');
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-5'];
    } catch {
      return ['prod-1', 'prod-5'];
    }
  });

  // Product Comparison
  const [comparisonList, setComparisonList] = useState<Product[]>([]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

  // Universal Auth Modal (Sign In / Sign Up)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin');

  const openAuthModal = (tab: 'signin' | 'signup' = 'signin') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  // Shipping & Payment
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(() => {
    try {
      const saved = localStorage.getItem('rostam_shop_address');
      return saved ? JSON.parse(saved) : DEFAULT_SHIPPING;
    } catch {
      return DEFAULT_SHIPPING;
    }
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodType>('zarinpal');
  const [gatewayConfig, setGatewayConfig] = useState<PaymentGatewayConfig>(() => {
    try {
      const saved = localStorage.getItem('rostam_gateway_config');
      return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
    } catch {
      return DEFAULT_CONFIG;
    }
  });

  // Gateway Modal & Processing
  const [isGatewayModalOpen, setIsGatewayModalOpen] = useState(false);
  const [gatewaySession, setGatewaySession] = useState<{
    authority: string;
    amountTomans: number;
    description: string;
    orderId: string;
    gatewayName: string;
    isDirectPayment?: boolean;
    directPaymentData?: DirectPaymentRequest;
  } | null>(null);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('rostam_shop_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Storage sync
  useEffect(() => {
    localStorage.setItem('rostam_shop_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('rostam_shop_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('rostam_shop_address', JSON.stringify(shippingAddress));
  }, [shippingAddress]);

  useEffect(() => {
    localStorage.setItem('rostam_gateway_config', JSON.stringify(gatewayConfig));
  }, [gatewayConfig]);

  useEffect(() => {
    localStorage.setItem('rostam_shop_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('rostam_shop_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('rostam_shop_user');
    }
  }, [currentUser]);

  // Check URL params for gateway redirect simulation
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authority = params.get('Authority') || params.get('authority');
    const status = params.get('Status') || params.get('status');

    if (authority && status) {
      if (status.toUpperCase() === 'OK') {
        showNotification(language === 'fa' ? 'پرداخت زرین‌پال تأیید شد و تراکنش با موفقیت ثبت گردید.' : 'Zarinpal payment verified successfully!');
      } else {
        showNotification(language === 'fa' ? 'پرداخت توسط کاربر لغو گردید.' : 'Payment cancelled by user.', 'error');
      }
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Wishlist Functions
  const toggleWishlist = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showNotification(
          language === 'fa' 
            ? `«${prod?.titleFa || 'کالا'}» از علاقه‌مندی‌ها حذف شد.` 
            : 'Removed from wishlist.', 
          'info'
        );
        return prev.filter((id) => id !== productId);
      } else {
        showNotification(
          language === 'fa' 
            ? `«${prod?.titleFa || 'کالا'}» به لیست علاقه‌مندی‌ها اضافه شد.` 
            : 'Added to wishlist!', 
          'success'
        );
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Comparison Functions
  const addToComparison = (product: Product) => {
    setComparisonList((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        showNotification(language === 'fa' ? 'این کالا قبلاً به لیست مقایسه اضافه شده است.' : 'Product is already in comparison.', 'info');
        return prev;
      }
      if (prev.length >= 4) {
        showNotification(language === 'fa' ? 'حداکثر ۴ محصول را می‌توانید همزمان مقایسه کنید.' : 'Maximum 4 products can be compared.', 'error');
        return prev;
      }
      showNotification(language === 'fa' ? `«${product.titleFa}» به مقایسه اضافه شد.` : 'Added to comparison.', 'success');
      return [...prev, product];
    });
  };

  const removeFromComparison = (productId: string) => {
    setComparisonList((prev) => prev.filter((p) => p.id !== productId));
    showNotification(language === 'fa' ? 'کالا از مقایسه حذف شد.' : 'Removed from comparison.', 'info');
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  // Add Product Review
  const addProductReview = (productId: string, review: { author: string; rating: number; comment: string }) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newReviews = p.reviews || [];
          const updatedReviews = [
            {
              id: `rev-${Date.now()}`,
              author: review.author || (currentUser?.fullName || 'خریدار رستم شاپ'),
              rating: review.rating,
              date: 'امروز',
              comment: review.comment,
              verifiedBuyer: true
            },
            ...newReviews
          ];
          const newAvgRating = Number(
            (updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length).toFixed(1)
          );
          return {
            ...p,
            reviews: updatedReviews,
            reviewCount: p.reviewCount + 1,
            rating: newAvgRating
          };
        }
        return p;
      })
    );
    showNotification(language === 'fa' ? 'دیدگاه شما با موفقیت ثبت شد و منتشر گردید.' : 'Review submitted successfully!', 'success');
  };

  // Auth Functions
  const loginUser = (phone: string, fullName?: string): boolean => {
    const user: UserAccount = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      fullName: fullName || 'امیرمحمد حمیدی',
      fullNameFa: fullName || 'امیرمحمد حمیدی',
      phone: phone,
      email: `${phone}@rostam-shop.ir`,
      isVerified: true,
      registeredAt: new Date().toISOString(),
      walletBalanceTomans: 3500000,
      savedAddresses: [shippingAddress]
    };
    setCurrentUser(user);
    showNotification(language === 'fa' ? `خوش آمدید، ${user.fullName}!` : `Welcome back, ${user.fullName}!`, 'success');
    return true;
  };

  const registerUser = (userData: { fullName: string; phone: string; email: string; nationalCode?: string }): boolean => {
    const newUser: UserAccount = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      fullName: userData.fullName,
      fullNameFa: userData.fullName,
      phone: userData.phone,
      email: userData.email,
      nationalCode: userData.nationalCode,
      isVerified: true,
      registeredAt: new Date().toISOString(),
      walletBalanceTomans: 1000000, // 1M welcome bonus
      savedAddresses: [
        {
          ...DEFAULT_SHIPPING,
          fullName: userData.fullName,
          phone: userData.phone
        }
      ]
    };
    setCurrentUser(newUser);
    showNotification(language === 'fa' ? 'ثبت‌نام با موفقیت انجام شد! هدیه عضویت رستم شاپ به کیف پول افزوده شد.' : 'Registration successful! Welcome bonus added.', 'success');
    return true;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showNotification(language === 'fa' ? 'از حساب کاربری خود خارج شدید.' : 'Logged out successfully.', 'info');
  };

  const chargeWallet = (amountTomans: number) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      walletBalanceTomans: currentUser.walletBalanceTomans + amountTomans
    });
    showNotification(language === 'fa' ? `کیف پول شما به مبلغ ${amountTomans.toLocaleString('fa-IR')} تومان با موفقیت شارژ شد.` : `Wallet charged with ${amountTomans.toLocaleString()} Tomans.`);
  };

  const addToCart = (product: Product, quantity: number = 1, color?: ProductColor) => {
    const chosenColor = color || (product.colors && product.colors.length > 0 ? product.colors[0] : undefined);
    
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor?.hex === chosenColor?.hex
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedColor: chosenColor }];
      }
    });

    showNotification(
      language === 'fa' 
        ? `«${product.titleFa}» به سبد خرید افزوده شد.` 
        : `Added "${product.titleEn}" to your cart.`
    );
  };

  const removeFromCart = (productId: string, colorHex?: string) => {
    setCart((prev) => 
      prev.filter((item) => !(item.product.id === productId && (!colorHex || item.selectedColor?.hex === colorHex)))
    );
    showNotification(language === 'fa' ? 'کالا از سبد خرید حذف شد.' : 'Item removed from cart.', 'info');
  };

  const updateQuantity = (productId: string, quantity: number, colorHex?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, colorHex);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && (!colorHex || item.selectedColor?.hex === colorHex)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string): boolean => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'ROSTAM' || normalized === 'NOWRUZ' || normalized === 'OFF10') {
      setCoupon({ code: normalized, percent: 10, applied: true });
      showNotification(language === 'fa' ? 'کد تخفیف ۱۰٪ رستم شاپ با موفقیت اعمال شد!' : '10% discount coupon applied successfully!');
      return true;
    } else if (normalized === 'VIP25' || normalized === 'SPECIAL') {
      setCoupon({ code: normalized, percent: 25, applied: true });
      showNotification(language === 'fa' ? 'کد تخفیف طلایی ۲۵٪ ویژه اعمال شد!' : 'VIP 25% discount coupon applied!');
      return true;
    } else {
      showNotification(language === 'fa' ? 'کد تخفیف وارد شده نامعتبر است یا منقضی شده.' : 'Invalid coupon code.', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    showNotification(language === 'fa' ? 'کد تخفیف حذف شد.' : 'Coupon removed.', 'info');
  };

  // Calculate cart summary
  const subtotal = cart.reduce((acc, item) => acc + item.product.priceTomans * item.quantity, 0);
  const couponDiscount = coupon?.applied ? Math.round((subtotal * coupon.percent) / 100) : 0;
  const shippingFee = subtotal > 10000000 || subtotal === 0 ? 0 : 75000;
  const finalTotal = Math.max(0, subtotal - couponDiscount + shippingFee);
  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartSummary: CartSummary = {
    subtotal,
    discount: couponDiscount,
    shippingFee,
    finalTotal,
    totalItemCount
  };

  const updateGatewayConfig = (cfg: Partial<PaymentGatewayConfig>) => {
    setGatewayConfig((prev) => ({ ...prev, ...cfg }));
    showNotification(language === 'fa' ? 'تنظیمات درگاه پرداخت ذخیره شد.' : 'Payment gateway settings updated.');
  };

  /**
   * Start Checkout Payment for cart
   */
  const startCheckoutPayment = async () => {
    if (cart.length === 0) {
      showNotification(language === 'fa' ? 'سبد خرید شما خالی است.' : 'Your cart is empty.', 'error');
      return;
    }

    const orderId = `ROSTAM-${Date.now().toString().slice(-6)}`;
    const description = `سفارش شماره ${orderId} از فروشگاه آنلاین رستم شاپ`;

    if (selectedPaymentMethod === 'wallet') {
      if (!currentUser || currentUser.walletBalanceTomans < finalTotal) {
        showNotification(language === 'fa' ? 'موجودی کیف پول شما برای پرداخت این سفارش کافی نیست.' : 'Insufficient wallet balance.', 'error');
        return;
      }
      // Direct deduction from wallet
      setCurrentUser({
        ...currentUser,
        walletBalanceTomans: currentUser.walletBalanceTomans - finalTotal
      });
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: orderId,
        date: new Date().toISOString(),
        items: [...cart],
        subtotal: cartSummary.subtotal,
        discount: cartSummary.discount,
        shippingFee: cartSummary.shippingFee,
        total: finalTotal,
        status: 'PAID',
        paymentMethod: 'wallet',
        transactionRefId: `WLT-${Date.now().toString().slice(-8)}`,
        authority: 'WALLET-INSTANT-PAY',
        shippingAddress: { ...shippingAddress },
        trackingCode: `IRPOST-${Math.floor(100000000000 + Math.random() * 900000000000)}`
      };
      setOrders((prev) => [newOrder, ...prev]);
      setCurrentOrder(newOrder);
      clearCart();
      setCoupon(null);
      setActiveView('order-success');
      showNotification(language === 'fa' ? 'پرداخت از کیف پول با موفقیت انجام شد و سفارش ثبت گردید.' : 'Order paid via wallet!', 'success');
      return;
    }

    if (selectedPaymentMethod === 'zarinpal') {
      const payload: ZarinpalRequestPayload = {
        merchant_id: gatewayConfig.merchantId,
        amount: finalTotal,
        currency: gatewayConfig.currency,
        description,
        callback_url: gatewayConfig.callbackUrl,
        metadata: {
          mobile: shippingAddress.phone,
          order_id: orderId
        }
      };

      const res = await requestZarinpalPayment(payload);
      const authority = res.data.authority;

      setGatewaySession({
        authority,
        amountTomans: finalTotal,
        description,
        orderId,
        gatewayName: 'درگاه پرداخت شاپرک زرین‌پال v4'
      });
      setIsGatewayModalOpen(true);
    } else if (selectedPaymentMethod === 'saman_shaparak' || selectedPaymentMethod === 'mellat_shaparak') {
      const authority = `SHAPARAK-${Math.random().toString(36).substring(2, 14).toUpperCase()}`;
      setGatewaySession({
        authority,
        amountTomans: finalTotal,
        description,
        orderId,
        gatewayName: selectedPaymentMethod === 'mellat_shaparak' ? 'به‌پرداخت ملت (شاپرک)' : 'پرداخت الکترونیک سامان (سپ)'
      });
      setIsGatewayModalOpen(true);
    } else if (selectedPaymentMethod === 'nextpay' || selectedPaymentMethod === 'idpay') {
      const authority = `IPG-${Math.random().toString(36).substring(2, 14).toUpperCase()}`;
      setGatewaySession({
        authority,
        amountTomans: finalTotal,
        description,
        orderId,
        gatewayName: selectedPaymentMethod === 'nextpay' ? 'درگاه پرداخت نکست‌پی (شاپرک)' : 'درگاه آیدی‌پی (IDPay شاپرک)'
      });
      setIsGatewayModalOpen(true);
    } else if (selectedPaymentMethod === 'card_to_card') {
      const authority = `C2C-${Date.now().toString().slice(-8)}`;
      setGatewaySession({
        authority,
        amountTomans: finalTotal,
        description,
        orderId,
        gatewayName: 'انتقال آنی کارت به کارت بانکی شتاب'
      });
      setIsGatewayModalOpen(true);
    } else if (selectedPaymentMethod === 'snapp_pay') {
      const authority = `SNAPP-${Date.now().toString().slice(-8)}`;
      setGatewaySession({
        authority,
        amountTomans: finalTotal,
        description,
        orderId,
        gatewayName: 'پرداخت اقساطی ۴ ماهه اسنپ‌پی رستم شاپ'
      });
      setIsGatewayModalOpen(true);
    }
  };

  /**
   * Start Direct Payment (from Dedicated Payment Page)
   */
  const startDirectPayment = async (request: DirectPaymentRequest) => {
    if (request.amountTomans <= 0) {
      showNotification(language === 'fa' ? 'مبلغ وارد شده معتبر نمی‌باشد.' : 'Invalid payment amount.', 'error');
      return;
    }

    const orderId = request.invoiceNumber || `INV-${Date.now().toString().slice(-6)}`;
    const description = request.description || `پرداخت فاکتور ${orderId} در رستم شاپ`;

    if (request.gateway === 'zarinpal') {
      const payload: ZarinpalRequestPayload = {
        merchant_id: gatewayConfig.merchantId,
        amount: request.amountTomans,
        currency: gatewayConfig.currency,
        description,
        callback_url: gatewayConfig.callbackUrl,
        metadata: {
          mobile: request.payerPhone,
          email: request.payerEmail,
          order_id: orderId
        }
      };

      const res = await requestZarinpalPayment(payload);
      const authority = res.data.authority;

      setGatewaySession({
        authority,
        amountTomans: request.amountTomans,
        description,
        orderId,
        gatewayName: 'درگاه رسمی زرین‌پال شاپرک (Zarinpal PG)',
        isDirectPayment: true,
        directPaymentData: request
      });
      setIsGatewayModalOpen(true);
    } else {
      const authority = `SHAPARAK-${Math.random().toString(36).substring(2, 14).toUpperCase()}`;
      setGatewaySession({
        authority,
        amountTomans: request.amountTomans,
        description,
        orderId,
        gatewayName: request.gateway === 'saman_shaparak' ? 'پرداخت الکترونیک سامان (سپ)' : request.gateway === 'mellat_shaparak' ? 'به‌پرداخت ملت شاپرک' : 'درگاه مستقیم شاپرک',
        isDirectPayment: true,
        directPaymentData: request
      });
      setIsGatewayModalOpen(true);
    }
  };

  const closeGatewayModal = () => {
    setIsGatewayModalOpen(false);
    setGatewaySession(null);
  };

  /**
   * Complete payment verification & Create official order / receipt
   */
  const submitGatewayPayment = async (isSuccess: boolean, pan?: string) => {
    if (!gatewaySession) return;
    const { authority, amountTomans, orderId, isDirectPayment, directPaymentData } = gatewaySession;

    if (!isSuccess) {
      closeGatewayModal();
      showNotification(language === 'fa' ? 'پرداخت توسط کاربر لغو گردید یا با خطا مواجه شد.' : 'Payment cancelled or failed.', 'error');
      return;
    }

    const verifyRes = await verifyZarinpalPayment({
      merchant_id: gatewayConfig.merchantId,
      amount: amountTomans,
      authority
    });

    const refId = String(verifyRes.data.ref_id || generateRefId());
    const cardPan = pan || verifyRes.data.card_pan || '6037-99**-****-8392';

    if (isDirectPayment && directPaymentData) {
      // Direct Invoice Payment
      const directOrder: Order = {
        id: `pay-${Date.now()}`,
        orderNumber: orderId,
        date: new Date().toISOString(),
        items: [],
        subtotal: amountTomans,
        discount: 0,
        shippingFee: 0,
        total: amountTomans,
        status: 'PAID',
        paymentMethod: directPaymentData.gateway,
        transactionRefId: refId,
        authority,
        cardPan,
        shippingAddress: {
          fullName: directPaymentData.payerName || 'پرداخت‌کننده آزاد',
          phone: directPaymentData.payerPhone,
          province: 'تهران',
          city: 'تهران',
          postalCode: '1000000000',
          address: directPaymentData.description || 'پرداخت مستقیم فاکتور رستم شاپ'
        },
        trackingCode: `PAY-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        notes: directPaymentData.description
      };

      setOrders((prev) => [directOrder, ...prev]);
      setCurrentOrder(directOrder);
      closeGatewayModal();
      setActiveView('order-success');

      showNotification(
        language === 'fa' 
          ? `تراکنش فاکتور با موفقیت در شاپرک تایید شد! شماره پیگیری: ${refId}` 
          : `Direct payment verified! Ref ID: ${refId}`
      );
      return;
    }

    // Standard Cart Checkout
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderId,
      date: new Date().toISOString(),
      items: [...cart],
      subtotal: cartSummary.subtotal,
      discount: cartSummary.discount,
      shippingFee: cartSummary.shippingFee,
      total: amountTomans,
      status: 'PAID',
      paymentMethod: selectedPaymentMethod,
      transactionRefId: refId,
      authority,
      cardPan,
      shippingAddress: { ...shippingAddress },
      trackingCode: `ROSTAM-POST-${Math.floor(100000000000 + Math.random() * 900000000000)}`
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    setCoupon(null);
    closeGatewayModal();
    setActiveView('order-success');

    showNotification(
      language === 'fa' 
        ? `سفارش ${orderId} با موفقیت در رستم شاپ ثبت شد! شماره پیگیری: ${refId}` 
        : `Order ${orderId} placed successfully! Ref ID: ${refId}`
    );
  };

  return (
    <ShopContext.Provider
      value={{
        language,
        setLanguage,
        products,
        activeView,
        setActiveView,
        currentUser,
        loginUser,
        registerUser,
        logoutUser,
        chargeWallet,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        openAuthModal,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        selectedProductDetail,
        setSelectedProductDetail,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSummary,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        wishlist,
        toggleWishlist,
        isWishlisted,
        comparisonList,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isComparisonModalOpen,
        setIsComparisonModalOpen,
        addProductReview,
        coupon,
        applyCoupon,
        removeCoupon,
        shippingAddress,
        setShippingAddress,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        gatewayConfig,
        updateGatewayConfig,
        isGatewayModalOpen,
        gatewaySession,
        startCheckoutPayment,
        startDirectPayment,
        closeGatewayModal,
        submitGatewayPayment,
        orders,
        currentOrder,
        setCurrentOrder,
        notification,
        showNotification
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
