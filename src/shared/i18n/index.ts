import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enAuth from './locales/en/auth.json';
import enAvailability from './locales/en/availability.json';
import enCommon from './locales/en/common.json';
import enEmployees from './locales/en/employees.json';
import enErrors from './locales/en/errors.json';
import enNews from './locales/en/news.json';
import enPositions from './locales/en/positions.json';
import enSchedule from './locales/en/schedule.json';
import enSettings from './locales/en/settings.json';
import plAuth from './locales/pl/auth.json';
import plAvailability from './locales/pl/availability.json';
import plCommon from './locales/pl/common.json';
import plEmployees from './locales/pl/employees.json';
import plErrors from './locales/pl/errors.json';
import plNews from './locales/pl/news.json';
import plPositions from './locales/pl/positions.json';
import plSchedule from './locales/pl/schedule.json';
import plSettings from './locales/pl/settings.json';

const resources = {
	pl: {
		common: plCommon,
		errors: plErrors,
		auth: plAuth,
		news: plNews,
		availability: plAvailability,
		schedule: plSchedule,
		employees: plEmployees,
		positions: plPositions,
		settings: plSettings,
	},
	en: {
		common: enCommon,
		errors: enErrors,
		auth: enAuth,
		news: enNews,
		availability: enAvailability,
		schedule: enSchedule,
		employees: enEmployees,
		positions: enPositions,
		settings: enSettings,
	},
} as const;

const LOCALE_KEY: string = 'shiftflow.locale';

type SupportedLocale = keyof typeof resources;
const supportedLocales = Object.keys(resources) as SupportedLocale[];

function getInitialLocale(): SupportedLocale {
	const locale =
		getStoredLocale() ?? document.documentElement.lang.split('-')[0];
	return supportedLocales.includes(locale as SupportedLocale)
		? (locale as SupportedLocale)
		: 'pl';
}

function getStoredLocale(): string | undefined | null {
	try {
		return localStorage.getItem(LOCALE_KEY);
	} catch (error) {
		console.error('getStoredLocale()', error);
	}
}

function setLocale(locale: SupportedLocale): void {
	try {
		localStorage.setItem(LOCALE_KEY, locale);
	} catch (error) {
		console.error(error);
	}
	void i18n.changeLanguage(locale);
	document.documentElement.lang = locale;
}

void i18n.use(initReactI18next).init({
	resources,
	fallbackLng: 'pl',
	lng: getInitialLocale(),
	ns: [
		'common',
		'errors',
		'auth',
		'news',
		'availability',
		'schedule',
		'employees',
		'positions',
		'settings',
	],
	defaultNS: 'common',
	interpolation: { escapeValue: false },
});
document.documentElement.lang = i18n.resolvedLanguage ?? 'pl';

export type { SupportedLocale };
export { i18n, setLocale, supportedLocales };
