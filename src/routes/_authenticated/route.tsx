import { createFileRoute, redirect } from '@tanstack/react-router';
import { getCurrentUser } from '@/features/auth/lib/getCurrentUser.ts';
import { AppLayout } from '@/layouts/AppLayout.tsx';

export const Route = createFileRoute('/_authenticated')({
	component: AppLayout,
	beforeLoad: async () => {
		const user = await getCurrentUser();
		if (!user) throw redirect({ to: '/' });
	},
});
