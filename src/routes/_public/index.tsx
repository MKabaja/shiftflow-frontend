import { createFileRoute } from '@tanstack/react-router';
import { LandingPage } from '@/features/auth/components/LandingPage.tsx';

export const Route = createFileRoute('/_public/')({
	component: LandingPage,
});
