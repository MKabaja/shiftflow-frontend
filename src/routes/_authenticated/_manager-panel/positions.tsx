import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
	'/_authenticated/_manager-panel/positions',
)({
	component: () => (
		<div className="grid min-h-screen place-items-center">/positions</div>
	),
});
