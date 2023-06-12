import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import spanish from './locales/es/translation.json';
import english from './locales/en/translation.json';
import german from './locales/de/translation.json';
import chinese from './locales/zh/translation.json';
import japanese from './locales/ja/translation.json';
import russian from './locales/ru/translation.json';
import arabic from './locales/ar/translation.json';
import portuguese from './locales/pt/translation.json';
import korean from './locales/ko/translation.json';
import italian from './locales/it/translation.json';
import french from './locales/fr/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: { translation: english },
      es: { translation: spanish },
      de: { translation: german },
      zh: { translation: chinese },
      ja: { translation: japanese },
      ru: { translation: russian },
      ar: { translation: arabic },
      pt: { translation: portuguese },
      ko: { translation: korean },
      it: { translation: italian },
      fr: { translation: french }
    },
    load: 'languageOnly'
  });

export default i18n;
