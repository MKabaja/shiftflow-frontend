import { Outlet } from '@tanstack/react-router';
import { Avatar } from '@/shared/components/Avatar';
import { Logo } from '@/shared/components/Logo';
import { BottomNav } from '@/layouts/components/BottomNav';
import { Sidebar } from '@/layouts/components/Sidebar';
import { Modal } from '@/shared/components/Modal';
import { navLinksFor, SETTINGS_LINK } from '@/layouts/navigation';
import { useMatchMedia } from '@/shared/hooks/useMatchMedia.ts';
import { cn } from '@/shared/lib/helpers/cn.ts';
import { config } from '@/shared/lib/config/config.ts';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { landingPathFor } from '@/features/auth/lib/landingPathFor.ts';
import { useAuth } from '@/features/auth/hooks/useAuth.ts';

function AppLayout() {
  const { user } = useAuth();
  const isDesktop = useMatchMedia(config.desktopMediaQuery);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const { t } = useTranslation('auth');

  const links = navLinksFor(user);
  const homeTo = user ? landingPathFor(user) : '/';

  return (
    <div className={cn('bg-bg-primary flex min-h-dvh', !isDesktop && 'flex-col')}>
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

      <main className={cn('flex flex-1 flex-col', isDesktop ? 'px-6 py-8' : 'px-4')}>
        <Outlet />
      </main>

      {!isDesktop && <BottomNav links={links} />}
      <Modal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        title={t('profile.title')}
      />
    </div>
  );
}

export { AppLayout };
