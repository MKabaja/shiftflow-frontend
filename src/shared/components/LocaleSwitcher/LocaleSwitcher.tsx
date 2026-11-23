import type { ParseKeys } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/components/Button/Button.tsx';
import {
	type SupportedLocale,
	setLocale,
	supportedLocales,
} from '@/shared/i18n/i18n.ts';
import { containerStyles } from './LocaleSwitcher.styles.ts';

type LabelKeyByLocale = Record<SupportedLocale, ParseKeys<'common'>>;

const labelKeyByLocale: LabelKeyByLocale = {
	pl: 'locale.pl',
	en: 'locale.en',
};

export function LocaleSwitcher() {
	const { t, i18n } = useTranslation();
	const currentLanguage = i18n.resolvedLanguage;

	return (
		<div
			aria-label={t('locale.groupLabel')}
			role="group"
			className={containerStyles}
		>
			{supportedLocales.map((locale) => {
				const isActive = currentLanguage === locale;

				return (
					<Button
						key={locale}
						aria-label={t(labelKeyByLocale[locale])}
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
