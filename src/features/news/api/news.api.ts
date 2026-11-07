import { backend } from '@/shared/api/backend.ts';
import { pageOf } from '@/shared/api/envelopes.ts';
import { config } from '@/shared/lib/config/config.ts';
import { newsPostSchema, type NewsPost } from '@/features/news/model/newsPost.schemas.ts';

/** Fetches the first `config.latestNewsLimit` news posts (`GET /news`), important first, then newest. */
async function fetchLatestNews(): Promise<NewsPost[]> {
  const body = await backend.get('/news', {
    params: { per_page: config.latestNewsLimit },
  });

  return pageOf(newsPostSchema).parse(body).data;
}

export { fetchLatestNews };
