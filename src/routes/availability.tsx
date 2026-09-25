import { createRoute } from '@tanstack/react-router';
import { dispositionRoute } from '@/routes/_disposition.tsx';

const availabilityRoute = createRoute({
  getParentRoute: () => dispositionRoute,
  path: '/availability',
  component: () => <div className="grid min-h-screen place-items-center">/availability</div>,
});

export { availabilityRoute };
