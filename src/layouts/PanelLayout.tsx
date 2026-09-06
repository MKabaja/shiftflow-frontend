import { Outlet } from '@tanstack/react-router';
import { Sidebar, SIDEBAR_LINKS, SIDEBAR_SETTINGS_LINK } from '@/layouts/components/Sidebar';

import { useAuth } from '@/features/auth/hooks/useAuth.ts';

function PanelLayout() {
  const { user } = useAuth();

  return (
    <div className="bg-bg-primary flex min-h-dvh">
      <Sidebar
        links={SIDEBAR_LINKS}
        settingsLink={SIDEBAR_SETTINGS_LINK}
        userName={user?.name}
      />

      <main className="flex flex-1 flex-col px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export { PanelLayout };
