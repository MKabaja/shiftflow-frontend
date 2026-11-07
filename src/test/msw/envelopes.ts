/**
 * Wraps items in Laravel's pagination envelope, as a single page holding all of them.
 *
 * Keeps knowledge of the backend's response shape in one place, so tests describe only the
 * items they care about.
 *
 * @example
 * server.use(http.get('/api/news', () => HttpResponse.json(page([makePost()]))));
 */
export function page<T>(items: T[]) {
  const hasItems = items.length > 0;

  return {
    data: items,
    links: { first: '?page=1', last: '?page=1', prev: null, next: null },
    meta: {
      current_page: 1,
      from: hasItems ? 1 : null,
      last_page: 1,
      links: [{ url: '?page=1', label: '1', page: 1, active: true }],
      path: '/',
      per_page: items.length,
      to: hasItems ? items.length : null,
      total: items.length,
    },
  };
}
