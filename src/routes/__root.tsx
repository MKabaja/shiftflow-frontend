import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { config } from '../shared/lib/config.ts';

function RootLayout() {
  return (
    <>
      <Outlet />
      {config.isDev && <TanStackRouterDevtools />}
    </>
  );
}

export const Route = createRootRoute({ component: RootLayout });
