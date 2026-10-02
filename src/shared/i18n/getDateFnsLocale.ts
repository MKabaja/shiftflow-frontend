import type { Locale } from 'date-fns';
import { enUS, pl } from 'date-fns/locale';
import type { SupportedLocale } from '@/shared/i18n';

const dateFnsLocales: Record<SupportedLocale, Locale> = { pl, en: enUS };

/**
 * Maps an app language code to its date-fns locale.
 *
 * Accepts any string, so `i18n.language` can be passed as is. An unsupported
 * language falls back to Polish, the same fallback i18next uses.
 */
export function getDateFnsLocale(language: string): Locale {
  return Object.hasOwn(dateFnsLocales, language) ? dateFnsLocales[language as SupportedLocale] : pl;
}
