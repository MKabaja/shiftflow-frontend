import { createRoute } from '@tanstack/react-router';
import { LandingPage } from '@/features/auth/components/LandingPage.tsx';
import { publicRoute } from '@/routes/_public.tsx';

export const indexRoute = createRoute({
	getParentRoute: () => publicRoute,
	path: '/',
	component: LandingPage,
});
