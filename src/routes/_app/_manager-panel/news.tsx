import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/_manager-panel/news')({
	component: () => (
		<div className="grid min-h-screen place-items-center">/news</div>
	),
});
