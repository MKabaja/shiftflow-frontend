import type { Locale } from 'date-fns';
import { enUS, pl } from 'date-fns/locale';
import type { SupportedLocale } from '@/shared/i18n';

const dateFnsLocales: Record<SupportedLocale, Locale> = { pl, en: enUS };

/**
 * Maps an app language code to its date-fns locale; an unsupported code falls back to Polish.
 */
export function getDateFnsLocale(language: string): Locale {
  return Object.hasOwn(dateFnsLocales, language) ? dateFnsLocales[language as SupportedLocale] : pl;
}
