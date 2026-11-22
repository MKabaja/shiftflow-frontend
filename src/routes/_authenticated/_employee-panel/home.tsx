import { createFileRoute } from '@tanstack/react-router';
import { NewsFeed } from '@/features/news/components/NewsFeed/NewsFeed.tsx';

export const Route = createFileRoute('/_authenticated/_employee-panel/home')({
	component: NewsFeed,
});
