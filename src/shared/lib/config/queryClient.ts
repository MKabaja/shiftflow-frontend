import { QueryClient } from '@tanstack/react-query';
import { config } from '@/shared/lib/config/config.ts';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: config.staleTime.default, refetchOnWindowFocus: false },
  },
});
