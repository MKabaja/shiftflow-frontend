import 'i18next';
import type common from './locales/pl/common.json';
import type errors from './locales/pl/errors.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      errors: typeof errors;
    };

    allowObjectInHTMLChildren: true;
  }
}
