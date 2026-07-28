import { createRoute } from '@tanstack/react-router';
import { publicRoute } from '@/routes/_public.tsx';

const loginPinRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/login-pin',
  component: () => <div className="text-text-muted">/login-pin</div>,
});

export { loginPinRoute };
