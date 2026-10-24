import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NewsCard } from '../NewsCard.tsx';
import { makePost } from '@/test/factories/newsPost.ts';
import {
  setElementSize,
  stubResizeObserver,
  triggerResize,
  triggerResizeIfObserved,
} from '@/test/mocks/resizeObserver.ts';
import type { NewsPost } from '@/shared/types/api.ts';

const renderNewsCard = (overrides: Partial<NewsPost> = {}) => {
  const post = makePost(overrides);
  const result = render(<NewsCard post={post} />);
  return { post, content: screen.getByText(post.content), ...result };
};

describe('NewsCard', () => {
  beforeEach(() => {
    stubResizeObserver();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('footer', () => {
    it('shows the author, separator and date', () => {
      renderNewsCard();

      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
      expect(screen.getByText('·')).toBeInTheDocument();
      expect(screen.getByText('June 18th, 2026')).toBeInTheDocument();
    });

    it('hides the author and separator when there is no author', () => {
      renderNewsCard({ author: null });

      expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument();
      expect(screen.queryByText('·')).not.toBeInTheDocument();
      expect(screen.getByText('June 18th, 2026')).toBeInTheDocument();
    });
  });

  describe('read more button', () => {
    it('is not rendered when the content fits', () => {
      const { content } = renderNewsCard();

      setElementSize(content, 40, 40);
      triggerResize(content);

      expect(screen.queryByRole('button')).toBeNull();
    });

    it('is rendered when the content is clamped', () => {
      const { content } = renderNewsCard();

      setElementSize(content, 80, 40);
      triggerResize(content);

      expect(screen.getByRole('button', { name: 'Read more' })).toBeInTheDocument();
    });

    it('stays rendered and keeps focus after collapsing', async () => {
      const user = userEvent.setup();
      const { content } = renderNewsCard();
      setElementSize(content, 80, 40);
      triggerResize(content);

      await user.click(screen.getByRole('button', { name: 'Read more' }));
      setElementSize(content, 80, 80);
      triggerResizeIfObserved(content);
      await user.click(screen.getByRole('button', { name: 'Show less' }));

      const button = screen.getByRole('button', { name: 'Read more' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveFocus();
    });
  });
});
