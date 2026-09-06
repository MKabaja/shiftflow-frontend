import { Outlet } from '@tanstack/react-router';
import { Sidebar } from '@/layouts/components/Sidebar';
import { PANEL_NAV_LINKS, SETTINGS_LINK } from '@/layouts/navigation';

import { useAuth } from '@/features/auth/hooks/useAuth.ts';

function PanelLayout() {
  const { user } = useAuth();

  return (
    <div className="bg-bg-primary flex min-h-dvh">
      <Sidebar
        links={PANEL_NAV_LINKS}
        settingsLink={SETTINGS_LINK}
        userName={user?.name}
      />

      <main className="flex flex-1 flex-col px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export { PanelLayout };
