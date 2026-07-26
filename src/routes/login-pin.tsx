import { createRoute } from '@tanstack/react-router';
import { publicRoute } from '@/routes/_public.tsx';

const loginPinRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/login-pin',
  component: () => <div className="grid min-h-screen place-items-center">/login-pin</div>,
});

export { loginPinRoute };
