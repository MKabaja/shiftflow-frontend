import 'i18next';
import type common from './locales/pl/common.json';
import type errors from './locales/pl/errors.json';
import type auth from './locales/pl/auth.json';
import type news from './locales/pl/news.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      errors: typeof errors;
      auth: typeof auth;
      news: typeof news;
    };

    allowObjectInHTMLChildren: true;
  }
}
