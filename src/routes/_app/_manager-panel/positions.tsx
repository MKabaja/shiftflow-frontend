import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/_manager-panel/positions')({
	component: () => (
		<div className="grid min-h-screen place-items-center">/positions</div>
	),
});
