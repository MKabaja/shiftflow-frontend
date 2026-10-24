import type { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderResult } from '@testing-library/react';

type QueryClientSetup = (queryClient: QueryClient) => void;

type RenderWithQueryClientResult = RenderResult & {
  queryClient: QueryClient;
};

/**
 * Renders `ui` inside a fresh `QueryClient`, so no cache leaks between tests.
 *
 * Retries are off — a failed request shows its error state at once instead of after backoff.
 *
 * @param ui Element to render.
 * @param setup Runs before rendering, e.g. to seed the cache with `setQueryData`.
 * @returns The usual render result plus the `queryClient`, for asserting on cache state.
 *
 * @example
 * renderWithQueryClient(<NewsFeed />, (client) => client.setQueryData(queryKeys.news.latest, [post]));
 */
export function renderWithQueryClient(
  ui: ReactElement,
  setup?: QueryClientSetup,
): RenderWithQueryClientResult {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  setup?.(queryClient);

  return {
    queryClient,
    ...render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>),
  };
}