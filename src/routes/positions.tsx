import { createRoute } from '@tanstack/react-router';
import { panelRoute } from '@/routes/_panel.tsx';

const positionsRoute = createRoute({
  getParentRoute: () => panelRoute,
  path: '/positions',
  component: () => <div className="grid min-h-screen place-items-center">/positions</div>,
});

export { positionsRoute };
