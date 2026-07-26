import { createRoute, Outlet, redirect } from '@tanstack/react-router';
import { Route as rootRoute } from '@/routes/__root.tsx';
import { queryClient } from '@/shared/lib/config/queryClient.ts';
import type { User } from '@/shared/types/api.ts';
import { meQueryOptions } from '@/features/auth/api/queries.ts';

const dispositionRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: '_disposition',
  component: Outlet,
  beforeLoad: async () => {
    let user: User | null;
    try {
      user = await queryClient.ensureQueryData(meQueryOptions);
    } catch {
      user = null;
    }

    if (!user) throw redirect({ to: '/login-pin' });
  },
});

export { dispositionRoute };
