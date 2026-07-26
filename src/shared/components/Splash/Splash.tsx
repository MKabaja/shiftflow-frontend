import { useTranslation } from 'react-i18next';
import { Spinner } from '@/shared/components/Spinner';
import { baseStyles } from '@/shared/components/Splash/Splash.styles.ts';

export function Splash() {
  const { t } = useTranslation();

  return (
    <div className={baseStyles}>
      <Spinner
        size="lg"
        label={t('loading')}
      />
    </div>
  );
}
