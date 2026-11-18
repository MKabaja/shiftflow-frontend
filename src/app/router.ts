import { createRouter } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen.ts';
import { Splash } from '@/shared/components/Splash';

export const router = createRouter({
	routeTree,
	defaultPendingComponent: Splash,
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}
