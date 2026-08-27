export type Language = 'fa' | 'en';

export type ProductCategory = 
  | 'all'
  | 'smartphones-laptops'
  | 'audio-wearables'
  | 'gaming-console'
  | 'smart-home'
  | 'digital-gadgets'
  | 'lifestyle-accessories';

export type ActiveView = 
  | 'shop'
  | 'payment-page'
  | 'auth'
  | 'user-profile'
  | 'checkout'
  | 'order-success'
  | 'order-history'
  | 'gateway-settings'
  | 'dev-docs'
  | 'wishlist'
  | 'compare';

export interface ProductColor {
  nameFa: string;
  nameEn: string;
  hex: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBuyer?: boolean;
}

export interface Product {
  id: string;
  titleFa: string;
  titleEn: string;
  brand: string;
  category: ProductCategory;
  priceTomans: number;
  originalPriceTomans?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  image: string;
  gallery?: string[];
  colors?: ProductColor[];
  specsFa: { [key: string]: string };
  specsEn: { [key: string]: string };
  descriptionFa: string;
  descriptionEn: string;
  isFeatured?: boolean;
  isSpecialOffer?: boolean;
  badge?: string;
  reviews?: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: ProductColor;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  province: string;
  city: string;
  postalCode: string;
  address: string;
  recipientNote?: string;
  deliveryMethod?: 'express_post' | 'tipax' | 'instant_courier';
  preferredTimeSlot?: 'morning' | 'afternoon' | 'evening';
}

export type PaymentMethodType = 
  | 'zarinpal' 
  | 'saman_shaparak' 
  | 'mellat_shaparak'
  | 'nextpay'
  | 'idpay'
  | 'card_to_card' 
  | 'snapp_pay'
  | 'wallet';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number; // in Tomans
  discount: number;
  shippingFee: number;
  total: number;
  status: 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  paymentMethod: PaymentMethodType;
  transactionRefId?: string;
  authority?: string;
  cardPan?: string;
  shippingAddress: ShippingAddress;
  trackingCode: string;
  notes?: string;
}

export interface UserAccount {
  id: string;
  fullName: string;
  fullNameFa?: string;
  phone: string;
  email: string;
  nationalCode?: string;
  isVerified: boolean;
  registeredAt: string;
  walletBalanceTomans: number;
  savedAddresses?: ShippingAddress[];
  orders?: Order[];
}

export interface PaymentGatewayConfig {
  merchantId: string;
  isSandbox: boolean;
  currency: 'IRT' | 'IRR';
  callbackUrl: string;
  customApiUrl?: string;
}

export interface DirectPaymentRequest {
  invoiceNumber: string;
  payerName: string;
  payerPhone: string;
  payerEmail?: string;
  amountTomans: number;
  description: string;
  gateway: PaymentMethodType;
  isLegalEntity?: boolean;
  companyName?: string;
  economicCode?: string;
  couponCode?: string;
}

export interface ZarinpalRequestPayload {
  merchant_id: string;
  amount: number; // in Tomans
  currency?: 'IRT' | 'IRR';
  description: string;
  callback_url: string;
  metadata?: {
    mobile?: string;
    email?: string;
    order_id?: string;
  };
}

export interface ZarinpalRequestResponse {
  data: {
    code: number;
    message: string;
    authority: string;
    fee_type?: string;
    fee?: number;
  };
  errors?: Array<{
    code: number;
    message: string;
  }>;
}

export interface ZarinpalVerifyPayload {
  merchant_id: string;
  amount: number;
  authority: string;
}

export interface ZarinpalVerifyResponse {
  data: {
    code: number;
    message: string;
    card_pan?: string;
    card_hash?: string;
    ref_id?: number | string;
    fee_type?: string;
    fee?: number;
  };
  errors?: Array<{
    code: number;
    message: string;
  }>;
}

