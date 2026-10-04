import { useId, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Newspaper } from 'lucide-react';
import { Alert } from '@/shared/components/Alert';
import { Button } from '@/shared/components/Button';
import { useLatestNews } from '@/features/news/api/queries.ts';
import { NewsCard } from '@/features/news/components/NewsCard.tsx';
import { NewsCardSkeleton } from '@/features/news/components/NewsCardSkeleton.tsx';

const SKELETON_COUNT = 2;

function NewsFeed() {
  const { t } = useTranslation('news');
  const { t: tCommon } = useTranslation('common');
  const { data: posts, isError, isFetching, isPending, errorUpdatedAt, refetch } = useLatestNews();
  const headingId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);

  async function handleRetry() {
    const result = await refetch();
    if (result.isSuccess) headingRef.current?.focus();
  }

  let content;
  if (isPending) {
    content = (
      <div
        role="status"
        className="flex flex-col gap-4"
      >
        <span className="sr-only">{tCommon('loading')}</span>
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <NewsCardSkeleton key={index} />
        ))}
      </div>
    );
  } else if (isError && posts === undefined) {
    content = (
      <div className="flex flex-col items-start gap-3">
        <Alert
          key={errorUpdatedAt}
          message={t('feed.error')}
        />
        <Button
          variant="secondary"
          isLoading={isFetching}
          onClick={() => void handleRetry()}
        >
          {tCommon('actions.retry')}
        </Button>
      </div>
    );
  } else if (posts.length === 0) {
    content = (
      <div className="flex flex-col items-center gap-2 py-12 text-center">
        <Newspaper
          className="text-text-muted size-10"
          aria-hidden={true}
        />
        <p className="text-text-primary text-body-lg">{t('feed.empty')}</p>
        <p className="text-text-muted text-body-sm">{t('feed.emptyHint')}</p>
      </div>
    );
  } else {
    content = (
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.id}>
            <NewsCard post={post} />
          </li>
        ))}
      </ul>
    );
  }

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
