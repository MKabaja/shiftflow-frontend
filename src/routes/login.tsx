import { createRoute } from '@tanstack/react-router';
import { publicRoute } from '@/routes/_public.tsx';

const loginRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/login',
  component: () => <div className="grid min-h-screen place-items-center">/login</div>,
});

export { loginRoute };
