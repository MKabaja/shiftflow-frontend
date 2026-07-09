import { createRouter } from '@tanstack/react-router';
import { indexRoute } from '@/routes';
import { Route as rootRoute } from '@/routes/__root.tsx';

const routeTree = rootRoute.addChildren([indexRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
