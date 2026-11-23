import { createRouter } from '@tanstack/react-router';
import { queryClient } from '@/app/queryClient.ts';
import { routeTree } from '@/routeTree.gen.ts';
import { Splash } from '@/shared/components/Splash/Splash.tsx';

export const router = createRouter({
	routeTree,
	defaultPendingComponent: Splash,
	context: {
		queryClient,
	},
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}
