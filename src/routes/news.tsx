import { createRoute } from '@tanstack/react-router';
import { panelRoute } from '@/routes/_panel.tsx';

const newsRoute = createRoute({
  getParentRoute: () => panelRoute,
  path: '/news',
  component: () => <div className="grid min-h-screen place-items-center">Wkrótce</div>,
});

export { newsRoute };
