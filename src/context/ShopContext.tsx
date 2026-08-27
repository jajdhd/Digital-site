import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Language, PlacedOrder, OrderAddress, ProductColor, SellerOption } from '../types';
import { PRODUCTS } from '../data/mockData';

interface UserProfile {
  name: string;
  phone: string;
  email: string;
  isPlusMember: boolean;
  walletBalance: number; // in Tomans
  digiClubPoints: number;
  addresses: OrderAddress[];
}

interface ShopContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  cart: CartItem[];
  addToCart: (product: Product, color?: ProductColor, seller?: SellerOption, quantity?: number) => void;
  removeFromCart: (productId: string, colorHex: string, sellerId: string) => void;
  updateQuantity: (productId: string, colorHex: string, sellerId: string, delta: number) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartTotalPrice: number;
  cartTotalDiscount: number;
  cartFinalPrice: number;
  
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  compareList: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  isComparing: (productId: string) => boolean;

  orders: PlacedOrder[];
  placeOrder: (address: OrderAddress, deliveryTimeSlot: string, deliveryDate: string, discountCode?: string) => PlacedOrder;

  user: UserProfile;
  updateUser: (data: Partial<UserProfile>) => void;

  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  activeTab: 'home' | 'catalog' | 'cart' | 'profile' | 'orders' | 'compare' | 'shegeftangiz' | 'plus';
  setActiveTab: (tab: 'home' | 'catalog' | 'cart' | 'profile' | 'orders' | 'compare' | 'shegeftangiz' | 'plus') => void;

  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;

  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  isAssistantOpen: boolean;
  setIsAssistantOpen: (open: boolean) => void;

  notification: string | null;
  showNotification: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const DEFAULT_ADDRESSES: OrderAddress[] = [
  {
    fullName: 'امیرمحمد حمیدی',
    phoneNumber: '۰۹۱۲۳۴۵۶۷۸۹',
    province: 'تهران',
    city: 'تهران',
    postalCode: '۱۹۹۱۸۵۴۳۲۱',
    streetAddress: 'خیابان ولیعصر، نرسیده به میدان ونک، خیابان خدامی',
    buildingNumber: 'پلاک ۴۲',
    unit: 'واحد ۶'
  }
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('digi_lang') as Language) || 'fa';
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('digi_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('digi_wishlist');
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-3'];
    } catch {
      return ['prod-1', 'prod-3'];
    }
  });

  const [compareList, setCompareList] = useState<Product[]>([]);
  const [orders, setOrders] = useState<PlacedOrder[]>(() => {
    try {
      const saved = localStorage.getItem('digi_orders');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'ord-101',
        orderNumber: 'DKC-8934215',
        date: '۱۴۰۳/۱۱/۲۰',
        items: [
          {
            product: PRODUCTS[1],
            selectedColor: PRODUCTS[1].colors[0],
            selectedSeller: PRODUCTS[1].defaultSeller,
            quantity: 1
          }
        ],
        totalPrice: 8400000,
        totalDiscount: 1510000,
        shippingFee: 0,
        finalPrice: 6890000,
        address: DEFAULT_ADDRESSES[0],
        deliveryDate: '۱۴۰۳/۱۱/۲۲',
        deliveryTimeSlot: 'ساعت ۹ تا ۱۲ صبح',
        status: 'delivered',
        trackingCode: 'TRK-9923841029'
      }
    ];
  });

  const [user, setUser] = useState<UserProfile>({
    name: 'امیرمحمد حمیدی',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    email: 'user@digikala.com',
    isPlusMember: true,
    walletBalance: 1250000,
    digiClubPoints: 840,
    addresses: DEFAULT_ADDRESSES
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'catalog' | 'cart' | 'profile' | 'orders' | 'compare' | 'shegeftangiz' | 'plus'>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('digi_searches');
      return saved ? JSON.parse(saved) : ['آیفون ۱۶ پرو مکس', 'سرخ کن فیلیپس', 'هدفون سونی xm5', 'زعفران قائنات', 'اسپرسوساز'];
    } catch {
      return ['آیفون ۱۶ پرو مکس', 'سرخ کن فیلیپس', 'هدفون سونی xm5'];
    }
  });

  useEffect(() => {
    localStorage.setItem('digi_lang', language);
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    localStorage.setItem('digi_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('digi_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('digi_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('digi_searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const addToCart = (product: Product, color?: ProductColor, seller?: SellerOption, quantity: number = 1) => {
    const activeColor = color || product.colors[0] || { name: 'پیش‌فرض', nameEn: 'Default', hex: '#333', code: 'DEF' };
    const activeSeller = seller || product.defaultSeller;

    setCart((prev) => {
      const index = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.code === activeColor.code &&
          item.selectedSeller.id === activeSeller.id
      );

      if (index > -1) {
        const updated = [...prev];
        updated[index].quantity = Math.min(activeSeller.stock, updated[index].quantity + quantity);
        return updated;
      } else {
        return [...prev, { product, selectedColor: activeColor, selectedSeller: activeSeller, quantity }];
      }
    });

    showNotification(language === 'fa' ? `«${product.titleFa.slice(0, 30)}...» به سبد خرید اضافه شد.` : `"${product.titleEn}" added to cart.`);
  };

  const removeFromCart = (productId: string, colorHex: string, sellerId: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.selectedColor.hex === colorHex && item.selectedSeller.id === sellerId)
      )
    );
  };

  const updateQuantity = (productId: string, colorHex: string, sellerId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedColor.hex === colorHex && item.selectedSeller.id === sellerId) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            if (nextQty > item.selectedSeller.stock) return item;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showNotification(language === 'fa' ? 'از لیست علاقه‌مندی‌ها حذف شد' : 'Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showNotification(language === 'fa' ? 'به لیست علاقه‌مندی‌ها اضافه شد' : 'Added to wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const addToCompare = (product: Product) => {
    setCompareList((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      if (prev.length >= 3) {
        showNotification(language === 'fa' ? 'حداکثر ۳ کالا برای مقایسه همزمان مجاز است' : 'Max 3 items allowed in comparison');
        return prev;
      }
      showNotification(language === 'fa' ? 'به لیست مقایسه اضافه شد' : 'Added to comparison');
      return [...prev, product];
    });
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  const isComparing = (productId: string) => compareList.some((p) => p.id === productId);

  const addRecentSearch = (query: string) => {
    if (!query.trim()) return;
    setRecentSearches((prev) => [query, ...prev.filter((q) => q !== query)].slice(0, 8));
  };

  const clearRecentSearches = () => setRecentSearches([]);

  const updateUser = (data: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...data }));
    showNotification(language === 'fa' ? 'اطلاعات پروفایل به‌روزرسانی شد' : 'Profile updated successfully');
  };

  // Cart calculations
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalPrice = cart.reduce((sum, item) => {
    const orig = item.product.originalPrice || item.selectedSeller.price;
    return sum + orig * item.quantity;
  }, 0);

  const cartFinalPrice = cart.reduce((sum, item) => {
    return sum + item.selectedSeller.price * item.quantity;
  }, 0);

  const cartTotalDiscount = Math.max(0, cartTotalPrice - cartFinalPrice);

  const placeOrder = (
    address: OrderAddress,
    deliveryTimeSlot: string,
    deliveryDate: string,
    discountCode?: string
  ): PlacedOrder => {
    let extraDiscount = 0;
    if (discountCode?.toUpperCase() === 'DIGI1403') {
      extraDiscount = Math.min(200000, cartFinalPrice * 0.1);
    } else if (discountCode?.toUpperCase() === 'PLUS') {
      extraDiscount = 100000;
    }

    const shippingFee = user.isPlusMember || cartFinalPrice > 500000 ? 0 : 49000;
    const finalAmount = Math.max(0, cartFinalPrice - extraDiscount + shippingFee);

    const newOrder: PlacedOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: `DKC-${Math.floor(1000000 + Math.random() * 9000000)}`,
      date: new Intl.DateTimeFormat('fa-IR').format(new Date()),
      items: [...cart],
      totalPrice: cartTotalPrice,
      totalDiscount: cartTotalDiscount + extraDiscount,
      shippingFee,
      finalPrice: finalAmount,
      address,
      deliveryDate,
      deliveryTimeSlot,
      status: 'processing',
      trackingCode: `TRK-${Math.floor(1000000000 + Math.random() * 9000000000)}`
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        language,
        setLanguage,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotalCount,
        cartTotalPrice,
        cartTotalDiscount,
        cartFinalPrice,
        wishlist,
        toggleWishlist,
        isInWishlist,
        compareList,
        addToCompare,
        removeFromCompare,
        isComparing,
        orders,
        placeOrder,
        user,
        updateUser,
        selectedProduct,
        setSelectedProduct,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        isSearchModalOpen,
        setIsSearchModalOpen,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
        isAssistantOpen,
        setIsAssistantOpen,
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
