import { createRoute } from '@tanstack/react-router';
import { panelRoute } from '@/routes/_panel.tsx';

const settingsRoute = createRoute({
  getParentRoute: () => panelRoute,
  path: '/settings',
  component: () => <div className="grid min-h-screen place-items-center">/settings</div>,
});

export { settingsRoute };
