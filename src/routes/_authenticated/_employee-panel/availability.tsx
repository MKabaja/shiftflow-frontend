import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
	'/_authenticated/_employee-panel/availability',
)({
	component: () => (
		<div className="grid min-h-screen place-items-center">/availability</div>
	),
});
