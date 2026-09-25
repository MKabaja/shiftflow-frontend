import { createRoute } from '@tanstack/react-router';
import { dispositionRoute } from '@/routes/_disposition.tsx';

const myScheduleRoute = createRoute({
  getParentRoute: () => dispositionRoute,
  path: '/my-schedule',
  component: () => <div className="grid min-h-screen place-items-center">/my-schedule</div>,
});

export { myScheduleRoute };
