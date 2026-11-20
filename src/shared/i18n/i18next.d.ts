import 'i18next';
import type auth from './locales/pl/auth.json';
import type availability from './locales/pl/availability.json';
import type common from './locales/pl/common.json';
import type employees from './locales/pl/employees.json';
import type errors from './locales/pl/errors.json';
import type news from './locales/pl/news.json';
import type positions from './locales/pl/positions.json';
import type schedule from './locales/pl/schedule.json';
import type settings from './locales/pl/settings.json';

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: 'common';
		resources: {
			common: typeof common;
			errors: typeof errors;
			auth: typeof auth;
			news: typeof news;
			availability: typeof availability;
			schedule: typeof schedule;
			employees: typeof employees;
			positions: typeof positions;
			settings: typeof settings;
		};

		allowObjectInHTMLChildren: true;
	}
}
