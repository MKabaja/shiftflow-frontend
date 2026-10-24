import { NewsCard } from '@/features/news/components/NewsCard.tsx';
import type { NewsPost } from '@/shared/types/api.ts';

type NewsFeedListProps = {
  posts: NewsPost[];
};

function NewsFeedList({ posts }: NewsFeedListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {posts.map((post) => (
        <li key={post.id}>
          <NewsCard post={post} />
        </li>
      ))}
    </ul>
  );
}

export { NewsFeedList };
