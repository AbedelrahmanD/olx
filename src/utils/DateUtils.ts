import { Language, TranslationKeys } from '../types/Language';
import { translations } from '../translations/translations';

export const getRelativeTime = (timestamp: number, lang: Language = 'en'): string => {
  const now = Date.now() / 1000;
  const diff = now - timestamp;
  const t = translations[lang];

  if (diff < 60) {
    return t.justNow;
  }

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) {
    return lang === 'en' ? `${minutes}${t.m} ${t.ago}` : `${t.ago} ${minutes} ${t.m}`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return lang === 'en' ? `${hours}${t.h} ${t.ago}` : `${t.ago} ${hours} ${t.h}`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return lang === 'en' ? `${days}${t.d} ${t.ago}` : `${t.ago} ${days} ${t.d}`;
  }

  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US');
};
