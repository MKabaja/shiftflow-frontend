import { createRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { publicRoute } from '@/routes/_public.tsx';
import { Card } from '@/shared/components/Card';
import { LoginForm } from '@/features/auth/components/LoginForm.tsx';
import { AuthIllustration } from '@/features/auth/components/AuthIllustration.tsx';
import loginArt from '@/assets/business-deadline-setting.svg';

function LoginPage() {
  const { t } = useTranslation('auth');

  return (
    <section className="flex w-full max-w-md flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-display-lg md:text-display-xl">{t('login.heading')}</h1>
        <p className="text-text-muted text-body-md">{t('login.subheading')}</p>
      </div>

      <Card className="w-full">
        <AuthIllustration src={loginArt} />

        <LoginForm />
      </Card>

      <div className="text-text-muted text-body-sm flex flex-col items-center gap-2">
        <Link
          to="/login-pin"
          className="hover:text-accent-text transition-colors"
        >
          {t('login.toPinLogin')} →
        </Link>
        <Link
          to="/"
          className="hover:text-accent-text transition-colors"
        >
          ← {t('login.back')}
        </Link>
      </div>
    </section>
  );
}

const loginRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/login',
  component: LoginPage,
});

export { loginRoute };
