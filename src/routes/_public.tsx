import { createRoute } from '@tanstack/react-router';
import { Route as rootRoute } from '@/routes/__root.tsx';
import { AuthLayout } from '@/layouts/AuthLayout.tsx';

const publicRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: '_public',
  component: AuthLayout,
});

export { publicRoute };
