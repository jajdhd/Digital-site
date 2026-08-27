import { Category, Product } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'digital',
    titleFa: 'موبایل و کالای دیجیتال',
    titleEn: 'Mobile & Digital Goods',
    icon: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format&fit=crop&q=80',
    colorBg: 'bg-blue-50 text-blue-600',
    subcategories: [
      {
        titleFa: 'گوشی موبایل',
        titleEn: 'Mobile Phones',
        items: ['گوشی اپل (iPhone)', 'گوشی سامسونگ (Samsung)', 'گوشی شیائومی (Xiaomi)', 'گوشی پوکو (Poco)', 'گوشی موتورولا']
      },
      {
        titleFa: 'لپ‌تاپ و اولترابوک',
        titleEn: 'Laptops',
        items: ['لپ‌تاپ گیمینگ', 'مک‌بوک اپل', 'لپ‌تاپ ایسوس (Asus)', 'لپ‌تاپ لنوو (Lenovo)', 'لپ‌تاپ اچ‌پی']
      },
      {
        titleFa: 'لوازم جانبی دیجیتال',
        titleEn: 'Accessories',
        items: ['هندزفری و هدفون', 'پاوربانک و شارژر', 'ساعت و مچ‌بند هوشمند', 'اسپیکر بلوتوثی', 'کاور و قاب گوشی']
      },
      {
        titleFa: 'تبلت و کتابخوان',
        titleEn: 'Tablets',
        items: ['آیپد اپل', 'تبلت سامسونگ', 'تبلت شیائومی', 'قلم لمسی']
      }
    ]
  },
  {
    id: 'home',
    titleFa: 'خانه و آشپزخانه',
    titleEn: 'Home & Kitchen',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&auto=format&fit=crop&q=80',
    colorBg: 'bg-amber-50 text-amber-600',
    subcategories: [
      {
        titleFa: 'لوازم برقی خانگی',
        titleEn: 'Home Appliances',
        items: ['سرخ‌کن بدون روغن (Air Fryer)', 'اسپرسوساز و قهوه‌ساز', 'تلویزیون هوشمند', 'جاروبرقی و رباتیک', 'ماشین لباسشویی']
      },
      {
        titleFa: 'پخت و پز و سرو',
        titleEn: 'Cookware & Dining',
        items: ['سرویس قابلمه گرانیتی', 'سرویس چینی و آرکوپال', 'چاقو و ابزار آشپزی', 'کتری و قوری']
      },
      {
        titleFa: 'دکوراسیون و فرش',
        titleEn: 'Decor & Rugs',
        items: ['فرش ماشینی و دستباف', 'آباژور و چراغ تزئینی', 'ساعت دیواری', 'کوسن و رومیزی']
      }
    ]
  },
  {
    id: 'supermarket',
    titleFa: 'سوپرمارکت و کالاهای مصرفی',
    titleEn: 'Supermarket & FMCG',
    icon: 'ShoppingBasket',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80',
    colorBg: 'bg-emerald-50 text-emerald-600',
    subcategories: [
      {
        titleFa: 'کالاهای اساسی و خواربار',
        titleEn: 'Staples & Groceries',
        items: ['زعفران قائنات', 'برنج ایرانی طارم', 'روغن زیتون فرابکر', 'قند، شکر و نبات', 'ماکارونی و پاستا']
      },
      {
        titleFa: 'نوشیدنی و تنقلات',
        titleEn: 'Beverages & Snacks',
        items: ['قهوه دمی و اسپرسو', 'چای سرگل لاهیجان', 'شکلات و بیسکویت کادویی', 'پسته و خشکبار']
      },
      {
        titleFa: 'لبنیات و پروتئین',
        titleEn: 'Dairy & Protein',
        items: ['شیر و پنیر هراز', 'کره حیوانی', 'تخم مرغ محلی', 'ماست سنتی']
      }
    ]
  },
  {
    id: 'fashion',
    titleFa: 'مد و پوشاک',
    titleEn: 'Fashion & Apparel',
    icon: 'Shirt',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&auto=format&fit=crop&q=80',
    colorBg: 'bg-purple-50 text-purple-600',
    subcategories: [
      {
        titleFa: 'پوشاک مردانه',
        titleEn: 'Men Clothing',
        items: ['هودی و دورس زمستانه', 'پیراهن و تیشرت پنبه‌ای', 'شلوار جین و کتان', 'کت و کاپشن چرم']
      },
      {
        titleFa: 'پوشاک زنانه',
        titleEn: 'Women Clothing',
        items: ['مانتو و بارانی', 'شومیز و بلوز مجلسی', 'شلوار و لگ ورزشی', 'لباس راحتی']
      },
      {
        titleFa: 'کفش و اکسسوری',
        titleEn: 'Shoes & Accessories',
        items: ['کفش ورزشی و رانینگ', 'نیم‌بوت چرم طبیعی', 'ساعت مچی اصل', 'کیف و کوله‌پشتی']
      }
    ]
  },
  {
    id: 'beauty',
    titleFa: 'زیبایی و سلامت',
    titleEn: 'Beauty & Health',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&auto=format&fit=crop&q=80',
    colorBg: 'bg-pink-50 text-pink-600',
    subcategories: [
      {
        titleFa: 'مراقبت پوست و مو',
        titleEn: 'Skin & Hair Care',
        items: ['کرم ضدآفتاب رنگی و بی‌رنگ', 'سرم آبرسان هیالورونیک', 'شامپو ضد ریزش', 'ماسک مو کراتینه']
      },
      {
        titleFa: 'لوازم آرایشی',
        titleEn: 'Cosmetics',
        items: ['کرم پودر مات و بادوام', 'ریمل حجم‌دهنده', 'رژ لب مات و مایع', 'پالت سایه چشم']
      },
      {
        titleFa: 'عطر و ادکلن',
        titleEn: 'Perfumes',
        items: ['عطر مردانه تلخ و خنک', 'عطر زنانه شیرین و ملایم', 'بادی اسپلش و اسپری']
      }
    ]
  },
  {
    id: 'tools',
    titleFa: 'ابزارآلات و تجهیزات صنعتی',
    titleEn: 'Tools & Industrial',
    icon: 'Wrench',
    image: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=400&auto=format&fit=crop&q=80',
    colorBg: 'bg-orange-50 text-orange-600',
    subcategories: [
      {
        titleFa: 'ابزار برقی و شارژی',
        titleEn: 'Power Tools',
        items: ['دریل پیچ‌گوشتی شارژی', 'دستگاه فرز و سنگ‌فرز', 'اره برقی و عمودبر', 'کارواش خانگی']
      },
      {
        titleFa: 'ابزار دستی و جعبه ابزار',
        titleEn: 'Hand Tools',
        items: ['مجموعه کامل جعبه ابزار', 'آچار فرانسه و انبردست', 'متر لیزری و دقیق']
      }
    ]
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    titleFa: 'گوشی موبایل اپل مدل iPhone 16 Pro Max تک سیم‌کارت ظرفیت 512 گیگابایت و رم 8 گیگابایت',
    titleEn: 'Apple iPhone 16 Pro Max 512GB Natural Titanium',
    brand: 'Apple',
    brandFa: 'اپل',
    category: 'digital',
    categoryFa: 'موبایل و کالای دیجیتال',
    subCategory: 'Mobile Phones',
    subCategoryFa: 'گوشی موبایل',
    price: 98500000,
    originalPrice: 112000000,
    discountPercent: 12,
    rating: 4.8,
    ratingCount: 384,
    satisfiedPercent: 96,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'تیتانیوم طبیعی', nameEn: 'Natural Titanium', hex: '#9d9890', code: 'NAT' },
      { name: 'تیتانیوم مشکی', nameEn: 'Black Titanium', hex: '#2c2c2e', code: 'BLK' },
      { name: 'تیتانیوم سفید', nameEn: 'White Titanium', hex: '#f2f2f2', code: 'WHT' },
      { name: 'تیتانیوم صحرایی', nameEn: 'Desert Titanium', hex: '#c5b19d', code: 'DSR' }
    ],
    defaultSeller: {
      id: 'seller-1',
      name: 'دیجی‌کالا (ارسال مستقیم)',
      rating: 4.9,
      satisfiedPercent: 98,
      warranty: '۱۸ ماه گارانتی شرکتی و رجیستر شده همتا + ۷ روز ضمانت بازگشت',
      price: 98500000,
      deliveryTime: 'ارسال اکسپرس دیجی‌کالا (تحویل امروز)',
      isDigikalaWarehouse: true,
      stock: 14
    },
    otherSellers: [
      {
        id: 'seller-2',
        name: 'سیب طلایی پایتخت',
        rating: 4.6,
        satisfiedPercent: 92,
        warranty: '۱۸ ماه گارانتی جامع پارس تل',
        price: 99200000,
        deliveryTime: 'ارسال توسط فروشنده (۱ تا ۲ روز کاری)',
        isDigikalaWarehouse: false,
        stock: 5
      },
      {
        id: 'seller-3',
        name: 'تکنولایف مرکزی',
        rating: 4.7,
        satisfiedPercent: 94,
        warranty: '۱۸ ماه گارانتی الماس همراه',
        price: 101000000,
        deliveryTime: 'ارسال با دیجی‌پست اکسپرس',
        isDigikalaWarehouse: true,
        stock: 8
      }
    ],
    specs: {
      'مشخصات عمومی': {
        'ابعاد': '۱۶۳ × ۷۷.۶ × ۸.۲۵ میلی‌متر',
        'وزن': '۲۲۷ گرم',
        'جنس بدنه': 'فریم تیتانیوم گرید ۵، شیشه محافظ پشت و سرامیک شیلد جلو',
        'تعداد سیم‌کارت': 'یک سیم‌کارت فیزیکی + سیم‌کارت الکترونیکی (eSIM)'
      },
      'پردازنده و حافظه': {
        'تراشه': 'Apple A18 Pro (3 نانومتری نسل دوم)',
        'پردازنده گرافیکی': 'Apple GPU (6 هسته اختصاصی هوش مصنوعی)',
        'حافظه داخلی': '۵۱۲ گیگابایت',
        'حافظه رم': '۸ گیگابایت'
      },
      'صفحه‌نمایش': {
        'اندازه': '۶.۹ اینچ LTPO Super Retina XDR OLED',
        'نرخ نوسازی': '۱۲۰ هرتز ProMotion',
        'رزولوشن': '۱۳۲۰ × ۲۸۶۸ پیکسل',
        'روشنایی': '۲۰۰۰ نیت اوج روشنایی محیط باز'
      },
      'دوربین': {
        'دوربین اصلی': '۴۸ مگاپیکسل واید با سنسور لرزشگیر سنسور-شیفت',
        'دوربین اولتراواید': '۴۸ مگاپیکسل با فوکوس خودکار',
        'دوربین تله‌فوتو': '۱۲ مگاپیکسل تله‌فوتو با زوم ۵ برابری پریسکوپی',
        'فیلم‌برداری': '4K با سرعت ۱۲۰ فریم بر ثانیه Dolby Vision HDR'
      }
    },
    highlights: [
      'صفحه‌نمایش غول‌پیکر ۶.۹ اینچی بدون حاشیه',
      'دکمه جدید کنترل لمسی دوربین (Camera Control Button)',
      'تراشه فوق‌قدرتمند A18 Pro با قابلیت‌های هوش اپل',
      'شارژدهی باتری بی‌نظیر تا ۳۳ ساعت پخش مداوم ویدیو'
    ],
    description: 'آیفون ۱۶ پرو مکس نهایت نوآوری شرکت اپل است؛ بهره‌گیری از حاشیه‌های باریک‌تر تاریخ تلفن‌های هوشمند، ساختار مستحکم تیتانیوم گرید ۵، دکمه شاتر فیزیکی خازنی برای تنظیم فوکوس و زوم، و ضبط سینماتیک 4K 120fps.',
    isShegeftangiz: true,
    isPlus: true,
    isJet: true,
    stock: 14,
    salesCount: 1420,
    cashback: 500000,
    questionsCount: 48,
    reviews: [
      {
        id: 'rev-1',
        userName: 'آرش پیروزمهر',
        rating: 5,
        date: '۲ روز پیش',
        title: 'شاهکار بدون رقیب اپل',
        comment: 'کیفیت ساخت و نگه‌داری شارژ نسبت به ۱۵ پرو مکس خیلی بهتر شده. دکمه جدید کمرا کنترل هم برای عکاسی خیابانی فوق‌العاده کاربردیه.',
        positivePoints: ['کیفیت دوربین در شب و فیلمبرداری 120fps', 'باتری به شدت قدرتمند', 'حاشیه‌های فوق‌العاده باریک صفحه'],
        negativePoints: ['وزن و اندازه نسبتا بزرگ'],
        likes: 42,
        verifiedPurchase: true,
        colorBought: 'تیتانیوم طبیعی',
        sellerBought: 'دیجی‌کالا'
      },
      {
        id: 'rev-2',
        userName: 'سارا مهدی‌زاده',
        rating: 5,
        date: '۵ روز پیش',
        title: 'ارسال به موقع دیجی‌کالا و اصالت تضمینی',
        comment: 'کالا کاملا پلمپ به دستم رسید، ریجستر هم بدون هیچ مشکلی در سامانه همتا ثبت شد. از بسته‌بندی عالی دیجی‌کالا ممنونم.',
        positivePoints: ['بسته‌بندی ایمن و پلمپ معتبر', 'سرعت بالای پردازش'],
        negativePoints: ['عدم وجود آداپتور شارژر در جعبه'],
        likes: 19,
        verifiedPurchase: true,
        colorBought: 'تیتانیوم مشکی',
        sellerBought: 'دیجی‌کالا'
      }
    ]
  },
  {
    id: 'prod-2',
    titleFa: 'سرخ‌کن بدون روغن فیلیپس مدل HD9270 ظرفیت ۶.۲ لیتر با توان ۲۰۰۰ وات',
    titleEn: 'Philips Airfryer XL Essential HD9270 6.2L 2000W',
    brand: 'Philips',
    brandFa: 'فیلیپس',
    category: 'home',
    categoryFa: 'خانه و آشپزخانه',
    subCategory: 'Home Appliances',
    subCategoryFa: 'لوازم برقی خانگی',
    price: 6890000,
    originalPrice: 8400000,
    discountPercent: 18,
    rating: 4.7,
    ratingCount: 1450,
    satisfiedPercent: 95,
    images: [
      'https://images.unsplash.com/photo-1586208958839-06c17cacdf08?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'مشکی مات', nameEn: 'Matte Black', hex: '#1e1e1e', code: 'BLK' },
      { name: 'سفید صدفی', nameEn: 'Pearl White', hex: '#f5f5f5', code: 'WHT' }
    ],
    defaultSeller: {
      id: 'seller-philips',
      name: 'نمایندگی رسمی فیلیپس ایران',
      rating: 4.8,
      satisfiedPercent: 97,
      warranty: '۲۴ ماه گارانتی طلایی شرکت شکوفا الکتریک',
      price: 6890000,
      deliveryTime: 'ارسال رایگان دیجی‌کالا',
      isDigikalaWarehouse: true,
      stock: 45
    },
    otherSellers: [
      {
        id: 'seller-home1',
        name: 'لوازم خانگی شیک‌پوشان',
        rating: 4.5,
        satisfiedPercent: 90,
        warranty: '۱۸ ماه گارانتی آریا کیش',
        price: 7150000,
        deliveryTime: 'ارسال با پست پیشتاز',
        isDigikalaWarehouse: false,
        stock: 12
      }
    ],
    specs: {
      'مشخصات کلی': {
        'ظرفیت کاسه': '۶.۲ لیتر (مناسب برای ۵ الی ۶ نفر)',
        'توان مصرفی': '۲۰۰۰ وات پرقدرت',
        'تکنولوژی پخت': 'Rapid Air برای پخت با ۹۰ درصد روغن کمتر',
        'صفحه نمایش': 'لمسی دیجیتال با ۷ برنامه پیش‌فرض'
      },
      'امکانات ویژه': {
        'قابلیت گرم‌نگه‌دارنده': 'دارد (تا ۳۰ دقیقه)',
        'شستشوی آسان': 'قطعات جداشونده سازگار با ماشین ظرفشویی',
        'سیستم خاموشی خودکار': 'دارد'
      }
    },
    highlights: [
      'کاهش ۹۰ درصدی چربی غذاها بدون افت تردی',
      'کاسه نچسب بزرگ ۶.۲ لیتری مناسب یک مرغ کامل',
      'صفحه کنترل لمسی با برنامه‌های پخت سیب‌زمینی، گوشت و کیک'
    ],
    description: 'سرخ‌کن بدون روغن فیلیپس HD9270 از پرفروش‌ترین و محبوب‌ترین سرخ‌کن‌های بازار است. تکنولوژی Rapid Air گردش هوای داغ را برای پخت یکدست تضمین می‌کند.',
    isShegeftangiz: true,
    isPlus: true,
    isJet: false,
    stock: 45,
    salesCount: 8900,
    cashback: 100000,
    questionsCount: 112,
    reviews: [
      {
        id: 'rev-3',
        userName: 'مریم کمالی',
        rating: 5,
        date: 'هفته گذشته',
        title: 'بهترین وسیله آشپزخانه برای سلامت خانواده',
        comment: 'سیب‌زمینی، مرغ سوخاری و حتی کیک رو در نهایت تردی بدون حتی یک قاشق روغن درست می‌کنه. تمیز کردنش هم با ماشین ظرفشویی خیلی راحته.',
        positivePoints: ['پخت سریع و سالم', 'کاسه بزرگ', 'طراحی شیک'],
        negativePoints: ['کمی طول سیم کوتاه است'],
        likes: 67,
        verifiedPurchase: true,
        colorBought: 'مشکی مات',
        sellerBought: 'دیجی‌کالا'
      }
    ]
  },
  {
    id: 'prod-3',
    titleFa: 'هدفون بلوتوثی سونی مدل WH-1000XM5 با سیستم حذف نویز هوشمند Industry-Leading ANC',
    titleEn: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    brand: 'Sony',
    brandFa: 'سونی',
    category: 'digital',
    categoryFa: 'موبایل و کالای دیجیتال',
    subCategory: 'Accessories',
    subCategoryFa: 'لوازم جانبی دیجیتال',
    price: 18450000,
    originalPrice: 21900000,
    discountPercent: 16,
    rating: 4.9,
    ratingCount: 512,
    satisfiedPercent: 98,
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'مشکی کربنی', nameEn: 'Black', hex: '#1a1a1a', code: 'BLK' },
      { name: 'نقره‌ای پلاتینیومی', nameEn: 'Silver', hex: '#dedede', code: 'SLV' },
      { name: 'آبی سرمه‌ای نیمه‌شب', nameEn: 'Midnight Blue', hex: '#192841', code: 'BLU' }
    ],
    defaultSeller: {
      id: 'seller-sony',
      name: 'ایران‌سونی اورجینال',
      rating: 4.9,
      satisfiedPercent: 99,
      warranty: '۱۲ ماه گارانتی طلایی بازرگانی ایران',
      price: 18450000,
      deliveryTime: 'ارسال فوری جت (تحویل ۲ ساعته)',
      isDigikalaWarehouse: true,
      stock: 22
    },
    otherSellers: [
      {
        id: 'seller-audio',
        name: 'صدااستور پلاس',
        rating: 4.6,
        satisfiedPercent: 91,
        warranty: '۱۸ ماه گارانتی مادام‌العمر اصالت',
        price: 18900000,
        deliveryTime: 'ارسال فردا',
        isDigikalaWarehouse: false,
        stock: 7
      }
    ],
    specs: {
      'مشخصات فنی صدا': {
        'درایور': '۳۰ میلی‌متری فیبر کربن تقویت‌شده',
        'محدوده فرکانس': '۴ هرتز تا ۴۰,۰۰۰ هرتز (Hi-Res Audio)',
        'پشتیبانی از کدک‌ها': 'LDAC, AAC, SBC, DSEE Extreme',
        'میکروفون': '۸ عدد میکروفون اختصاصی نویز کنسلینگ و مکالمه شفاف'
      },
      'باتری و اتصالات': {
        'عمر باتری': '۳۰ ساعت با ANC روشن / ۴۰ ساعت بدون ANC',
        'شارژ سریع': '۳ دقیقه شارژ = ۳ ساعت پخش موسیقی',
        'نوع اتصال': 'بلوتوث ۵.۲ و جک ۳.۵ میلی‌متری'
      }
    },
    highlights: [
      'برترین نویز کنسلینگ فعال جهان با پردازنده دوگانه QN1 و V1',
      'کیفیت مکالمه بی‌نظیر با تکنولوژی هوش مصنوعی ایزولاسیون صدا',
      'طراحی فوق‌العاده راحت با فوم نرم بدون ایجاد فشار روی گوش'
    ],
    description: 'هدفون پرچمدار سونی WH-1000XM5 معیارهای صنعت موسیقی و هدفون‌های نویز کنسلینگ را بازتعریف کرده است. وزن سبک و حذف کامل صدای محیط تجربه‌ای جادویی ایجاد می‌کند.',
    isShegeftangiz: true,
    isPlus: true,
    isJet: true,
    stock: 22,
    salesCount: 2300,
    cashback: 250000,
    questionsCount: 64,
    reviews: []
  },
  {
    id: 'prod-4',
    titleFa: 'اسپرسوساز دلونگی مدل Dedica EC685 توان ۱۳۵۰ وات با بدنه استیل ضدزنگ',
    titleEn: 'Delonghi Dedica Style Pump Espresso Machine EC685.M',
    brand: 'Delonghi',
    brandFa: 'دلونگی',
    category: 'home',
    categoryFa: 'خانه و آشپزخانه',
    subCategory: 'Home Appliances',
    subCategoryFa: 'لوازم برقی خانگی',
    price: 9400000,
    originalPrice: 10800000,
    discountPercent: 13,
    rating: 4.8,
    ratingCount: 890,
    satisfiedPercent: 96,
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'استیل متالیک', nameEn: 'Metallic Steel', hex: '#a6a6a6', code: 'STL' },
      { name: 'مشکی براق', nameEn: 'Glossy Black', hex: '#111111', code: 'BLK' },
      { name: 'قرمز متالیک', nameEn: 'Red Velvet', hex: '#b31b1b', code: 'RED' }
    ],
    defaultSeller: {
      id: 'seller-delonghi',
      name: 'دیجی‌کالا (تضمین اصالت برند دلونگی)',
      rating: 4.9,
      satisfiedPercent: 97,
      warranty: '۲۴ ماه گارانتی رسمی سنجه کیش',
      price: 9400000,
      deliveryTime: 'ارسال رایگان دیجی‌کالا',
      isDigikalaWarehouse: true,
      stock: 30
    },
    otherSellers: [],
    specs: {
      'مشخصات فنی': {
        'فشار بخار': '۱۵ بار واقعی استاندارد ایتالیا',
        'توان موتور': '۱۳۵۰ وات با سیستم ترموبلاک سریع',
        'گنجایش مخزن آب': '۱.۱ لیتر قابل جداشدن',
        'عرض دستگاه': 'تنها ۱۵ سانتی‌متر (فوق باریک و کم‌جا)'
      }
    },
    highlights: [
      'نازل بخار دستی برای تهیه فوم شیر خامه‌ای کاپوچینو و لاته',
      'استفاده از پودر قهوه و پد قهوه ESE',
      'سینی چکه‌گیر دو سطحه برای ماگ‌های بلند'
    ],
    description: 'اسپرسوساز جمع‌وجور دلونگی Dedica 685 با طراحی بدنه تمام استیل و پمپ ایتالیایی ۱۵ بار، کیفیت عصاره‌گیری کافه‌های حرفه‌ای را به آشپزخانه شما می‌آورد.',
    isShegeftangiz: false,
    isPlus: true,
    isJet: false,
    stock: 30,
    salesCount: 4100,
    cashback: 120000,
    questionsCount: 88,
    reviews: []
  },
  {
    id: 'prod-5',
    titleFa: 'زعفران سرگل ممتاز قائنات زروند کادویی - بسته ۵ گرمی خاتم با هاون برنجی',
    titleEn: 'Zarvand Ghaenat Premium Super Negin Saffron 5g Gift Box',
    brand: 'Zarvand',
    brandFa: 'زروند',
    category: 'supermarket',
    categoryFa: 'سوپرمارکت و کالاهای مصرفی',
    subCategory: 'Staples & Groceries',
    subCategoryFa: 'کالاهای اساسی و خواربار',
    price: 490000,
    originalPrice: 650000,
    discountPercent: 25,
    rating: 4.9,
    ratingCount: 2300,
    satisfiedPercent: 98,
    images: [
      'https://images.unsplash.com/photo-1608797178974-15b35a6396f4?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'جعبه خاتم سنتی', nameEn: 'Traditional Box', hex: '#d4af37', code: 'GLD' }
    ],
    defaultSeller: {
      id: 'seller-fresh1',
      name: 'دیجی‌کالا فرش (سوپرمارکت فوری)',
      rating: 4.9,
      satisfiedPercent: 99,
      warranty: 'ضمانت بازگشت ۱۰۰٪ وجه در صورت عدم رضایت از عطر و رنگ',
      price: 490000,
      deliveryTime: 'ارسال با دیجی‌کالا جت (زیر ۴۵ دقیقه)',
      isDigikalaWarehouse: true,
      stock: 150
    },
    otherSellers: [],
    specs: {
      'مشخصات محصول': {
        'نوع زعفران': 'سوپر نگین اعلا برداشت امسال',
        'وزن خالص': '۵ گرم',
        'محل کشت': 'مزارع ارگانیک قائنات خراسان جنوبی',
        'بسته‌بندی': 'قوطی فلزی خاتم‌کاری ضد نفوذ رطوبت و نور'
      }
    },
    highlights: [
      'عطر و رنگ‌دهی بی‌نظیر با کروسین بالای ۲۶۰',
      'همراه با هاون برنجی سنتی مخصوص سابیدن',
      'مناسب هدیه و سوغات اصیل ایرانی'
    ],
    description: 'زعفران سوپر نگین زروند از کلاله‌های دست‌چین شده با بالاترین استانداردهای بهداشتی بسته‌بندی شده است.',
    isShegeftangiz: true,
    isFresh: true,
    isPlus: true,
    isJet: true,
    stock: 150,
    salesCount: 12400,
    cashback: 15000,
    questionsCount: 22,
    reviews: []
  },
  {
    id: 'prod-6',
    titleFa: 'سرم آبرسان و مرطوب‌کننده قوی پوست کلینیک مدل Moisture Surge 100H حجم ۵۰ میلی‌لیتر',
    titleEn: 'Clinique Moisture Surge 100H Auto-Replenishing Hydrator 50ml',
    brand: 'Clinique',
    brandFa: 'کلینیک',
    category: 'beauty',
    categoryFa: 'زیبایی و سلامت',
    subCategory: 'Skin & Hair Care',
    subCategoryFa: 'مراقبت پوست و مو',
    price: 2450000,
    originalPrice: 3100000,
    discountPercent: 21,
    rating: 4.8,
    ratingCount: 670,
    satisfiedPercent: 95,
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'بدون رنگ (ژل کرم)', nameEn: 'Clear Gel', hex: '#fbcfe8', code: 'PNK' }
    ],
    defaultSeller: {
      id: 'seller-beauty',
      name: 'دیجی‌کالا (برچسب اصالت سازمان غذا و دارو)',
      rating: 4.9,
      satisfiedPercent: 98,
      warranty: 'ضمانت اصالت و سلامت فیزیکی کالا',
      price: 2450000,
      deliveryTime: 'ارسال اکسپرس دیجی‌کالا',
      isDigikalaWarehouse: true,
      stock: 40
    },
    otherSellers: [],
    specs: {
      'مشخصات زیبایی': {
        'حجم': '۵۰ میلی‌لیتر',
        'مناسب برای انواع پوست': 'خشک، مختلط، چرب و حساس',
        'ترکیبات اصلی': 'هیالورونیک اسید با دو وزن مولکولی، بیوفرمنت آلوئه‌ورا و ویتامین C و E',
        'ماندگاری رطوبت': 'تا ۱۰۰ ساعت پس از شستشوی صورت'
      }
    },
    highlights: [
      'نفوذ به ۱۰ لایه عمقی پوست برای آبرسانی فوری',
      'فرمولاسیون ۱۰۰٪ فاقد چربی، عطر و پارابن',
      'ایجاد شفافیت و نرمی ابریشمی بدون احساس سنگینی'
    ],
    description: 'ژل کرم آبرسان ۱۰۰ ساعته مویسچر سرج کلینیک با فناوری Auto-Replenishing منبع رطوبت درونی پوست را برای شفافیت و طراوت مداوم فعال نگه می‌دارد.',
    isShegeftangiz: true,
    isPlus: true,
    isJet: false,
    stock: 40,
    salesCount: 3800,
    cashback: 40000,
    questionsCount: 41,
    reviews: []
  },
  {
    id: 'prod-7',
    titleFa: 'کفش ورزشی مخصوص دویدن نایک مدل Air Zoom Pegasus 40 اورجینال مردانه',
    titleEn: 'Nike Air Zoom Pegasus 40 Mens Running Shoes',
    brand: 'Nike',
    brandFa: 'نایک',
    category: 'fashion',
    categoryFa: 'مد و پوشاک',
    subCategory: 'Shoes & Accessories',
    subCategoryFa: 'کفش و اکسسوری',
    price: 7900000,
    originalPrice: 9500000,
    discountPercent: 17,
    rating: 4.7,
    ratingCount: 310,
    satisfiedPercent: 93,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'قرمز - مشکی ورزشی', nameEn: 'Red Nike Fire', hex: '#d32f2f', code: 'RED' },
      { name: 'مشکی کلاسیک', nameEn: 'Triple Black', hex: '#111111', code: 'BLK' },
      { name: 'سفید یخی', nameEn: 'Pure Platinum', hex: '#f0f0f0', code: 'WHT' }
    ],
    defaultSeller: {
      id: 'seller-sport',
      name: 'فروشگاه رسمی استایل پایتخت',
      rating: 4.8,
      satisfiedPercent: 95,
      warranty: 'ضمانت ۷ روزه تعویض سایز رایگان و اصالت کالا',
      price: 7900000,
      deliveryTime: 'ارسال با دیجی‌پلاس رایگان',
      isDigikalaWarehouse: true,
      stock: 18
    },
    otherSellers: [],
    specs: {
      'مشخصات فیزیکی و جنس': {
        'رویه': 'مش مهندسی شده با تهویه هوای ۳۶۰ درجه',
        'زیره میانی': 'فوم اختصاصی Nike React همراه با ۲ بالشتک Air Zoom',
        'زیره خارجی': 'لاستیک تقویت‌شده با الگوی گریپ بالا روی آسفالت',
        'کاربرد': 'دویدن، پیاده‌روی طولانی و استفاده روزمره'
      }
    },
    highlights: [
      'بالشتک‌های نرم و پرانرژی برای جلوگیری از فشار به زانو و کمر',
      'رویه تنفس‌پذیر جهت جلوگیری از تعریق پا در فعالیت طولانی',
      'طراحی ارگونومیک با ثبات عالی در قسمت پاشنه'
    ],
    description: 'کفش پگاسوس ۴۰ نایک نماد راحتی و دوام برای دوندگان در سراسر دنیاست که تعادل عالی میان نرمی و استحکام ارائه می‌دهد.',
    isShegeftangiz: false,
    isPlus: true,
    isJet: false,
    stock: 18,
    salesCount: 1650,
    cashback: 90000,
    questionsCount: 30,
    reviews: []
  },
  {
    id: 'prod-8',
    titleFa: 'دریل پیچ‌گوشتی چکشی شارژی رونیکس مدل 8614K براشلس همراه با باتری یدک و کیف BMC',
    titleEn: 'Ronix 8614K Brushless Cordless Impact Drill 20V Kit',
    brand: 'Ronix',
    brandFa: 'رونیکس',
    category: 'tools',
    categoryFa: 'ابزارآلات و تجهیزات صنعتی',
    subCategory: 'Power Tools',
    subCategoryFa: 'ابزار برقی و شارژی',
    price: 4350000,
    originalPrice: 5200000,
    discountPercent: 16,
    rating: 4.8,
    ratingCount: 420,
    satisfiedPercent: 96,
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'قرمز رونیکس صنعتی', nameEn: 'Ronix Industrial Red', hex: '#d32f2f', code: 'RED' }
    ],
    defaultSeller: {
      id: 'seller-tools',
      name: 'ابزار سرای صنعتی ایران',
      rating: 4.9,
      satisfiedPercent: 98,
      warranty: '۱۲ ماه گارانتی رسمی رونیکس سرویس در سراسر کشور',
      price: 4350000,
      deliveryTime: 'ارسال با دیجی‌کالا اکسپرس',
      isDigikalaWarehouse: true,
      stock: 25
    },
    otherSellers: [],
    specs: {
      'مشخصات فنی': {
        'ولتاژ باتری': '۲۰ ولت لیتیوم-یون ۲ آمپرساعت سامسونگ',
        'نوع موتور': 'موتور براشلس (بدون ذغال) نسل جدید ضدآب',
        'حداکثر گشتاور': '۴۵ نیوتن‌متر',
        'تعداد حالت‌های ترکمتر': '۲۱+۳ حالت تنظیم گشتاور و ضربه'
      }
    },
    highlights: [
      'موتور ضدآب براشلس با طول عمر ۳ برابری',
      'دارای ۲ عدد باتری ۲۰ ولت با شارژر فست شارژ',
      'کیف ضدضربه BMC به همراه ست مته و سرپیچ‌گوشتی'
    ],
    description: 'دریل شارژی چکشی رونیکس مدل 8614K یکی از کارآمدترین و پرقدرت‌ترین دریل‌های مناسب مصارف حرفه‌ای و کارگاهی با گارانتی سراسری است.',
    isShegeftangiz: true,
    isPlus: false,
    isJet: false,
    stock: 25,
    salesCount: 2800,
    cashback: 50000,
    questionsCount: 35,
    reviews: []
  },
  {
    id: 'prod-9',
    titleFa: 'ساعت هوشمند سامسونگ مدل Galaxy Watch 7 سایز 44mm فریم آلومینیومی با هوش مصنوعی Galaxy AI',
    titleEn: 'Samsung Galaxy Watch 7 44mm Bluetooth Smartwatch',
    brand: 'Samsung',
    brandFa: 'سامسونگ',
    category: 'digital',
    categoryFa: 'موبایل و کالای دیجیتال',
    subCategory: 'Accessories',
    subCategoryFa: 'لوازم جانبی دیجیتال',
    price: 13900000,
    originalPrice: 16200000,
    discountPercent: 14,
    rating: 4.7,
    ratingCount: 280,
    satisfiedPercent: 94,
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'سبز ارتشی تیره', nameEn: 'Dark Green', hex: '#3d4d3d', code: 'GRN' },
      { name: 'نقره‌ای شیک', nameEn: 'Silver', hex: '#e2e8f0', code: 'SLV' }
    ],
    defaultSeller: {
      id: 'seller-sam',
      name: 'سام‌سرویس پایتخت',
      rating: 4.9,
      satisfiedPercent: 97,
      warranty: '۱۸ ماه گارانتی هماهنگ و رجیستر رسمی',
      price: 13900000,
      deliveryTime: 'ارسال فوری دیجی‌کالا',
      isDigikalaWarehouse: true,
      stock: 19
    },
    otherSellers: [],
    specs: {
      'طراحی و نمایشگر': {
        'اندازه صفحه': '۱.۵ اینچ Super AMOLED با رزولوشن ۴۸۰×۴۸۰',
        'محافظ صفحه': 'یاقوت کبود (Sapphire Crystal) ضدخش',
        'مقاومت در برابر آب': '5ATM + IP68 استاندارد نظامی MIL-STD-810H'
      },
      'سنسورها و سلامت': {
        'سنسور BioActive نسل جدید': 'ضربان قلب، نوار قلب ECG، درصد چربی و عضلات بدن (BIA)، سنجش شاخص AGEs قند خون',
        'ردیابی خواب': 'تحلیل هوشمند آپنه خواب با Galaxy AI'
      }
    },
    highlights: [
      'تراشه ۳ نانومتری Exynos W1000 با سرعت ۳ برابر',
      'جی‌پی‌اس دو فرکانسه فوق‌العاده دقیق Dual-frequency GPS',
      'مجهز به هوش مصنوعی گلکسی برای امتیازدهی به انرژی روزانه (Energy Score)'
    ],
    description: 'گلکسی واچ ۷ سامسونگ همراهی بی‌نقص برای پایش سلامت و ورزش روزمره است که با شیشه مقاوم یاقوت کبود و تراشه پیشرفته ۳ نانومتری عملکردی روان فراهم می‌سازد.',
    isShegeftangiz: true,
    isPlus: true,
    isJet: true,
    stock: 19,
    salesCount: 1950,
    cashback: 150000,
    questionsCount: 52,
    reviews: []
  },
  {
    id: 'prod-10',
    titleFa: 'روغن زیتون فرابکر ایرانی طارم لوشان - شیشه ۱ لیتری با اسیدیته زیر ۰.۵ درصد',
    titleEn: 'Tarom Premium Extra Virgin Olive Oil 1000ml',
    brand: 'Tarom',
    brandFa: 'طارم',
    category: 'supermarket',
    categoryFa: 'سوپرمارکت و کالاهای مصرفی',
    subCategory: 'Staples & Groceries',
    subCategoryFa: 'کالاهای اساسی و خواربار',
    price: 380000,
    originalPrice: 460000,
    discountPercent: 17,
    rating: 4.9,
    ratingCount: 1800,
    satisfiedPercent: 97,
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'شیشه مات تیره محافظ', nameEn: 'Dark Bottle', hex: '#2e4a2e', code: 'BOT' }
    ],
    defaultSeller: {
      id: 'seller-fresh2',
      name: 'دیجی‌کالا فرش',
      rating: 4.9,
      satisfiedPercent: 99,
      warranty: 'تضمین صددرصدی خلوص و طعم ارگانیک',
      price: 380000,
      deliveryTime: 'ارسال با جت سوپرمارکت',
      isDigikalaWarehouse: true,
      stock: 110
    },
    otherSellers: [],
    specs: {
      'مشخصات': {
        'نوع فرآوری': 'پرس سرد اولیه (Cold Pressed Extra Virgin)',
        'حجم': '۱۰۰۰ میلی‌لیتر (۱ لیتر)',
        'بسته‌بندی': 'بطری شیشه‌ای تیره جهت حفظ آنتی‌اکسیدان‌ها'
      }
    },
    highlights: [
      'روغن زیتون خالص بدون هیچ‌گونه ماده افزودنی شیمیایی',
      'عطر و طعم مطبوع زیتون تازه و طعم تند طبیعی ته گلو',
      'ایده‌آل برای پخت و پز ملایم، سالاد و رژیم سلامت قلب'
    ],
    description: 'روغن زیتون فرابکر مزارع باغات طارم از مرغوب‌ترین زیتون‌های دستچین تولید شده و منبعی سرشار از پلی‌فنول‌ها و اسیدهای چرب غیراشباع است.',
    isShegeftangiz: false,
    isFresh: true,
    isPlus: true,
    isJet: true,
    stock: 110,
    salesCount: 8900,
    cashback: 10000,
    questionsCount: 14,
    reviews: []
  }
];

