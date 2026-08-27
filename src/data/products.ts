import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // 1. SMARTPHONES & LAPTOPS
  {
    id: 'prod-1',
    titleFa: 'گوشی موبایل اپل مدل iPhone 16 Pro Max ظرفیت 256 گیگابایت',
    titleEn: 'Apple iPhone 16 Pro Max 256GB - Desert Titanium',
    brand: 'Apple',
    category: 'smartphones-laptops',
    priceTomans: 98500000,
    originalPriceTomans: 105000000,
    discountPercent: 6,
    rating: 4.9,
    reviewCount: 142,
    inStock: true,
    stockCount: 8,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { nameFa: 'تیتانیوم کویری', nameEn: 'Desert Titanium', hex: '#C2B19F' },
      { nameFa: 'تیتانیوم مشکی', nameEn: 'Black Titanium', hex: '#282829' },
      { nameFa: 'تیتانیوم طبیعی', nameEn: 'Natural Titanium', hex: '#9E9A93' }
    ],
    specsFa: {
      'صفحه نمایش': '6.9 اینچ Super Retina XDR OLED با ProMotion 120Hz',
      'پردازنده': 'Apple A18 Pro (3 نانومتری)',
      'دوربین': 'سه گانه 48 + 48 + 12 مگاپیکسل با فیلمبرداری 4K 120fps Dolby Vision',
      'باتری': 'پشتیبانی از شارژ سریع MagSafe و شارژدهی تا 33 ساعت',
      'گارانتی': '۱۸ ماه گارانتی شرکتی + رجیستری رسمی همتا'
    },
    specsEn: {
      'Display': '6.9" Super Retina XDR OLED 120Hz ProMotion',
      'Processor': 'Apple A18 Pro Chip (3nm)',
      'Camera': 'Triple 48MP + 48MP + 12MP 4K 120fps Dolby Vision',
      'Battery': 'MagSafe fast charging, up to 33 hours video playback',
      'Warranty': '18-month official registered warranty'
    },
    descriptionFa: 'پرچمدار بی‌رقیب اپل با فریم تیتانیومی فوق‌سبک، دکمه Camera Control جدید برای عکاسی فوق‌حرفه‌ای، چیپست فوق‌العاده A18 Pro با قابلیت اجرای بازی‌های کنسولی و هوش مصنوعی Apple Intelligence.',
    descriptionEn: 'The flagship powerhouse from Apple featuring grade 5 titanium design, all-new Camera Control, A18 Pro chip, and industry-leading battery life.',
    isFeatured: true,
    isSpecialOffer: true,
    badge: 'پیشنهاد شگفت‌انگیز',
    reviews: [
      {
        id: 'rev-1',
        author: 'رضا طباطبایی',
        rating: 5,
        date: '۱۴۰۴/۱۲/۰۲',
        comment: 'کیفیت ساخت بدنه تیتانیومی فوق‌العاده سبکه و کلید جدید Camera Control عکاسی رو خیلی راحت کرده. ارسال رستم شاپ هم ۲ ساعته به دستم رسید.',
        verifiedBuyer: true
      },
      {
        id: 'rev-2',
        author: 'سارا کاظمی',
        rating: 5,
        date: '۱۴۰۴/۱۱/۲۵',
        comment: 'عمر باتری بی‌نظیره و رجیستری همتا بلافاصله پیامکش اومد. تشکر از پشتیبانی خوب رستم شاپ.',
        verifiedBuyer: true
      }
    ]
  },
  {
    id: 'prod-4',
    titleFa: 'لپ‌تاپ 14 اینچی مک‌بوک پرو M3 Pro اپل ۱۸ گیگابایت رم',
    titleEn: 'Apple MacBook Pro 14" M3 Pro (18GB / 512GB SSD) - Space Black',
    brand: 'Apple',
    category: 'smartphones-laptops',
    priceTomans: 118000000,
    originalPriceTomans: 125000000,
    discountPercent: 5,
    rating: 5.0,
    reviewCount: 54,
    inStock: true,
    stockCount: 4,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    colors: [
      { nameFa: 'مشکی فضایی', nameEn: 'Space Black', hex: '#242426' },
      { nameFa: 'نقره‌ای متالیک', nameEn: 'Silver Metallic', hex: '#E1E1E6' }
    ],
    specsFa: {
      'پردازنده': 'Apple M3 Pro با ۱۱ هسته پردازشی و ۱۴ هسته گرافیکی',
      'حافظه رم': '۱۸ گیگابایت حافظه یکپارچه پرسرعت Unified Memory',
      'نمایشگر': 'Liquid Retina XDR با روشنایی ۱۶۰۰ نیت و فناوری ProMotion',
      'پورت‌ها': 'سه پورت Thunderbolt 4, پورت HDMI, شیار SDXC و MagSafe 3'
    },
    specsEn: {
      'Processor': 'Apple M3 Pro 11-core CPU, 14-core GPU',
      'Unified RAM': '18GB high-bandwidth unified memory',
      'Screen': '14.2" Liquid Retina XDR 120Hz 1600 nits peak HDR',
      'Ports': '3x Thunderbolt 4, HDMI, SDXC slot, MagSafe 3'
    },
    descriptionFa: 'دستگاه کار حرفه‌ای برای برنامه‌نویسان، تدوین‌گران ویدیو 8K و طراحان 3D با بدنه آنودایز ضد اثر انگشت و بازدهی باتری تا ۱۸ ساعت مداوم.',
    descriptionEn: 'Mind-blowing performance and revolutionary power efficiency with hardware-accelerated ray tracing and Liquid Retina XDR screen.',
    isFeatured: true,
    isSpecialOffer: false,
    badge: 'انتخاب حرفه‌ای‌ها'
  },
  {
    id: 'prod-9',
    titleFa: 'گوشی موبایل سامسونگ Galaxy S24 Ultra 5G ظرفیت 512GB با قلم S-Pen',
    titleEn: 'Samsung Galaxy S24 Ultra 5G 512GB Titanium Gray with S-Pen',
    brand: 'Samsung',
    category: 'smartphones-laptops',
    priceTomans: 74900000,
    originalPriceTomans: 81000000,
    discountPercent: 8,
    rating: 4.8,
    reviewCount: 167,
    inStock: true,
    stockCount: 11,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80',
    colors: [
      { nameFa: 'خاکستری تیتانیومی', nameEn: 'Titanium Gray', hex: '#6E7072' },
      { nameFa: 'مشکی تیتانیوم', nameEn: 'Titanium Black', hex: '#2A2A2B' },
      { nameFa: 'زرد تیتانیومی', nameEn: 'Titanium Yellow', hex: '#D2BF8E' }
    ],
    specsFa: {
      'صفحه نمایش': '6.8 اینچ Dynamic AMOLED 2X 120Hz با شیشه ضد بازتاب Gorilla Armor',
      'پردازنده': 'Snapdragon 8 Gen 3 for Galaxy (4 نانومتری)',
      'هوش مصنوعی': 'مجموعه ابزارهای Galaxy AI با ترجمه زنده و Circle to Search',
      'دوربین': 'چهارگانه 200 + 50 + 10 + 12 مگاپیکسل با زوم 100 برابری'
    },
    specsEn: {
      'Display': '6.8" Dynamic AMOLED 2X 120Hz with Anti-reflective Gorilla Armor',
      'Processor': 'Snapdragon 8 Gen 3 for Galaxy (4nm)',
      'AI Features': 'Galaxy AI with Live Translate, Note Assist & Circle to Search',
      'Camera': 'Quad 200MP + 50MP 5x + 10MP 3x + 12MP ultrawide 100x Space Zoom'
    },
    descriptionFa: 'غول اندرویدی با بدنه تیتانیوم مستحکم، قلم دیجیتال توکار و هوش مصنوعی گلکسی برای خلاقیت، ترجمه لحظه‌ای مکالمات و عکاسی نجومی در شب.',
    descriptionEn: 'The ultimate Galaxy AI experience with flat titanium screen, embedded S-Pen, and groundbreaking 200MP telephoto camera.',
    isFeatured: false,
    isSpecialOffer: true,
    badge: 'هوش مصنوعی Galaxy AI'
  },
  {
    id: 'prod-10',
    titleFa: 'لپ‌تاپ گیمینگ ایسوس ROG Zephyrus G16 با گرافیک RTX 4080',
    titleEn: 'ASUS ROG Zephyrus G16 (Core Ultra 9 / RTX 4080 / 32GB RAM)',
    brand: 'ASUS ROG',
    category: 'smartphones-laptops',
    priceTomans: 139000000,
    originalPriceTomans: 148000000,
    discountPercent: 6,
    rating: 4.9,
    reviewCount: 38,
    inStock: true,
    stockCount: 3,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80',
    colors: [
      { nameFa: 'خاکستری اکلیپسی', nameEn: 'Eclipse Gray', hex: '#3B3D42' },
      { nameFa: 'سفید پلاتینیومی', nameEn: 'Platinum White', hex: '#F0F2F5' }
    ],
    specsFa: {
      'پردازنده': 'Intel Core Ultra 9 185H با هوش مصنوعی اختصاصی NPU',
      'کارت گرافیک': 'NVIDIA GeForce RTX 4080 12GB GDDR6 (115W TGP)',
      'نمایشگر': '16 اینچ OLED ROG Nebula با رزولوشن 2.5K و رفرش‌ریت 240Hz',
      'ضخامت و وزن': 'فوق باریک ۱.۴۹ سانتی‌متر و وزن ۱.۸۵ کیلوگرم تمام آلومینیوم'
    },
    specsEn: {
      'Processor': 'Intel Core Ultra 9 185H with dedicated AI NPU',
      'Graphics': 'NVIDIA GeForce RTX 4080 12GB GDDR6',
      'Display': '16" 2.5K 240Hz 0.2ms OLED ROG Nebula Display',
      'Build': 'Ultra-slim CNC Aluminum 1.49cm profile, 1.85kg'
    },
    descriptionFa: 'زیباترین و قدرتمندترین لپ‌تاپ گیمینگ سبک وزن جهان با پنل OLED خیره‌کننده ۲۴۰ هرتز و نورپردازی Slash Lighting روی بدنه پشتی.',
    descriptionEn: 'The pinnacle of thin & light gaming performance with dazzling 240Hz OLED display and premium CNC unibody craft.',
    isFeatured: false,
    isSpecialOffer: false,
    badge: 'گیمینگ اولترا'
  },

  // 2. AUDIO & WEARABLES
  {
    id: 'prod-2',
    titleFa: 'هدفون بی‌سیم نویز کنسلینگ سونی Sony WH-1000XM5',
    titleEn: 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones',
    brand: 'Sony',
    category: 'audio-wearables',
    priceTomans: 18400000,
    originalPriceTomans: 21500000,
    discountPercent: 14,
    rating: 4.8,
    reviewCount: 98,
    inStock: true,
    stockCount: 15,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { nameFa: 'مشکی مات', nameEn: 'Midnight Black', hex: '#1C1C1E' },
      { nameFa: 'نقره‌ای پلاتینیوم', nameEn: 'Silver Platinum', hex: '#DCDCDC' },
      { nameFa: 'سرمه‌ای اسموکی', nameEn: 'Smoky Navy', hex: '#1B263B' }
    ],
    specsFa: {
      'حذف نویز': 'پردازشگر دوگانه V1 و QN1 با ۸ میکروفون اختصاصی',
      'شارژدهی': '۳۰ ساعت با ANC روشن (۳ دقیقه شارژ = ۳ ساعت پخش)',
      'کدک‌های صوتی': 'LDAC, Hi-Res Audio Wireless, DSEE Extreme',
      'اتصال': 'بلوتوث 5.2 با قابلیت اتصال همزمان به دو دستگاه'
    },
    specsEn: {
      'Noise Cancelling': 'Industry leading dual V1 & QN1 processors with 8 mics',
      'Battery Life': '30 hours with ANC (3 min quick charge = 3 hours playback)',
      'Audio Codecs': 'LDAC, Hi-Res Audio, DSEE Extreme AI upscaling',
      'Connectivity': 'Bluetooth 5.2 multipoint pairing'
    },
    descriptionFa: 'پادشاه حذف نویز جهان با تفکیک صدای کریستالی استودیویی، درایورهای ۳۰ میلی‌متری کربن کامپوزیت و طراحی ارگونومیک فوق‌العاده راحت برای کاربری طولانی.',
    descriptionEn: 'Industry-leading noise cancellation headphones with exquisite sound clarity, 30mm carbon composite drivers, and ultra-comfortable lightweight build.',
    isFeatured: true,
    isSpecialOffer: true,
    badge: 'پرفروش‌ترین هدفون'
  },
  {
    id: 'prod-3',
    titleFa: 'ساعت هوشمند اپل واچ اولترا 2 با بند تریل لوپ تیتانیومی',
    titleEn: 'Apple Watch Ultra 2 GPS + Cellular 49mm Titanium',
    brand: 'Apple',
    category: 'audio-wearables',
    priceTomans: 44900000,
    originalPriceTomans: 48000000,
    discountPercent: 6,
    rating: 4.9,
    reviewCount: 76,
    inStock: true,
    stockCount: 5,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    colors: [
      { nameFa: 'تیتانیوم مات', nameEn: 'Natural Titanium', hex: '#A8A49E' },
      { nameFa: 'مشکی تیتانیوم اولترا', nameEn: 'Black Ultra', hex: '#212121' }
    ],
    specsFa: {
      'روشنایی صفحه': '۳۰۰۰ نیت OLED خیره‌کننده زیر نور مستقیم خورشید',
      'مقاومت آب': 'ضد آب تا عمق ۱۰۰ متر با استاندارد غواصی EN13319',
      'سنسورها': 'عمق‌سنج، سنسور اکسیژن خون، نوار قلب ECG، سنسور دمای بدن',
      'GPS': 'دو فرکانسه فوق‌دقیق L1 و L5'
    },
    specsEn: {
      'Brightness': '3000 nits OLED Retina display',
      'Water Resistance': '100m water resistant with EN13319 dive certification',
      'Sensors': 'Depth gauge, SpO2, ECG, Body temperature sensor',
      'GPS': 'Precision dual-frequency GPS (L1 and L5)'
    },
    descriptionFa: 'سرسخت‌ترین و توانمندترین ساعت هوشمند تولید شده برای ورزشکاران حرفه‌ای، غواصان و ماجراجویان با شارژدهی تا ۷۲ ساعت در حالت Low Power.',
    descriptionEn: 'The most rugged and capable Apple Watch designed for endurance athletes, outdoor adventurers, and water sports enthusiasts.',
    isFeatured: true,
    isSpecialOffer: false,
    badge: 'ویژه ماجراجویان'
  },
  {
    id: 'prod-8',
    titleFa: 'اسپیکر پرتابل ضدآب مارشال مدل Marshall Emberton II',
    titleEn: 'Marshall Emberton II Portable Bluetooth Waterproof Speaker',
    brand: 'Marshall',
    category: 'audio-wearables',
    priceTomans: 9600000,
    originalPriceTomans: 11000000,
    discountPercent: 13,
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    stockCount: 12,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
    colors: [
      { nameFa: 'مشکی طلایی کلاسیک', nameEn: 'Black & Brass', hex: '#1A1816' },
      { nameFa: 'کرم وینتیج', nameEn: 'Cream Vintage', hex: '#ECE3D4' }
    ],
    specsFa: {
      'صدای ۳۶۰ درجه': 'تکنولوژی اختصاصی True Stereophonic مارشال',
      'ضد آب و گرد و غبار': 'گواهی بین‌المللی IP67 مقاوم در برابر غوطه‌وری در آب',
      'شارژدهی': 'بیش از ۳۰ ساعت پخش موسیقی مداوم با یک‌بار شارژ',
      'قابلیت Stack Mode': 'اتصال بی‌سیم همزمان چند اسپیکر به یکدیگر'
    },
    specsEn: {
      'Sound': 'True Stereophonic multi-directional sound',
      'Ruggedness': 'IP67 dust and waterproof build',
      'Battery': '30+ hours of portable playtime',
      'Stack Mode': 'Connect multiple Emberton II speakers together'
    },
    descriptionFa: 'طراحی وینتیج راک اند رول با بافت سیلیکونی الهام گرفته از آمپلی‌فایرهای افسانه‌ای مارشال، تفکیک بیس فوق‌العاده قوی و حمل آسان در سفرها.',
    descriptionEn: 'Compact portable speaker with rich, clear, and loud 360 sound signature and iconic vintage aesthetic.',
    isFeatured: false,
    isSpecialOffer: false,
    badge: 'گارانتی طلایی'
  },
  {
    id: 'prod-11',
    titleFa: 'هندزفری بلوتوثی اپل مدل AirPods Pro 2 با پورت Type-C',
    titleEn: 'Apple AirPods Pro 2 (2nd Gen with USB-C MagSafe Case)',
    brand: 'Apple',
    category: 'audio-wearables',
    priceTomans: 12400000,
    originalPriceTomans: 13800000,
    discountPercent: 10,
    rating: 4.9,
    reviewCount: 215,
    inStock: true,
    stockCount: 18,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80',
    specsFa: {
      'پردازش صوتی': 'تراشه Apple H2 با حذف نویز ۲ برابری نسبت به نسل ۱',
      'صدای فراگیر': 'Spatial Audio با ردیابی پویای حرکات سر و اکولایزر تطبیقی',
      'کیس شارژ': 'کیس هوشمند با اسپیکر توکار، قلاب بند و مقاومت IP54',
      'شارژدهی': 'تا ۳۰ ساعت پخش همراه با کیس شارژ مگ‌سیف'
    },
    specsEn: {
      'Chip': 'Apple H2 chip with 2x more Active Noise Cancellation',
      'Spatial Audio': 'Personalized Spatial Audio with dynamic head tracking',
      'Case': 'MagSafe Charging Case (USB-C) with speaker and lanyard loop',
      'Battery': 'Up to 30 hours of total listening time'
    },
    descriptionFa: 'تجربه صوتی بی‌نظیر با حذف نویز هوشمند، حالت شفافیت صدا Adaptive Transparency و قابلیت تست شنوایی تایید شده FDA.',
    descriptionEn: 'Pro-level Active Noise Cancellation, Adaptive Audio, and Personalized Spatial Audio for an immersive acoustic realm.',
    isFeatured: false,
    isSpecialOffer: true,
    badge: 'پرفروش‌ترین سال'
  },

  // 3. GAMING & CONSOLE
  {
    id: 'prod-5',
    titleFa: 'کنسول بازی سونی پلی‌استیشن 5 پرو Sony PlayStation 5 Pro 2TB',
    titleEn: 'Sony PlayStation 5 Pro Console 2TB SSD Edition',
    brand: 'Sony',
    category: 'gaming-console',
    priceTomans: 56500000,
    originalPriceTomans: 62000000,
    discountPercent: 9,
    rating: 4.9,
    reviewCount: 110,
    inStock: true,
    stockCount: 6,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80',
    colors: [
      { nameFa: 'سفید کلاسیک متالیک', nameEn: 'Pure Glacier White', hex: '#F0F2F5' }
    ],
    specsFa: {
      'پردازش گرافیکی': '۶۷ درصد واحدهای محاسباتی بیشتر + فناوری هوش مصنوعی PSSR',
      'رهگیری پرتو': 'Ray Tracing پیشرفته تا ۳ برابر سریع‌تر از نسخه استاندارد',
      'حافظه داخلی': '۲ ترابایت SSD فوق پرسرعت نسل جدید',
      'کیفیت خروجی': 'پشتیبانی از رزولوشن 4K تا 120 فریم و 8K Ultra HD'
    },
    specsEn: {
      'GPU Upgrade': '67% more Compute Units & PlayStation Spectral Super Resolution (PSSR)',
      'Ray Tracing': 'Advanced ray tracing up to 3x faster',
      'Storage': '2TB high-speed NVMe SSD',
      'Resolution': '4K 120fps with HDR & 8K ready output'
    },
    descriptionFa: 'قدرتمندترین کنسول بازی نسل نهم با هوش مصنوعی PSSR سونی برای اجرای بازی‌ها با بالاترین گرافیک و نرخ فریم ۶۰ تا ۱۲۰ بدون هیچ افت کیفیتی.',
    descriptionEn: 'The most powerful PlayStation console ever made with AI upscaling, upgraded GPU, and unmatched visual fidelity.',
    isFeatured: true,
    isSpecialOffer: true,
    badge: 'جدیدترین نسخه'
  },
  {
    id: 'prod-12',
    titleFa: 'دسته بازی حرفه‌ای بی‌سیم دوئل‌سنس ادج پلی‌استیشن DualSense Edge',
    titleEn: 'Sony PlayStation DualSense Edge Wireless Controller',
    brand: 'Sony',
    category: 'gaming-console',
    priceTomans: 11800000,
    originalPriceTomans: 13200000,
    discountPercent: 11,
    rating: 4.8,
    reviewCount: 64,
    inStock: true,
    stockCount: 9,
    image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=800&auto=format&fit=crop&q=80',
    specsFa: {
      'دکمه‌های پشتی': 'پدال‌های فلزی قابل تعویض برای شخصی‌سازی دکمه‌ها',
      'ماژول آنالوگ': 'استیک‌های آنالوگ با قابلیت تعویض آسان ماژولار',
      'تنظیم تریگرها': 'سوئیچ تنظیم دامنه حرکت تریگرهای L2 و R2 برای شوترهای سریع',
      'لوازم همراه': 'کیف حمل ضدضربه لوکس، کابل تایپ‌سی با قفل و ۴ عدد سرآنالوگ'
    },
    specsEn: {
      'Back Buttons': 'Changeable metal back paddles with custom mapping',
      'Stick Modules': 'Replaceable stick module design for longevity',
      'Trigger Stops': 'Adjustable trigger travel distance for fast shooters',
      'Included': 'Braided USB cable with lock, carrying case, dome caps'
    },
    descriptionFa: 'کنترلر کاستوم و پرو پلی‌استیشن ۵ برای گیمرهای مسابقه‌ای Esport با قابلیت ذخیره پروفایل‌های شخصی‌سازی شده و تنظیم حساسیت دکمه‌ها.',
    descriptionEn: 'Built for high performance with customizable controls, swappable stick caps, and personalized profile profiles.',
    isFeatured: false,
    isSpecialOffer: false,
    badge: 'ویژه مسابقات'
  },

  // 4. SMART HOME & APPLIANCES
  {
    id: 'prod-13',
    titleFa: 'جاروبرقی رباتیک شیائومی مدل Xiaomi Robot Vacuum X20 Plus با تخلیه خودکار',
    titleEn: 'Xiaomi Robot Vacuum X20+ with All-in-One Smart Omni Station',
    brand: 'Xiaomi',
    category: 'smart-home',
    priceTomans: 28900000,
    originalPriceTomans: 33000000,
    discountPercent: 12,
    rating: 4.8,
    reviewCount: 81,
    inStock: true,
    stockCount: 7,
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80',
    specsFa: {
      'قدرت مکش': '۶۰۰۰ پاسکال مکش توربو فوق‌العاده قوی',
      'ایستگاه همه‌کاره': 'تخلیه خودکار زباله تا ۷۵ روز + شستشو و خشک کردن اتوماتیک پدهای تی',
      'مسیریابی هوشمند': 'سنسور لیزری LDS با اسکن ۳۶۰ درجه و سنسور اجتناب از موانع S-Cross',
      'کنترل از راه دور': 'اتصال به اپلیکیشن Mi Home و دستیارهای صوتی Google Assistant و Alexa'
    },
    specsEn: {
      'Suction Power': '6000Pa Turbo Fan Blower',
      'Omni Station': 'Auto dust emptying (75 days) + auto mop washing & air drying',
      'Navigation': 'LDS laser navigation with S-Cross obstacle avoidance',
      'Smart App': 'Mi Home app scheduling, multi-floor maps & virtual walls'
    },
    descriptionFa: 'نظافت تمام اتوماتیک خانه بدون دخالت دست! تی‌کشی دوار با سرعت ۱۸۰ دور در دقیقه، تفکیک خودکار فرش و بالا بردن اتوماتیک پدها هنگام رسیدن به قالی.',
    descriptionEn: 'All-in-one flagship cleaning robot featuring auto-emptying, high-speed dual rotary mopping, and smart carpet detection.',
    isFeatured: true,
    isSpecialOffer: true,
    badge: 'تخفیف شگفت‌انگیز'
  },
  {
    id: 'prod-14',
    titleFa: 'دستگاه قهوه‌ساز و اسپرسوساز دلونگی مدل Delonghi Dedica EC685.M',
    titleEn: 'DeLonghi Dedica Pump Espresso Coffee Maker Stainless Steel',
    brand: 'DeLonghi',
    category: 'smart-home',
    priceTomans: 9800000,
    originalPriceTomans: 11500000,
    discountPercent: 15,
    rating: 4.9,
    reviewCount: 134,
    inStock: true,
    stockCount: 14,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
    colors: [
      { nameFa: 'نقره‌ای استیل مات', nameEn: 'Stainless Steel', hex: '#D1D5DB' },
      { nameFa: 'مشکی مات متالیک', nameEn: 'Matt Black', hex: '#1F2937' },
      { nameFa: 'قرمز متالیک', nameEn: 'Metallic Red', hex: '#991B1B' }
    ],
    specsFa: {
      'فشار بخار': '۱۵ بار واقعی با پمپ بویلر ایتالیایی فوق پرقدرت',
      'سیستم حرارتی': 'تکنولوژی Thermoblock برای گرم شدن سریع در کمتر از ۳۵ ثانیه',
      'نازل فوم‌ساز': 'سیستم کاپوچینوساز قابل تنظیم دستی برای تولید فوم شیر غلیظ باریستا',
      'طراحی باریک': 'عرض بسیار کم ۱۵ سانتی‌متر مناسب برای هر آشپزخانه مدرن'
    },
    specsEn: {
      'Pump Pressure': '15 Bar Italian high-pressure pump',
      'Heating System': 'Thermoblock technology ready in 35 seconds',
      'Milk Frother': 'Adjustable Cappuccino System with rich creamy foam',
      'Slim Design': 'Only 15cm wide compact metal unibody'
    },
    descriptionFa: 'تجربه تهیه یک شات اسپرسوی کرمادار غلیظ ایتالیایی، کاپوچینو و لاته مثل کافی‌شاپ با بدنه‌ای از جنس استیل براق و نازل بخار حرفه‌ای.',
    descriptionEn: 'Brew authentic barista-quality espresso and creamy lattes right in your modern kitchen with iconic slim Italian craftsmanship.',
    isFeatured: false,
    isSpecialOffer: false,
    badge: 'کیفیت ایتالیایی'
  },

  // 5. DIGITAL GADGETS & DRONES
  {
    id: 'prod-6',
    titleFa: 'کوادکوپتر حرفه‌ای دی‌جی‌آی مدل DJI Mini 4 Pro Fly More Combo Plus',
    titleEn: 'DJI Mini 4 Pro Fly More Combo Plus with RC 2 Screen Controller',
    brand: 'DJI',
    category: 'digital-gadgets',
    priceTomans: 68900000,
    originalPriceTomans: 74000000,
    discountPercent: 7,
    rating: 4.8,
    reviewCount: 42,
    inStock: true,
    stockCount: 3,
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80',
    specsFa: {
      'کیفیت دوربین': '4K 60fps HDR و 4K 100fps Slow-mo با سنسور 1/1.3 اینچ',
      'سنسورهای ایمنی': 'سیستم سنجش موانع همه جهته (Omnidirectional)',
      'برد ارسال تصویر': 'فناوری O4 با برد تصویر زنده تا ۲۰ کیلومتر با کیفیت 1080p',
      'مدت پرواز': 'تا ۴۵ دقیقه مداوم با باتری‌های سری Plus'
    },
    specsEn: {
      'Camera': '4K/60fps HDR, 4K/100fps slow-motion, 1/1.3" CMOS sensor',
      'Obstacle Sensing': 'Omnidirectional obstacle sensing system',
      'Transmission': 'DJI O4 video transmission up to 20km',
      'Flight Time': 'Up to 45 mins flight time per Plus battery'
    },
    descriptionFa: 'هلی‌شات فوق‌حرفه‌ای با وزن سبک، مجهز به ریموت کنترلر اختصاصی دارای صفحه نمایش لمسی فوق‌روشن RC 2 و فیلمبرداری عمودی طبیعی برای شبکه‌های اجتماعی.',
    descriptionEn: 'Mini size, mega power drone featuring omnidirectional sensing, 4K HDR video, and 20km FHD video transmission.',
    isFeatured: false,
    isSpecialOffer: false,
    badge: 'ارسال فوری'
  },
  {
    id: 'prod-7',
    titleFa: 'کیبورد مکانیکال بی‌سیم کی‌کرون Keychron Q1 Pro سفارشی',
    titleEn: 'Keychron Q1 Pro QMK/VIA Wireless Custom Mechanical Keyboard',
    brand: 'Keychron',
    category: 'digital-gadgets',
    priceTomans: 12800000,
    originalPriceTomans: 14500000,
    discountPercent: 12,
    rating: 4.9,
    reviewCount: 63,
    inStock: true,
    stockCount: 10,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    colors: [
      { nameFa: 'خاکستری کربنی', nameEn: 'Carbon Grey', hex: '#2C2D30' },
      { nameFa: 'سفید یخی شل', nameEn: 'Shell White', hex: '#F2F2F2' }
    ],
    specsFa: {
      'بدنه': 'تمام آلومینیوم ماشین‌کاری شده CNC با ساختار دابل گسکت',
      'سوئیچ‌ها': 'Keychron K Pro Red سایلنت با قابلیت Hot-Swappable',
      'اتصال': 'بلوتوث 5.1 تا ۳ دستگاه و کابل Type-C با نرخ نمونه‌برداری 1000Hz',
      'نورپردازی': 'RGB قابل برنامه‌ریزی با نرم‌افزار QMK/VIA'
    },
    specsEn: {
      'Body': 'Full CNC machined aluminum double-gasket mount',
      'Switches': 'Keychron K Pro Red Hot-Swappable',
      'Connectivity': 'Bluetooth 5.1 (3 devices) + Type-C wired 1000Hz polling rate',
      'Backlight': 'South-facing RGB with QMK/VIA keymap programming'
    },
    descriptionFa: 'شاهکار مهندسی کیبوردهای سفارشی با حس تایپ بی‌نظیر، صدای عمیق و طراحی مدرن سازگار با سیستم‌عامل‌های ویندوز و مک.',
    descriptionEn: 'Full metal QMK/VIA wireless custom mechanical keyboard engineered for premium typing comfort and sound profile.',
    isFeatured: false,
    isSpecialOffer: true,
    badge: 'محبوب برنامه‌نویسان'
  },
  {
    id: 'prod-15',
    titleFa: 'ماوس ارگونومیک بی‌سیم لاجیتک مدل Logitech MX Master 3S',
    titleEn: 'Logitech MX Master 3S Wireless Performance Mouse',
    brand: 'Logitech',
    category: 'digital-gadgets',
    priceTomans: 5900000,
    originalPriceTomans: 6800000,
    discountPercent: 13,
    rating: 5.0,
    reviewCount: 198,
    inStock: true,
    stockCount: 22,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80',
    colors: [
      { nameFa: 'مشکی گرافیتی', nameEn: 'Graphite', hex: '#2B2C30' },
      { nameFa: 'خاکستری روشن', nameEn: 'Pale Gray', hex: '#E5E7EB' }
    ],
    specsFa: {
      'اسکرول مگ‌اسپید': 'اسکرول الکترومغناطیسی با سرعت ۱۰۰۰ خط در ثانیه و بی‌صدا',
      'سنسور ردیابی': 'سنسور 8K DPI Darkfield با قابلیت کار حتی روی شیشه شفاف',
      'کلیک بی‌صدا': 'کاهش ۹۰ درصدی صدای کلیک‌ها نسبت به نسل قبل',
      'باتری': 'شارژدهی تا ۷۰ روز با یک بار شارژ کامل پورت تایپ‌سی'
    },
    specsEn: {
      'Scroll Wheel': 'MagSpeed electromagnetic scrolling up to 1000 lines/sec',
      'Sensor': '8,000 DPI Darkfield sensor works on glass surfaces',
      'Quiet Clicks': '90% less click noise with tactile feedback',
      'Battery Life': 'Up to 70 days on a full charge, USB-C quick charging'
    },
    descriptionFa: 'محبوب‌ترین ماوس مهندسان، طراحان و مدیران با دکمه‌های قابل برنامه‌ریزی و جابجایی فایل بین چند کامپیوتر با فناوری Logitech Flow.',
    descriptionEn: 'The iconic master performance mouse remastered with quiet clicks and 8K DPI any-surface tracking.',
    isFeatured: false,
    isSpecialOffer: false,
    badge: 'ارگونومیک برتر'
  },

  // 6. LIFESTYLE & ACCESSORIES
  {
    id: 'prod-16',
    titleFa: 'کوله پشتی ضدآب مسافرتی پیک‌دیزاین Peak Design Travel Backpack 30L',
    titleEn: 'Peak Design Travel Backpack 30L Waterproof EDC Pack',
    brand: 'Peak Design',
    category: 'lifestyle-accessories',
    priceTomans: 15400000,
    originalPriceTomans: 17200000,
    discountPercent: 10,
    rating: 4.9,
    reviewCount: 47,
    inStock: true,
    stockCount: 6,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    colors: [
      { nameFa: 'مشکی شبق مات', nameEn: 'Black Midnight', hex: '#1E1E20' },
      { nameFa: 'سبز کله‌غازی مریم‌گلی', nameEn: 'Sage Green', hex: '#586A5E' }
    ],
    specsFa: {
      'جنس بدنه': 'پارچه نایلونی بازیافتی ۱۰۰٪ ضدآب با زیپ‌های مقاوم UltraZip',
      'محفظه لپ‌تاپ': 'محفظه پددار محافظ برای لپ‌تاپ‌های تا ۱۶ اینچ و تبلت',
      'دسترسی سریع': 'دسترسی جانبی و پشتی بدون نیاز به باز کردن کامل کوله',
      'حجم متغیر': 'قابلیت افزایش حجم از ۲۷ لیتر به ۳۳ لیتر'
    },
    specsEn: {
      'Material': 'Weatherproof 100% recycled 400D nylon canvas with UltraZips',
      'Laptop Sleeve': 'Dedicated padded sleeve fits up to 16" MacBook Pro',
      'Fast Access': 'Top, side and rear access panels with dual side pockets',
      'Capacity': 'Expandable from 27L to 33L with carry-on approval'
    },
    descriptionFa: 'کوله پشتی بی‌نقص برای عکاسان، مسافران کاری و عاشقان فناوری با تقسیم‌بندی ماژولار و طراحی ارگونومیک با استانداردهای پرواز بین‌المللی.',
    descriptionEn: 'The versatile, rugged, and expandable daypack for travel and everyday tech carry.',
    isFeatured: false,
    isSpecialOffer: false,
    badge: 'ضمانت مادام‌العمر'
  }
];

