import type { NewsPost } from '@/features/news/model/newsPost.schemas.ts';

/**
 * Builds a {@link NewsPost} with deterministic defaults and shallow overrides.
 *
 * `created_at` is past the relative-date limit, so cards show a full date. Posts rendered
 * together need distinct `id`, `title` and `content`.
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
