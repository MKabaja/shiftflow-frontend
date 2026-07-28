import { createRoute } from '@tanstack/react-router';
import { publicRoute } from '@/routes/_public.tsx';

const loginRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/login',
  component: () => <div className="text-text-muted">/login</div>,
});

export { loginRoute };
