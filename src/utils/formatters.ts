import { Language } from '../types';

export const toPersianDigits = (num: number | string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/[0-9]/g, (w) => persianDigits[+w]);
};

export const formatPrice = (price: number, lang: Language = 'fa'): string => {
  const formatted = new Intl.NumberFormat('en-US').format(price);
  if (lang === 'fa') {
    return `${toPersianDigits(formatted)} تومان`;
  }
  return `${formatted} Tomans`;
};

export const formatNumber = (num: number, lang: Language = 'fa'): string => {
  const formatted = new Intl.NumberFormat('en-US').format(num);
  return lang === 'fa' ? toPersianDigits(formatted) : formatted;
};

export const formatPercent = (percent: number, lang: Language = 'fa'): string => {
  return lang === 'fa' ? `٪${toPersianDigits(percent)}` : `${percent}%`;
};

export const getTimeLeftInSeconds = (endTime: Date): { hours: number; minutes: number; seconds: number } => {
  const total = Math.max(0, Math.floor((endTime.getTime() - new Date().getTime()) / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return { hours, minutes, seconds };
};
