import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/_employee-panel')({
	component: EmployeePanelLayout,
});

function EmployeePanelLayout() {
	return (
		<div className="mx-auto w-full max-w-3xl">
			<Outlet />
		</div>
	);
}
