import { queryOptions, useQuery } from '@tanstack/react-query';
import type { NewsPost, PaginatedResponse } from '@/shared/types/api.ts';
import { queryKeys } from '@/shared/lib/config/queryKeys.ts';
import { http } from '@/shared/api/http.ts';
import { config } from '@/shared/lib/config/config.ts';

/**
 * Query for the first `config.latestNewsLimit` news posts (`GET /news`), important first, then newest.
 *
 * Marked `handled`: errors skip the global toast, the list shows them in place.
 */
const latestNewsQueryOptions = queryOptions({
  queryKey: queryKeys.news.latest,
  meta: { handled: true },
  queryFn: async () => {
    const response = await http.get<PaginatedResponse<NewsPost>>('/news', {
      params: { per_page: config.latestNewsLimit },
    });

    return response.data;
  },
});

function useLatestNews() {
  return useQuery(latestNewsQueryOptions);
}

export { latestNewsQueryOptions, useLatestNews };
