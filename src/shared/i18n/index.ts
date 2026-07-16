import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { config } from '@/shared/lib/config/config.ts';

import plCommon from './locales/pl/common.json';
import enCommon from './locales/en/common.json';
import plErrors from './locales/pl/errors.json';
import enErrors from './locales/en/errors.json';

const resources = {
  pl: { common: plCommon, errors: plErrors },
  en: { common: enCommon, errors: enErrors },
} as const;

type SupportedLocale = keyof typeof resources;
const supportedLocales = Object.keys(resources) as SupportedLocale[];

function getInitialLocale(): SupportedLocale {
  const htmlLang = document.documentElement.lang?.split('-')[0];
  return supportedLocales.includes(htmlLang as SupportedLocale)
    ? (htmlLang as SupportedLocale)
    : 'pl';
}

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'pl',
  lng: getInitialLocale(),
  ns: ['common', 'errors'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
  debug: config.isDev,
});

export default i18n;
