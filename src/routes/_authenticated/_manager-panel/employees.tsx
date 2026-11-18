import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
	'/_authenticated/_manager-panel/employees',
)({
	component: () => (
		<div className="grid min-h-screen place-items-center">/employees</div>
	),
});