export const HERO_BANNERS = [
  {
    id: 1,
    titleFa: 'شگفت‌انگیزهای بهاری دیجی‌کالا',
    subtitleFa: 'تا ۷۰٪ تخفیف روی هزاران کالای دیجیتال، مد و زیبایی',
    titleEn: 'Spring Incredible Offers',
    subtitleEn: 'Up to 70% off on electronics, fashion and beauty',
    badgeFa: 'پیشنهاد محدود',
    badgeEn: 'Limited Offer',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&auto=format&fit=crop&q=80',
    colorGradient: 'from-rose-600 to-red-600',
    ctaLink: 'shegeftangiz'
  },
  {
    id: 2,
    titleFa: 'جشنواره گوشی‌های پرچمدار ۲۰۲۵',
    subtitleFa: 'خرید با گارانتی معتبر شرکتی و ارسال رایگان در همان روز',
    titleEn: 'Flagship Smartphones Festival 2025',
    subtitleEn: 'Official warranty & same-day free delivery',
    badgeFa: 'تحویل اکسپرس',
    badgeEn: 'Express Delivery',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1600&auto=format&fit=crop&q=80',
    colorGradient: 'from-blue-700 to-indigo-800',
    ctaLink: 'digital'
  },
  {
    id: 3,
    titleFa: 'دیجی‌کالا فرش: سوپرمارکت در ۴۵ دقیقه',
    subtitleFa: 'تخفیف‌های تکرارنشدنی تا ۵۰٪ روی خواربار و لبنیات تازه',
    titleEn: 'Digikala Fresh: 45-Min Groceries',
    subtitleEn: 'Up to 50% discount on fresh groceries and dairy',
    badgeFa: 'ارسال با جت',
    badgeEn: 'Jet Delivery',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&auto=format&fit=crop&q=80',
    colorGradient: 'from-emerald-600 to-teal-700',
    ctaLink: 'supermarket'
  }
];

