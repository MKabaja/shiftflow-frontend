import { Link, useNavigate } from '@tanstack/react-router';
import { LogOut, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLogout } from '@/features/auth/api/useLogout.ts';
import { useAuth } from '@/features/auth/hooks/useAuth.ts';
import { Avatar } from '@/shared/components/Avatar/Avatar.tsx';
import { Badge } from '@/shared/components/Badge/Badge.tsx';
import { Button } from '@/shared/components/Button/Button.tsx';
import type { ModalPlacement } from '@/shared/components/Modal/Modal.tsx';
import { Modal } from '@/shared/components/Modal/Modal.tsx';
import { cn } from '@/shared/lib/helpers/cn.ts';
import { focusStyles } from '@/shared/lib/styles/focusStyles.ts';

type ProfileModalProps = {
	isOpen: boolean;
	onClose: () => void;
	placement: ModalPlacement;
};

function ProfileModal({ isOpen, onClose, placement }: ProfileModalProps) {
	const { user } = useAuth();
	const { t } = useTranslation('auth');
	const positions = user?.positions ?? [];
	const { mutate: logout, isPending } = useLogout();
	const navigate = useNavigate();

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			placement={placement}
			title={t('profile.title')}
			meta={`${t('profile.version')} ${__APP_VERSION__}`}
			footer={
				<>
					<Link
						className={cn(
							'flex flex-1 items-center gap-2 rounded-md text-text-muted hover:text-text-primary',
							focusStyles,
						)}
						to="/settings"
						onClick={onClose}
					>
						<Settings size={20} />
						{t('profile.settings')}
					</Link>
					<Button
						isLoading={isPending}
						variant="danger"
						onClick={() =>
							logout(undefined, { onSuccess: () => void navigate({ to: '/' }) })
						}
					>
						<LogOut size={20} />
						{t('profile.logout')}
					</Button>
				</>
			}
		>
			<div className="flex flex-col gap-6">
				<div className="flex flex-col items-center justify-center gap-2">
					<Avatar
						size="xl"
						name={user?.name}
					/>
					<p className="mt-3 text-display-lg">{user?.name}</p>
					<dl>
						<dt className="sr-only">{t('profile.loginLabel')}</dt>
						<dd className="text-text-muted">{user?.login}</dd>
					</dl>
					{user && (
						<Badge variant="accent">
							{t(`roles.${user.role}`, { ns: 'common' })}
						</Badge>
					)}
				</div>
				<div className="border-t border-border-subtle pt-6">
					<h3 className="mb-3 font-body font-medium tracking-wider text-text-muted uppercase">
						{t('profile.positions')}
					</h3>

					{positions.length > 0 ? (
						<ul className="flex flex-row flex-wrap gap-4">
							{positions.map((position) => (
								<li
									key={position.id}
									className="inline-flex items-center gap-1.5 rounded-lg bg-bg-surface/50 px-2.5 py-1 shadow-nm-subtle"
								>
									<span
										className="size-3 shrink-0 rounded-full"
										style={{ backgroundColor: position.color }}
									></span>
									<span className="font-display font-semibold text-text-primary">
										{position.name}
									</span>
								</li>
							))}
						</ul>
					) : (
						<p className="text-body-md text-text-muted">
							{t('profile.noPositions')}
						</p>
					)}
				</div>
			</div>
		</Modal>
	);
}

export { ProfileModal };
