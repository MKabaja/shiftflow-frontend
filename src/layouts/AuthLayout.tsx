import { Outlet } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { LocaleSwitcher } from '@/shared/components/LocaleSwitcher';
import { Logo } from '@/shared/components/Logo';

function AuthLayout() {
	const { t } = useTranslation();
	const year = new Date().getFullYear();

	return (
		<div className="auth-bg flex min-h-screen flex-col">
			<header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 pt-8 pb-6">
				<Logo size="md" />
				<LocaleSwitcher />
			</header>

			<main className="flex flex-1 items-center justify-center px-4">
				<Outlet />
			</main>

			<footer className="pb-6 text-center text-body-sm text-text-muted">
				© {year} {t('appName')}
			</footer>
		</div>
	);
}

export { AuthLayout };
