import { createRoute, Outlet, redirect } from '@tanstack/react-router';
import { Route as rootRoute } from '@/routes/__root.tsx';
import { getCurrentUser } from '@/features/auth/lib/getCurrentUser.ts';

const dispositionRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: '_disposition',
  component: Outlet,
  beforeLoad: async () => {
    const user = await getCurrentUser();

    if (!user) throw redirect({ to: '/login-pin' });
  },
});

export { dispositionRoute };
