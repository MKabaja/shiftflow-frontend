import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import loginArt from '@/assets/login-admin.webp';
import { AuthHeading } from '@/features/auth/components/AuthHeading/AuthHeading.tsx';
import { AuthSplit } from '@/features/auth/components/AuthSplit/AuthSplit.tsx';
import { LoginForm } from '@/features/auth/components/LoginForm/LoginForm.tsx';

export const Route = createFileRoute('/_public/login')({
	component: LoginPage,
});

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

				<hr className="my-6 border-border-subtle" />

				<Link
					to="/login-pin"
					className="flex items-center justify-center gap-2 text-body-sm text-accent-text transition-colors hover:text-accent"
				>
					{t('login.toPinLogin')} →
				</Link>
			</AuthSplit>

			<Link
				to="/"
				className="text-body-sm text-text-muted transition-colors hover:text-accent-text"
			>
				← {t('login.back')}
			</Link>
		</section>
	);
}
