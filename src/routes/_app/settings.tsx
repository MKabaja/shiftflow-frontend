import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/settings')({
	component: () => (
		<div className="grid min-h-screen place-items-center">/settings</div>
	),
});
