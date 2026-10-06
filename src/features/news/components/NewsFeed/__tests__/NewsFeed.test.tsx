import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NewsFeed } from '../NewsFeed.tsx';
import { apiClient } from '@/shared/lib/config/axios.ts';
import { queryKeys } from '@/shared/lib/config/queryKeys.ts';
import { makePost } from '@/test/factories/newsPost.ts';
import { stubResizeObserver } from '@/test/mocks/resizeObserver.ts';
import type { NewsPost } from '@/shared/types/api.ts';

vi.mock('@/shared/lib/config/axios.ts', () => ({ apiClient: { get: vi.fn() } }));

const mockGet = vi.mocked(apiClient.get);

const respondWith = (posts: NewsPost[]) => ({ data: { data: posts } });

const createDeferred = () => {
  let resolve!: (value: unknown) => void;
  const promise = new Promise((r) => (resolve = r));
  return { promise, resolve };
};

const renderNewsFeed = (setup: (queryClient: QueryClient) => void = () => {}) => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  setup(queryClient);
  const result = render(
    <QueryClientProvider client={queryClient}>
      <NewsFeed />
    </QueryClientProvider>,
  );
  return { queryClient, ...result };
};

const getHeading = () => screen.getByRole('heading', { level: 1, name: 'News' });

describe('NewsFeed', () => {
  beforeEach(() => {
    stubResizeObserver();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('shows the loading status while the request is pending', () => {
    mockGet.mockReturnValue(new Promise(() => {}));
    renderNewsFeed();

    expect(getHeading()).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Loading…');
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('shows the error with a retry button when the request fails without data', async () => {
    mockGet.mockRejectedValue(new Error('Network'));
    renderNewsFeed();

    expect(await screen.findByRole('alert')).toHaveTextContent("Couldn't load news.");
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('sends a new request and shows the loading status on retry', async () => {
    const user = userEvent.setup();
    mockGet.mockRejectedValue(new Error('Network'));
    renderNewsFeed();
    const button = await screen.findByRole('button', { name: 'Try again' });

    mockGet.mockReturnValue(createDeferred().promise);
    await user.click(button);

    expect(mockGet).toHaveBeenCalledTimes(2);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Try again' })).toBeNull();
  });

  it('shows the error again and focuses the heading after a failed retry', async () => {
    const user = userEvent.setup();
    mockGet.mockRejectedValue(new Error('Network'));
    renderNewsFeed();
    const button = await screen.findByRole('button', { name: 'Try again' });

    await user.click(button);

    expect(await screen.findByRole('alert')).toHaveTextContent("Couldn't load news.");
    await waitFor(() => expect(getHeading()).toHaveFocus());
  });

  it('shows the list and focuses the heading after a successful retry', async () => {
    const user = userEvent.setup();
    mockGet.mockRejectedValue(new Error('Network'));
    renderNewsFeed();
    const button = await screen.findByRole('button', { name: 'Try again' });

    const deferred = createDeferred();
    mockGet.mockReturnValue(deferred.promise);
    await user.click(button);
    deferred.resolve(respondWith([makePost()]));

    expect(await screen.findByRole('list')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).toBeNull();
    await waitFor(() => expect(getHeading()).toHaveFocus());
  });

  it('keeps the cached list without a loading status while refreshing', async () => {
    const post = makePost();
    mockGet.mockReturnValue(new Promise(() => {}));
    renderNewsFeed((client) => client.setQueryData(queryKeys.news.latest, [post]));

    await waitFor(() => expect(mockGet).toHaveBeenCalled());

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('keeps the cached list without an alert when a refresh fails', async () => {
    const post = makePost();
    mockGet.mockRejectedValue(new Error('Network'));
    const { queryClient } = renderNewsFeed((client) =>
      client.setQueryData(queryKeys.news.latest, [post]),
    );

    await waitFor(() => {
      expect(mockGet).toHaveBeenCalled();
      expect(queryClient.getQueryState(queryKeys.news.latest)?.status).toBe('error');
    });

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('shows the empty state when there are no posts', async () => {
    mockGet.mockResolvedValue(respondWith([]));
    renderNewsFeed();

    expect(await screen.findByText('No news yet')).toBeInTheDocument();
    expect(
      screen.getByText("When management posts something, you'll see it here."),
    ).toBeInTheDocument();
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('renders a list item for every post', async () => {
    const posts = [
      makePost({ id: 1, title: 'First post', content: 'First content' }),
      makePost({ id: 2, title: 'Second post', content: 'Second content' }),
      makePost({ id: 3, title: 'Third post', content: 'Third content' }),
    ];
    mockGet.mockResolvedValue(respondWith(posts));
    renderNewsFeed();

    expect(await screen.findAllByRole('listitem')).toHaveLength(3);
    for (const post of posts) {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    }
  });
});
