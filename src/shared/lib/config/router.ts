import { createRouter } from '@tanstack/react-router';
import { Route as rootRoute } from '@/routes/__root.tsx';
import { appRoute } from '@/routes/_app.tsx';
import { dispositionRoute } from '@/routes/_disposition.tsx';
import { panelRoute } from '@/routes/_panel.tsx';
import { publicRoute } from '@/routes/_public.tsx';
import { availabilityRoute } from '@/routes/availability.tsx';
import { employeesRoute } from '@/routes/employees.tsx';
import { homeRoute } from '@/routes/home.tsx';
import { indexRoute } from '@/routes/index.tsx';
import { loginRoute } from '@/routes/login.tsx';
import { loginPinRoute } from '@/routes/login-pin.tsx';
import { myScheduleRoute } from '@/routes/my-schedule.tsx';
import { newsRoute } from '@/routes/news.tsx';
import { positionsRoute } from '@/routes/positions.tsx';
import { scheduleRoute } from '@/routes/schedule.tsx';
import { settingsRoute } from '@/routes/settings.tsx';
import { Splash } from '@/shared/components/Splash';

const routeTree = rootRoute.addChildren([
	publicRoute.addChildren([indexRoute, loginRoute, loginPinRoute]),
	appRoute.addChildren([
		settingsRoute,
		dispositionRoute.addChildren([
			homeRoute,
			availabilityRoute,
			myScheduleRoute,
		]),
		panelRoute.addChildren([
			scheduleRoute,
			employeesRoute,
			positionsRoute,
			newsRoute,
		]),
	]),
]);

export const router = createRouter({
	routeTree,
	defaultPendingComponent: Splash,
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}
