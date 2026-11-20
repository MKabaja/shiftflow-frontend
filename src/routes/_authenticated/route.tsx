import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProfileModal } from '@/features/auth/components/ProfileModal.tsx';
import { useAuth } from '@/features/auth/hooks/useAuth.ts';
import { getCurrentUser } from '@/features/auth/lib/getCurrentUser.ts';
import { landingPathFor } from '@/features/auth/lib/landingPathFor.ts';
import { BottomNav } from '@/layouts/components/BottomNav';
import { Sidebar } from '@/layouts/components/Sidebar';
import { navLinksFor, SETTINGS_LINK } from '@/layouts/navigation';
import { Avatar } from '@/shared/components/Avatar';
import { Logo } from '@/shared/components/Logo';
import { useMatchMedia } from '@/shared/hooks/useMatchMedia.ts';
import { config } from '@/shared/lib/config/config.ts';
import { cn } from '@/shared/lib/helpers/cn.ts';

export const Route = createFileRoute('/_authenticated')({
	component: AuthenticatedLayout,
	beforeLoad: async ({ context }) => {
		const user = await getCurrentUser(context.queryClient);
		if (!user) throw redirect({ to: '/' });
		return { user };
	},
});

function AuthenticatedLayout() {
	const { user } = useAuth();
	const isDesktop = useMatchMedia(config.desktopMediaQuery);
	const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
	const { t } = useTranslation('auth');

	const links = navLinksFor(user);
	const homeTo = user ? landingPathFor(user) : '/';

	return (
		<div
			className={cn('flex min-h-dvh bg-bg-primary', !isDesktop && 'flex-col')}
		>
			{isDesktop ? (
				<Sidebar
					links={links}
					settingsLink={SETTINGS_LINK}
					homeTo={homeTo}
					userName={user?.name}
					onProfileClick={() => setIsProfileOpen(true)}
				/>
			) : (
				<header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 pt-8 pb-6">
					<Logo size="md" />
					<Avatar
						name={user?.name}
						label={t('profile.openLabel')}
						onClick={() => setIsProfileOpen(true)}
					/>
				</header>
			)}

			<main
				className={cn('flex flex-1 flex-col', isDesktop ? 'px-6 py-8' : 'px-4')}
			>
				<Outlet />
			</main>

			{!isDesktop && <BottomNav links={links} />}
			<ProfileModal
				isOpen={isProfileOpen}
				onClose={() => setIsProfileOpen(false)}
				placement={isDesktop ? 'center' : 'sheet'}
			/>
		</div>
	);
}
