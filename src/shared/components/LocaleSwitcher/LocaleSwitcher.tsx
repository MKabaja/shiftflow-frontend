import { Button } from '@/shared/components/Button';
import { setLocale, type SupportedLocale, supportedLocales } from '@/shared/i18n';
import type { ParseKeys } from 'i18next';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/shared/lib/helpers/cn.ts';
import { containerStyles } from './LocaleSwitcher.styles.ts';

type AriaLabels = Record<SupportedLocale, ParseKeys<'common'>>;

const localeLabels: AriaLabels = {
  pl: 'locale.pl',
  en: 'locale.en',
};

function LocaleSwitcher(): ReactNode {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage;

  return (
    <div
      aria-label={t('locale.groupLabel')}
      role="group"
      className={cn(containerStyles)}
    >
      {supportedLocales.map((locale) => {
        const isActive = currentLanguage === locale;

        return (
          <Button
            key={locale}
            aria-label={t(localeLabels[locale])}
            aria-pressed={isActive}
            variant={isActive ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setLocale(locale)}
          >
            {locale.toUpperCase()}
          </Button>
        );
      })}
    </div>
  );
}

export { LocaleSwitcher };
