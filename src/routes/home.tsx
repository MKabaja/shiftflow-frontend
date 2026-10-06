import { createRoute } from '@tanstack/react-router';
import { dispositionRoute } from '@/routes/_disposition.tsx';
import { NewsFeed } from '@/features/news/components/NewsFeed';

const homeRoute = createRoute({
  getParentRoute: () => dispositionRoute,
  path: '/home',
  component: NewsFeed,
});

export { homeRoute };
