import { createRoute } from '@tanstack/react-router';
import { publicRoute } from '@/routes/_public.tsx';
import { LandingPage } from '@/features/auth/components/LandingPage.tsx';

export const indexRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/',
  component: LandingPage,
});
