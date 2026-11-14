import { createRoute, redirect } from '@tanstack/react-router';
import { getCurrentUser } from '@/features/auth/lib/getCurrentUser.ts';
import { landingPathFor } from '@/features/auth/lib/landingPathFor.ts';
import { AuthLayout } from '@/layouts/AuthLayout.tsx';
import { Route as rootRoute } from '@/routes/__root.tsx';

const publicRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: '_public',
	component: AuthLayout,
	beforeLoad: async () => {
		const user = await getCurrentUser();
		if (user) throw redirect({ to: landingPathFor(user) });
	},
});

export { publicRoute };
