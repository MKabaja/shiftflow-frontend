import { createRoute } from '@tanstack/react-router';
import { panelRoute } from '@/routes/_panel.tsx';

const employeesRoute = createRoute({
  getParentRoute: () => panelRoute,
  path: '/employees',
  component: () => <div className="grid min-h-screen place-items-center">/employees</div>,
});

export { employeesRoute };
