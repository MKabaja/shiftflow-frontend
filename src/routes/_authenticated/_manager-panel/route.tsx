import { createFileRoute, redirect } from '@tanstack/react-router';
import { landingPathFor } from '@/features/auth/lib/landingPathFor.ts';

export const Route = createFileRoute('/_authenticated/_manager-panel')({
	beforeLoad: ({ context: { user } }) => {
		if (user.role === 'employee') throw redirect({ to: landingPathFor(user) });
	},
});
