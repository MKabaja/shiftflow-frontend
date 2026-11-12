import type { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderResult } from '@testing-library/react';

type QueryClientSetup = (queryClient: QueryClient) => void;

type RenderWithQueryClientResult = RenderResult & {
  queryClient: QueryClient;
};

/**
 * Renders `ui` inside a fresh `QueryClient` with retries off.
 *
 * @param setup - Runs before rendering, e.g. to seed the cache.
 * @returns The render result plus the `queryClient`.
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