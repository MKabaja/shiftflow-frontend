import { createRoute, redirect } from '@tanstack/react-router';
import { getCurrentUser } from '@/features/auth/lib/getCurrentUser.ts';
import { landingPathFor } from '@/features/auth/lib/landingPathFor.ts';
import { appRoute } from '@/routes/_app.tsx';

const panelRoute = createRoute({
	getParentRoute: () => appRoute,
	id: '_panel',
	beforeLoad: async () => {
		const user = await getCurrentUser();

		if (user?.role === 'employee') throw redirect({ to: landingPathFor(user) });
	},
});

export { panelRoute };
