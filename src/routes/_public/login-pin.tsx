import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import loginPinArt from '@/assets/login-employee.webp';
import { AuthHeading } from '@/features/auth/components/AuthHeading/AuthHeading.tsx';
import { AuthSplit } from '@/features/auth/components/AuthSplit/AuthSplit.tsx';
import { LoginPinForm } from '@/features/auth/components/LoginPinForm/LoginPinForm.tsx';

export const Route = createFileRoute('/_public/login-pin')({
	component: LoginPinPage,
});

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

				<hr className="my-6 border-border-subtle" />

				<Link
					to="/login"
					className="flex items-center justify-center gap-2 text-body-sm text-accent-text transition-colors hover:text-accent"
				>
					{t('loginPin.toPasswordLogin')} →
				</Link>
			</AuthSplit>

			<Link
				to="/"
				className="text-body-sm text-text-muted transition-colors hover:text-accent-text"
			>
				← {t('loginPin.back')}
			</Link>
		</section>
	);
}
