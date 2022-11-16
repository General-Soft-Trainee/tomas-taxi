import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';

import translationsEn from './en.json';
import translationRu from './ru.json';
import translationDe from './de.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  resources: {
    en: { translation: translationsEn },
    ru: { translation: translationRu },
    de: { translation: translationDe }
  },
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
