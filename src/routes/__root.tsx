import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { config } from '@/shared/lib/config/config.ts';

export const Route = createRootRoute({ component: RootLayout });

function RootLayout() {
	return (
		<>
			<Outlet />
			{config.isDev && <TanStackRouterDevtools />}
		</>
	);
}
