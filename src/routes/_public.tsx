import { createRoute, Outlet } from '@tanstack/react-router';
import { Route as rootRoute } from '@/routes/__root.tsx';

const publicRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: '_public',
  component: Outlet,
});

export { publicRoute };
