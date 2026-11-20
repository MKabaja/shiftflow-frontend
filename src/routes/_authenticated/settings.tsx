import { createFileRoute } from '@tanstack/react-router';
import { type ReactNode, useId } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/hooks/useAuth.ts';
import { Badge } from '@/shared/components/Badge';
import { Button } from '@/shared/components/Button';
import { Card } from '@/shared/components/Card';
import { LocaleSwitcher } from '@/shared/components/LocaleSwitcher';

export const Route = createFileRoute('/_authenticated/settings')({
	component: SettingsPage,
});

function SettingsPage() {
	const { t } = useTranslation('settings');
	const { t: tCommon } = useTranslation('common');
	const { user, isEmployee } = useAuth();
	const headingId = useId();

	return (
		<section
			aria-labelledby={headingId}
			className="mx-auto flex w-full max-w-2xl flex-col gap-6 pb-6"
		>
			<h1
				id={headingId}
				className="text-display-lg"
			>
				{t('page.title')}
			</h1>

			<SettingsSection title={t('account.title')}>
				{user && (
					<dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-body-md">
						<dt className="text-text-muted">{t('account.name')}</dt>
						<dd>{user.name}</dd>
						<dt className="text-text-muted">{t('account.login')}</dt>
						<dd>{user.login}</dd>
						{user.email && (
							<>
								<dt className="text-text-muted">{t('account.email')}</dt>
								<dd className="wrap-break-word">{user.email}</dd>
							</>
						)}
						<dt className="text-text-muted">{t('account.role')}</dt>
						<dd>
							<Badge variant="accent">{tCommon(`roles.${user.role}`)}</Badge>
						</dd>
					</dl>
				)}
			</SettingsSection>

			<SettingsSection title={t('security.title')}>
				<Button
					variant="secondary"
					disabled
				>
					{isEmployee ? t('security.changePin') : t('security.changePassword')}
				</Button>
			</SettingsSection>

			<SettingsSection title={t('preferences.title')}>
				<div className="flex items-center justify-between gap-4">
					<span className="text-body-md text-text-muted">
						{t('preferences.language')}
					</span>
					<LocaleSwitcher />
				</div>
			</SettingsSection>

			<SettingsSection title={t('about.title')}>
				<p className="text-body-md">
					<span className="text-text-muted">{t('about.version')}</span>{' '}
					{__APP_VERSION__}
				</p>
			</SettingsSection>

			<Button
				variant="danger"
				className="self-start"
				disabled
			>
				{t('logout')}
			</Button>
		</section>
	);
}

type SettingsSectionProps = {
	title: string;
	children: ReactNode;
};

function SettingsSection({ title, children }: SettingsSectionProps) {
	const titleId = useId();

	return (
		<Card
			aria-labelledby={titleId}
			className="flex flex-col gap-4"
			role="region"
		>
			<h2
				id={titleId}
				className="text-display-sm"
			>
				{title}
			</h2>
			{children}
		</Card>
	);
}
