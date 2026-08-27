export function toPersianDigits(n: string | number): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(n).replace(/[0-9]/g, (w) => persianDigits[+w]);
}

export function formatPrice(tomans: number, isFa: boolean = true): string {
  const formatted = new Intl.NumberFormat('en-US').format(tomans);
  if (isFa) {
    return `${toPersianDigits(formatted)} تومان`;
  }
  return `${formatted} Tomans`;
}

export function formatPriceTomans(tomans: number, language: 'fa' | 'en' = 'fa'): string {
  return formatPrice(tomans, language === 'fa');
}

export function formatRials(tomans: number, isFa: boolean = true): string {
  const rials = tomans * 10;
  const formatted = new Intl.NumberFormat('en-US').format(rials);
  if (isFa) {
    return `${toPersianDigits(formatted)} ریال`;
  }
  return `${formatted} Rials`;
}

export function formatCardNumber(pan: string): string {
  const clean = pan.replace(/\D/g, '');
  if (!clean) return pan;
  return clean.replace(/(\d{4})(?=\d)/g, '$1-');
}

export function detectIranianBank(pan: string): { nameFa: string; nameEn: string; color: string; logoUrl?: string } {
  const clean = pan.replace(/\D/g, '').substring(0, 6);
  
  if (clean.startsWith('603799')) return { nameFa: 'بانک ملی ایران', nameEn: 'Bank Melli Iran', color: 'from-amber-600 to-red-600' };
  if (clean.startsWith('610433')) return { nameFa: 'بانک ملت', nameEn: 'Bank Mellat', color: 'from-red-600 to-rose-700' };
  if (clean.startsWith('621986')) return { nameFa: 'بانک سامان', nameEn: 'Saman Bank', color: 'from-blue-600 to-sky-500' };
  if (clean.startsWith('502229')) return { nameFa: 'بانک پاسارگاد', nameEn: 'Pasargad Bank', color: 'from-amber-500 to-yellow-600' };
  if (clean.startsWith('622106')) return { nameFa: 'بانک پارسیان', nameEn: 'Parsian Bank', color: 'from-red-700 to-amber-600' };
  if (clean.startsWith('505416')) return { nameFa: 'بانک گردشگری', nameEn: 'Gardeshgari Bank', color: 'from-emerald-600 to-teal-500' };
  if (clean.startsWith('627412')) return { nameFa: 'بانک اقتصاد نوین', nameEn: 'Eghtesad Novin Bank', color: 'from-purple-600 to-indigo-600' };
  if (clean.startsWith('606373')) return { nameFa: 'بانک مهر ایران', nameEn: 'Mehr Iran Bank', color: 'from-emerald-700 to-green-600' };
  if (clean.startsWith('504172')) return { nameFa: 'بانک رسالت', nameEn: 'Resalat Bank', color: 'from-blue-700 to-cyan-600' };
  if (clean.startsWith('621986') || clean.startsWith('504706')) return { nameFa: 'بلو بانک (سامان)', nameEn: 'BluBank', color: 'from-sky-500 to-blue-600' };
  
  return { nameFa: 'عضو شبکه شتاب (شاپرک)', nameEn: 'Shetab Interbank Network', color: 'from-neutral-700 to-neutral-900' };
}
