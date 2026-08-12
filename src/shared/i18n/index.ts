import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { config } from '@/shared/lib/config/config.ts';

import plCommon from './locales/pl/common.json';
import plErrors from './locales/pl/errors.json';
import plAuth from './locales/pl/auth.json';

import enAuth from './locales/en/auth.json';
import enCommon from './locales/en/common.json';
import enErrors from './locales/en/errors.json';

const resources = {
  pl: { common: plCommon, errors: plErrors, auth: plAuth },
  en: { common: enCommon, errors: enErrors, auth: enAuth },
} as const;

const LOCALE_KEY: string = 'shiftflow.locale';

type SupportedLocale = keyof typeof resources;
const supportedLocales = Object.keys(resources) as SupportedLocale[];

function getInitialLocale(): SupportedLocale {
  const locale = getStoredLocale() ?? document.documentElement.lang.split('-')[0];
  return supportedLocales.includes(locale as SupportedLocale) ? (locale as SupportedLocale) : 'pl';
}

/** Reading localStorage throws when storage is blocked
 (private mode, disabled cookies). */

function getStoredLocale(): string | null {
  try {
    return localStorage.getItem(LOCALE_KEY);
  } catch {
    return null;
  }
}

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'pl',
  lng: getInitialLocale(),
  ns: ['common', 'errors', 'auth'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
  debug: config.isDev,
});

export default i18n;
