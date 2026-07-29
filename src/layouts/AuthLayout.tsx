import { Outlet } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Logo } from '@/shared/components/Logo';

function AuthLayout() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <div className="auth-bg flex min-h-screen flex-col">
      <header className="flex justify-center pt-10 pb-4">
        <Logo size="xl" />
      </header>

      <main className="flex flex-1 items-center justify-center px-4">
        <Outlet />
      </main>

      <footer className="text-text-muted text-body-sm pb-6 text-center">
        © {year} {t('appName')}
      </footer>
    </div>
  );
}

export { AuthLayout };
