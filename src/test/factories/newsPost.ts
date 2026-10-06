import type { NewsPost } from '@/shared/types/api.ts';

/**
 * Test factory for {@link NewsPost} — deterministic defaults + shallow overrides.
 *
 * `created_at` is older than the relative-date limit, so cards show the full date
 * (`June 18th, 2026` in `en`) regardless of the current time. Posts rendered together
 * need distinct `id` (list key) and `title` / `content` (text queries).
 *
 * @example
 * const anonymous = makePost({ author: null });
 * const posts = [makePost({ id: 1 }), makePost({ id: 2, title: 'Second post' })];
 */
export function makePost(overrides: Partial<NewsPost> = {}): NewsPost {
  return {
    id: 1,
    title: 'Warehouse closed on Friday',
    content: 'The warehouse will be closed on Friday due to maintenance.',
    is_important: false,
    author: { id: 1, name: 'Jane Doe' },
    created_at: '2026-06-18T12:00:00+00:00',
    updated_at: '2026-06-18T12:00:00+00:00',
    ...overrides,
  };
}
