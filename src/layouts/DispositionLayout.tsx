import { Outlet } from '@tanstack/react-router';
import { Avatar } from '@/shared/components/Avatar';
import { Logo } from '@/shared/components/Logo';
import { BottomNav } from '@/layouts/components/BottomNav';
import { DISPOSITION_NAV_LINKS } from '@/layouts/navigation';

import { useAuth } from '@/features/auth/hooks/useAuth.ts';

function DispositionLayout() {
  const { user } = useAuth();

  return (
    <div className="auth-bg flex min-h-dvh flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 pt-8 pb-6">
        <Logo size="md" />
        <Avatar name={user?.name} />
      </header>

      <main className="flex flex-1 px-4">
        <Outlet />
      </main>
      <BottomNav links={DISPOSITION_NAV_LINKS} />
    </div>
  );
}

export { DispositionLayout };
