import { queryOptions, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/lib/config/queryKeys.ts';
import { backend } from '@/shared/api/backend.ts';
import { pageOf } from '@/shared/api/envelopes.ts';
import { config } from '@/shared/lib/config/config.ts';
import { newsPostSchema } from '@/features/news/model/newsPost.schemas.ts';

/**
 * Query for the first `config.latestNewsLimit` news posts (`GET /news`), important first, then newest.
 *
 * Marked `handled`: errors skip the global toast, the list shows them in place.
 */
const latestNewsQueryOptions = queryOptions({
  queryKey: queryKeys.news.latest,
  meta: { handled: true },
  queryFn: async () => {
    const body = await backend.get('/news', {
      params: { per_page: config.latestNewsLimit },
    });

    return pageOf(newsPostSchema).parse(body).data;
  },
});

function useLatestNews() {
  return useQuery(latestNewsQueryOptions);
}

export { latestNewsQueryOptions, useLatestNews };