export const SERVICE_STORIES = [
  { id: 'jet', titleFa: 'دیجی‌کالا جت', titleEn: 'DigiJet', icon: 'Zap', color: 'bg-purple-600', badge: 'تحویل ۴۵ دقیقه' },
  { id: 'fresh', titleFa: 'شگفت‌انگیز سوپرمارکت', titleEn: 'Fresh Supermarket', icon: 'ShoppingBag', color: 'bg-emerald-600', badge: 'تخفیف تا ۵۰٪' },
  { id: 'pay', titleFa: 'دیجی‌پی', titleEn: 'DigiPay', icon: 'CreditCard', color: 'bg-blue-600', badge: 'وام و اقساط' },
  { id: 'plus', titleFa: 'دیجی‌پلاس', titleEn: 'DigiPlus', icon: 'Crown', color: 'bg-fuchsia-600', badge: 'ارسال رایگان' },
  { id: 'gift', titleFa: 'کارت هدیه', titleEn: 'Gift Card', icon: 'Gift', color: 'bg-rose-500', badge: 'ارسال آنی' },
  { id: 'service', titleFa: 'دیجی‌کالا سرویس', titleEn: 'DigiService', icon: 'ShieldCheck', color: 'bg-cyan-600', badge: 'بیمه و گارانتی' },
  { id: 'wheel', titleFa: 'گردونه شانس', titleEn: 'Lucky Wheel', icon: 'Sparkles', color: 'bg-amber-500', badge: 'جایزه روزانه' },
  { id: 'style', titleFa: 'حراج استایل', titleEn: 'Style Sale', icon: 'Flame', color: 'bg-red-500', badge: 'مد و پوشاک' }
];

export const BRAND_LOGOS = [
  { name: 'Apple', nameFa: 'اپل', logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=160&auto=format&fit=crop&q=80' },
  { name: 'Samsung', nameFa: 'سامسونگ', logo: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=160&auto=format&fit=crop&q=80' },
  { name: 'Sony', nameFa: 'سونی', logo: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=160&auto=format&fit=crop&q=80' },
  { name: 'Philips', nameFa: 'فیلیپس', logo: 'https://images.unsplash.com/photo-1586208958839-06c17cacdf08?w=160&auto=format&fit=crop&q=80' },
  { name: 'Nike', nameFa: 'نایک', logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=160&auto=format&fit=crop&q=80' },
  { name: 'Ronix', nameFa: 'رونیکس', logo: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=160&auto=format&fit=crop&q=80' }
];
