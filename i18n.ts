import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { resources } from './i18nResource';

i18n.use(initReactI18next).init({
  resources: resources,
  lng: 'en',
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
