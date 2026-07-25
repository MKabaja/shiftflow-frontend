import { createRoute, Outlet, redirect } from '@tanstack/react-router';
import { Route as rootRoute } from '@/routes/__root.tsx';
import { queryClient } from '@/shared/lib/config/queryClient.ts';
import { queryKeys } from '@/shared/lib/config/queryKeys.ts';
import type { User } from '@/shared/types/api.ts';

const panelRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: '_panel',
  component: Outlet,
  beforeLoad: () => {
    const user = queryClient.getQueryData<User>(queryKeys.auth.me);
    if (!user) throw redirect({ to: '/login' });
    if (user.role === 'employee') throw redirect({ to: '/my-schedule' });
  },
});

export { panelRoute };
