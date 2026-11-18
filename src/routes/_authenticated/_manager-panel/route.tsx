import { createFileRoute, redirect } from '@tanstack/react-router';
import { getCurrentUser } from '@/features/auth/lib/getCurrentUser.ts';
import { landingPathFor } from '@/features/auth/lib/landingPathFor.ts';

export const Route = createFileRoute('/_authenticated/_manager-panel')({
	beforeLoad: async () => {
		const user = await getCurrentUser();
		if (user?.role === 'employee') throw redirect({ to: landingPathFor(user) });
	},
});
