import { useId, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLatestNews } from '@/features/news/api/queries.ts';
import { NewsFeedEmpty } from './NewsFeedEmpty.tsx';
import { NewsFeedError } from './NewsFeedError.tsx';
import { NewsFeedList } from './NewsFeedList.tsx';
import { NewsFeedLoading } from './NewsFeedLoading.tsx';

function NewsFeed() {
  const { t } = useTranslation('news');
  const { data: posts, isError, isPending, refetch } = useLatestNews();
  const headingId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);

  async function handleRetry() {
    await refetch();
    headingRef.current?.focus();
  }

  let content;

  if (isPending) content = <NewsFeedLoading />;
  else if (isError && posts === undefined)
    content = <NewsFeedError onRetry={() => void handleRetry()} />;
  else if (posts.length === 0) content = <NewsFeedEmpty />;

  else content = <NewsFeedList posts={posts} />;

  return (
    <section
      aria-labelledby={headingId}
      className="mx-auto flex w-full max-w-3xl flex-col gap-4"
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

export { NewsFeed };
