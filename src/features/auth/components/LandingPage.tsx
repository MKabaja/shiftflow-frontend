import { useTranslation } from 'react-i18next';
import { Briefcase, UserCircle } from 'lucide-react';
import { RoleCard } from '@/features/auth/components/RoleCard.tsx';

function LandingPage() {
  const { t } = useTranslation('auth');
  return (
    <section className="flex flex-col items-center gap-12">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-display-xl md:text-display-2xl">{t('landing.heading')}</h1>
        <p className="text-text-muted text-body-md md:text-body-lg">{t('landing.subheading')}</p>
      </div>
      <div className="flex max-w-3xl flex-col gap-10 md:flex-row">
        <RoleCard
          icon={Briefcase}
          title={t('landing.manager.title')}
          description={t('landing.manager.description')}
          cta={t('landing.manager.cta')}
          to="/login"
        />
        <RoleCard
          icon={UserCircle}
          title={t('landing.employee.title')}
          description={t('landing.employee.description')}
          cta={t('landing.employee.cta')}
          to="/login-pin"
          variant="secondary"
        />
      </div>
    </section>
  );
}

export { LandingPage };