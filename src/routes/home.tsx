import { createRoute } from '@tanstack/react-router';
import { dispositionRoute } from '@/routes/_disposition.tsx';

const homeRoute = createRoute({
  getParentRoute: () => dispositionRoute,
  path: '/home',
  component: () => <div className="grid min-h-screen place-items-center">/home</div>,
});

export { homeRoute };
