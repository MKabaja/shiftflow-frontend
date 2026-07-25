import { createRoute } from '@tanstack/react-router';
import { Route } from './__root.tsx';
import { Logo } from '@/shared/components/Logo';

export const indexRoute = createRoute({
  getParentRoute: () => Route,
  path: '/',
  component: () => (
    <div className="auth-bg grid h-screen w-screen place-items-center">
      <Logo size="lg" />
    </div>
  ),
});
