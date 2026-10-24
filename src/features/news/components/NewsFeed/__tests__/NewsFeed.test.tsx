import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { delay, http, HttpResponse, type HttpResponseResolver } from 'msw';
import { NewsFeed } from '../NewsFeed.tsx';
import { queryKeys } from '@/shared/lib/config/queryKeys.ts';
import { makePost } from '@/test/factories/newsPost.ts';
import { stubResizeObserver } from '@/test/mocks/resizeObserver.ts';
import { page } from '@/test/msw/envelopes.ts';
import { server } from '@/test/msw/server.ts';
import { createDeferred } from '@/test/utils/deferred.ts';
import { renderWithQueryClient } from '@/test/utils/renderWithQueryClient.tsx';
import type { NewsPost } from '@/shared/types/api.ts';

let newsRequestCount = 0;

const mockNews = (resolver: HttpResponseResolver) => {
  server.use(
    http.get('/api/news', (info) => {
      newsRequestCount += 1;
      return resolver(info);
    }),
  );
};

const respondWith = (posts: NewsPost[]) => () => HttpResponse.json(page(posts));
const failWithNetworkError = () => HttpResponse.error();
const neverRespond = async () => {
  await delay('infinite');
};

const renderNewsFeed = (setup?: Parameters<typeof renderWithQueryClient>[1]) =>
  renderWithQueryClient(<NewsFeed />, setup);

const getHeading = () => screen.getByRole('heading', { level: 1, name: 'News' });

describe('NewsFeed', () => {
  beforeEach(() => {
    newsRequestCount = 0;
    stubResizeObserver();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows the loading status while the request is pending', () => {
    mockNews(neverRespond);
    renderNewsFeed();

    expect(getHeading()).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Loading…');
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('shows the error with a retry button when the request fails without data', async () => {
    mockNews(failWithNetworkError);
    renderNewsFeed();

    expect(await screen.findByRole('alert')).toHaveTextContent("Couldn't load news.");
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('sends a new request and shows the loading status on retry', async () => {
    const user = userEvent.setup();
    mockNews(failWithNetworkError);
    renderNewsFeed();
    const button = await screen.findByRole('button', { name: 'Try again' });

    mockNews(neverRespond);
    await user.click(button);

    expect(newsRequestCount).toBe(2);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Try again' })).toBeNull();
  });

  it('shows the error again and focuses the heading after a failed retry', async () => {
    const user = userEvent.setup();
    mockNews(failWithNetworkError);
    renderNewsFeed();
    const button = await screen.findByRole('button', { name: 'Try again' });

    await user.click(button);

    expect(await screen.findByRole('alert')).toHaveTextContent("Couldn't load news.");
    await waitFor(() => expect(getHeading()).toHaveFocus());
  });

  it('shows the list and focuses the heading after a successful retry', async () => {
    const user = userEvent.setup();
    mockNews(failWithNetworkError);
    renderNewsFeed();
    const button = await screen.findByRole('button', { name: 'Try again' });

    const response = createDeferred();
    mockNews(async () => {
      await response.promise;
      return HttpResponse.json(page([makePost()]));
    });
    await user.click(button);
    response.resolve();

    expect(await screen.findByRole('list')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).toBeNull();
    await waitFor(() => expect(getHeading()).toHaveFocus());
  });

  it('keeps the cached list without a loading status while refreshing', async () => {
    const post = makePost();
    mockNews(neverRespond);
    renderNewsFeed((client) => client.setQueryData(queryKeys.news.latest, [post]));

    await waitFor(() => expect(newsRequestCount).toBe(1));

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('keeps the cached list without an alert when a refresh fails', async () => {
    const post = makePost();
    mockNews(failWithNetworkError);
    const { queryClient } = renderNewsFeed((client) =>
      client.setQueryData(queryKeys.news.latest, [post]),
    );

    await waitFor(() => {
      expect(newsRequestCount).toBe(1);
      expect(queryClient.getQueryState(queryKeys.news.latest)?.status).toBe('error');
    });

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('shows the empty state when there are no posts', async () => {
    mockNews(respondWith([]));
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
    mockNews(respondWith(posts));
    renderNewsFeed();

    expect(await screen.findAllByRole('listitem')).toHaveLength(3);
    for (const post of posts) {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    }
  });
});
