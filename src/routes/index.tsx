import { createRoute } from '@tanstack/react-router';
import { publicRoute } from '@/routes/_public.tsx';
import { Logo } from '@/shared/components/Logo';

export const indexRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/',
  component: () => (
    <div className="auth-bg grid h-screen w-screen place-items-center">
      <Logo size="lg" />
    </div>
  ),
});
