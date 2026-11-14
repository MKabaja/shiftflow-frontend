import { createRoute, redirect } from '@tanstack/react-router';
import { getCurrentUser } from '@/features/auth/lib/getCurrentUser.ts';
import { AppLayout } from '@/layouts/AppLayout.tsx';
import { Route as rootRoute } from '@/routes/__root.tsx';

const appRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: '_app',
	component: AppLayout,
	beforeLoad: async () => {
		const user = await getCurrentUser();

		if (!user) throw redirect({ to: '/' });
	},
});

export { appRoute };
