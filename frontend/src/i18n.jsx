import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import translationEN from './locales/en/translation.json';
import translationIT from './locales/it/translation.json';

// The translations
const resources = {
  en: {
    translation: translationEN,
  },
  it: {
    translation: translationIT,
  },
};

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    lng: 'it', // Default language
    fallbackLng: 'it', // Fallback language
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export default i18n;