export const CATEGORIES: { id: string; nameFa: string; nameEn: string; icon: string; count: number }[] = [
  { id: 'all', nameFa: 'همه کالاها', nameEn: 'All Products', icon: 'Grid', count: 12 },
  { id: 'smartphones-laptops', nameFa: 'گوشی و لپ‌تاپ', nameEn: 'Smartphones & Laptops', icon: 'Smartphone', count: 4 },
  { id: 'audio-wearables', nameFa: 'هدفون و ساعت هوشمند', nameEn: 'Audio & Wearables', icon: 'Headphones', count: 4 },
  { id: 'gaming-console', nameFa: 'گیمینگ و کنسول', nameEn: 'Gaming & VR', icon: 'Gamepad2', count: 2 },
  { id: 'smart-home', nameFa: 'خانه و لوازم هوشمند', nameEn: 'Smart Home & Appliances', icon: 'Home', count: 2 },
  { id: 'digital-gadgets', nameFa: 'گجت، هلی‌شات و اداری', nameEn: 'Gadgets & Drones', icon: 'Sparkles', count: 3 },
  { id: 'lifestyle-accessories', nameFa: 'اکسسوری و کوله پشتی', nameEn: 'Lifestyle & Bags', icon: 'ShoppingBag', count: 1 }
];
