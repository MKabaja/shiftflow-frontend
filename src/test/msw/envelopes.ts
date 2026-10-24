import type { PaginatedResponse } from '@/shared/types/api.ts';

/**
 * Wraps items in Laravel's pagination envelope, as a single page holding all of them.
 *
 * Keeps knowledge of the backend's response shape in one place, so tests describe only the
 * items they care about.
 *
 * @example
 * server.use(http.get('/api/news', () => HttpResponse.json(page([makePost()]))));
 */
export function page<T>(items: T[]): PaginatedResponse<T> {
  return {
    data: items,
    links: { first: '?page=1', last: '?page=1', prev: null, next: null },
    meta: { current_page: 1, last_page: 1, per_page: items.length, total: items.length },
  };
}