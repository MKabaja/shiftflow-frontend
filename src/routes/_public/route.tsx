import { createFileRoute, redirect } from '@tanstack/react-router';
import { getCurrentUser } from '@/features/auth/lib/getCurrentUser.ts';
import { landingPathFor } from '@/features/auth/lib/landingPathFor.ts';
import { AuthLayout } from '@/layouts/AuthLayout.tsx';

export const Route = createFileRoute('/_public')({
	component: AuthLayout,
	beforeLoad: async ({ context }) => {
		const user = await getCurrentUser(context.queryClient);
		if (user) throw redirect({ to: landingPathFor(user) });
	},
});
