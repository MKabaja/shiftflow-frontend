import { createRoute } from '@tanstack/react-router';
import { publicRoute } from '@/routes/_public.tsx';

export const indexRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/',
  component: () => <div className="text-text-muted">Landing (placeholder)</div>,
});
