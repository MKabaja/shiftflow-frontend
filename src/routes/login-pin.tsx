import { createRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { publicRoute } from '@/routes/_public.tsx';
import { Card } from '@/shared/components/Card';
import { LoginPinForm } from '@/features/auth/components/LoginPinForm.tsx';

function LoginPinPage() {
  const { t } = useTranslation('auth');

  return (
    <section className="flex w-full max-w-sm flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-display-lg md:text-display-xl">{t('loginPin.heading')}</h1>
        <p className="text-text-muted text-body-md">{t('loginPin.subheading')}</p>
      </div>

      <Card
        variant="elevated"
        className="w-full"
      >
        <LoginPinForm />
      </Card>

      <div className="text-text-muted text-body-sm flex flex-col items-center gap-2">
        <Link
          to="/login"
          className="hover:text-accent-text transition-colors"
        >
          {t('loginPin.toPasswordLogin')} →
        </Link>
        <Link
          to="/"
          className="hover:text-accent-text transition-colors"
        >
          ← {t('loginPin.back')}
        </Link>
      </div>
    </section>
  );
}

const loginPinRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/login-pin',
  component: LoginPinPage,
});

export { loginPinRoute };