import { createRoute } from '@tanstack/react-router';
import { Route } from './__root.tsx';
import { DevShowcase } from '@/dev-showcase.tsx';

export const indexRoute = createRoute({
  getParentRoute: () => Route,
  path: '/',
  component: DevShowcase,
});
