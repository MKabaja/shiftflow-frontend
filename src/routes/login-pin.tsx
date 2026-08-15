import { createRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { publicRoute } from '@/routes/_public.tsx';
import { LoginPinForm } from '@/features/auth/components/LoginPinForm.tsx';
import { AuthHeading } from '@/features/auth/components/AuthHeading.tsx';
import { AuthSplit } from '@/features/auth/components/AuthSplit.tsx';
import loginPinArt from '@/assets/EMPLOYEE_LOGIN.webp';

function LoginPinPage() {
  const { t } = useTranslation('auth');

  return (
    <section className="flex w-full max-w-md flex-col items-center gap-6 lg:max-w-6xl">
      <AuthSplit image={loginPinArt}>
        <AuthHeading
          title={t('loginPin.heading')}
          subtitle={t('loginPin.subheading')}
        />

        <LoginPinForm />

        <hr className="border-border-subtle my-6" />

        <Link
          to="/login"
          className="text-accent-text text-body-sm hover:text-accent flex items-center justify-center gap-2 transition-colors"
        >
          {t('loginPin.toPasswordLogin')} →
        </Link>
      </AuthSplit>

      <Link
        to="/"
        className="text-text-muted text-body-sm hover:text-accent-text transition-colors"
      >
        ← {t('loginPin.back')}
      </Link>
    </section>
  );
}

const loginPinRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/login-pin',
  component: LoginPinPage,
});

export { loginPinRoute };
