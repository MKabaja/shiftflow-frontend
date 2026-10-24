import { queryOptions, useQuery } from '@tanstack/react-query';
import type { ApiError, NewsPost, PaginatedResponse } from '@/shared/types/api.ts';
import type { AxiosError } from 'axios';
import { queryKeys } from '@/shared/lib/config/queryKeys.ts';
import { apiClient } from '@/shared/lib/config/axios.ts';
import { config } from '@/shared/lib/config/config.ts';

/**
 * Query definition for the latest news posts (`GET /news`).
 *
 * Fetches only the first page, limited to `config.latestNewsLimit` posts, and
 * unwraps the pagination envelope to a bare array. Order comes from the
 * backend: important posts first, then newest first.
 *
 * Marked `handled`, so a failure does not trigger the global error toast —
 * the component rendering the list shows the error in place, with a retry.
 */
const latestNewsQueryOptions = queryOptions<NewsPost[], AxiosError<ApiError>>({
  queryKey: queryKeys.news.latest,
  meta: { handled: true },
  queryFn: async () => {
    const response = await apiClient.get<PaginatedResponse<NewsPost>>('/news', {
      params: { per_page: config.latestNewsLimit },
    });

    return response.data.data;
  },
});

/**
 * React binding for {@link latestNewsQueryOptions}.
 *
 * @returns TanStack Query result holding up to `config.latestNewsLimit`
 * {@link NewsPost}s, or an `AxiosError`. `data` is `undefined` until the first
 * fetch resolves.
 */
function useLatestNews() {
  return useQuery(latestNewsQueryOptions);
}

export { latestNewsQueryOptions, useLatestNews };
