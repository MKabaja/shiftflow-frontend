import { createRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { publicRoute } from '@/routes/_public.tsx';
import { LoginForm } from '@/features/auth/components/LoginForm.tsx';
import { AuthHeading } from '@/features/auth/components/AuthHeading.tsx';
import { AuthSplit } from '@/features/auth/components/AuthSplit.tsx';
import loginArt from '@/assets/ADMIN_LOGIN.webp';

function LoginPage() {
  const { t } = useTranslation('auth');

  return (
    <section className="flex w-full max-w-md flex-col items-center gap-6 lg:max-w-6xl">
      <AuthSplit image={loginArt}>
        <AuthHeading
          title={t('login.heading')}
          subtitle={t('login.subheading')}
        />

        <LoginForm />

        <hr className="border-border-subtle my-6" />

        <Link
          to="/login-pin"
          className="text-accent-text text-body-sm hover:text-accent flex items-center justify-center gap-2 transition-colors"
        >
          {t('login.toPinLogin')} →
        </Link>
      </AuthSplit>

      <Link
        to="/"
        className="text-text-muted text-body-sm hover:text-accent-text transition-colors"
      >
        ← {t('login.back')}
      </Link>
    </section>
  );
}

const loginRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/login',
  component: LoginPage,
});

export { loginRoute };
