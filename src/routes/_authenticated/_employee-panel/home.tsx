import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { type ReactNode, useId, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { newsQueries } from '@/features/news/api/news.queries.ts';
import { NewsFeedEmpty } from '@/features/news/components/NewsFeedEmpty/NewsFeedEmpty.tsx';
import { NewsFeedError } from '@/features/news/components/NewsFeedError/NewsFeedError.tsx';
import { NewsFeedList } from '@/features/news/components/NewsFeedList/NewsFeedList.tsx';
import { NewsFeedLoading } from '@/features/news/components/NewsFeedLoading/NewsFeedLoading.tsx';

export const Route = createFileRoute('/_authenticated/_employee-panel/home')({
	component: HomePage,
});

function HomePage() {
	const { t } = useTranslation('news');
	const {
		data: posts,
		isError,
		isPending,
		refetch,
	} = useQuery(newsQueries.latest());
	const headingId = useId();
	const headingRef = useRef<HTMLHeadingElement>(null);

	async function handleRetry() {
		await refetch();
		headingRef.current?.focus();
	}

	let content: ReactNode;

	if (isPending) content = <NewsFeedLoading />;
	else if (isError && posts === undefined)
		content = <NewsFeedError onRetry={() => void handleRetry()} />;
	else if (posts.length === 0) content = <NewsFeedEmpty />;
	else content = <NewsFeedList posts={posts} />;

	return (
		<section
			aria-labelledby={headingId}
			className="flex flex-col gap-4"
		>
			<h1
				id={headingId}
				ref={headingRef}
				tabIndex={-1}
				className="text-display-lg focus-visible:outline-none"
			>
				{t('feed.title')}
			</h1>
			{content}
		</section>
	);
}
