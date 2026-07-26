import { createRoute } from '@tanstack/react-router';
import { panelRoute } from '@/routes/_panel.tsx';

const scheduleRoute = createRoute({
  getParentRoute: () => panelRoute,
  path: '/schedule',
  component: () => <div className="grid min-h-screen place-items-center">/schedule</div>,
});

export { scheduleRoute };
