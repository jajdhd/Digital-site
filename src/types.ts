export type Language = 'fa' | 'en';

export interface SellerOption {
  id: string;
  name: string;
  rating: number; // e.g. 4.8
  satisfiedPercent: number; // e.g. 94%
  warranty: string;
  price: number;
  discountPrice?: number;
  deliveryTime: string; // e.g. 'ارسال فوری دیجی‌کالا'
  isDigikalaWarehouse: boolean;
  stock: number;
}

export interface ProductColor {
  name: string;
  nameEn: string;
  hex: string;
  code: string;
}

export interface ReviewItem {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  positivePoints: string[];
  negativePoints: string[];
  likes: number;
  verifiedPurchase: boolean;
  colorBought?: string;
  sellerBought?: string;
}

export interface Product {
  id: string;
  titleFa: string;
  titleEn: string;
  brand: string;
  brandFa: string;
  category: string;
  categoryFa: string;
  subCategory?: string;
  subCategoryFa?: string;
  price: number; // in Tomans
  originalPrice?: number;
  discountPercent?: number;
  rating: number; // 0 to 5
  ratingCount: number;
  satisfiedPercent: number;
  images: string[];
  colors: ProductColor[];
  selectedColor?: ProductColor;
  defaultSeller: SellerOption;
  otherSellers: SellerOption[];
  specs: { [section: string]: { [key: string]: string } };
  highlights: string[];
  description: string;
  isShegeftangiz?: boolean;
  isFresh?: boolean;
  isPlus?: boolean;
  isJet?: boolean;
  stock: number;
  salesCount: number;
  cashback?: number; // Tomans returned with DigiPlus
  reviews: ReviewItem[];
  questionsCount: number;
}

export interface Category {
  id: string;
  titleFa: string;
  titleEn: string;
  icon: string;
  image: string;
  colorBg: string;
  subcategories: {
    titleFa: string;
    titleEn: string;
    items: string[];
  }[];
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedSeller: SellerOption;
  quantity: number;
}

export interface OrderAddress {
  fullName: string;
  phoneNumber: string;
  province: string;
  city: string;
  postalCode: string;
  streetAddress: string;
  buildingNumber: string;
  unit: string;
}

export interface PlacedOrder {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  totalPrice: number;
  totalDiscount: number;
  shippingFee: number;
  finalPrice: number;
  address: OrderAddress;
  deliveryDate: string;
  deliveryTimeSlot: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingCode: string;
}

export interface FilterOptions {
  searchQuery: string;
  category: string;
  subCategory: string;
  brand: string[];
  minPrice: number;
  maxPrice: number;
  onlyInStock: boolean;
  onlyShegeftangiz: boolean;
  onlyPlus: boolean;
  onlyJet: boolean;
  onlyFresh: boolean;
  sortBy: 'relevant' | 'bestselling' | 'popular' | 'newest' | 'cheapest' | 'expensive' | 'fastest';
}
