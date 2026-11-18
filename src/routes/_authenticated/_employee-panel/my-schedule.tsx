import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
	'/_authenticated/_employee-panel/my-schedule',
)({
	component: () => (
		<div className="grid min-h-screen place-items-center">/my-schedule</div>
	),
});
