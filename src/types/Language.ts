import { en } from './en';

export type Language = 'en' | 'ar';
export type TranslationKeys = keyof typeof en;
