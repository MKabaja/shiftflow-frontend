import { queryOptions } from '@tanstack/react-query';
import { fetchLatestNews } from '@/features/news/api/news.api.ts';

/**
 * Query keys and options for news posts.
 *
 * `latest` is marked `handled`: errors skip the global toast, the list shows them in place.
 */
const newsQueries = {
  all: () => ['news'] as const,
  latest: () =>
    queryOptions({
      queryKey: [...newsQueries.all(), 'latest'] as const,
      queryFn: fetchLatestNews,
      meta: { handled: true },
    }),
};

export { newsQueries };
