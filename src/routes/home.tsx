import { createRoute } from '@tanstack/react-router';
import { NewsFeed } from '@/features/news/components/NewsFeed';
import { dispositionRoute } from '@/routes/_disposition.tsx';

const homeRoute = createRoute({
	getParentRoute: () => dispositionRoute,
	path: '/home',
	component: NewsFeed,
});

export { homeRoute };
