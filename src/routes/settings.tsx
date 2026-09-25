import { createRoute } from '@tanstack/react-router';
import { appRoute } from '@/routes/_app.tsx';

const settingsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/settings',
  component: () => <div className="grid min-h-screen place-items-center">/settings</div>,
});

export { settingsRoute };
