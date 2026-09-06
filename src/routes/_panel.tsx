import { createRoute, redirect } from '@tanstack/react-router';
import { Route as rootRoute } from '@/routes/__root.tsx';
import { landingPathFor } from '@/features/auth/lib/landingPathFor.ts';
import { getCurrentUser } from '@/features/auth/lib/getCurrentUser.ts';
import { PanelLayout } from '@/layouts/PanelLayout.tsx';

const panelRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: '_panel',
  component: PanelLayout,
  beforeLoad: async () => {
    const user = await getCurrentUser();

    if (!user) throw redirect({ to: '/login' });
    if (user.role === 'employee') throw redirect({ to: landingPathFor(user) });
  },
});

export { panelRoute };
