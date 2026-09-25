import { createRoute } from '@tanstack/react-router';
import { appRoute } from '@/routes/_app.tsx';

const dispositionRoute = createRoute({
  getParentRoute: () => appRoute,
  id: '_disposition',
});

export { dispositionRoute };
