import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { config } from '@/shared/lib/config/config.ts';
import { parseApiError } from '@/shared/lib/helpers/parseApiError.ts';
import { toast } from 'sonner';
import i18n from '@/shared/i18n';

interface AppMeta extends Record<string, unknown> {
  handled?: boolean;
}

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: AppMeta;
    mutationMeta: AppMeta;
  }
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      const isHandledLocally = query.meta?.handled === true;
      if (isHandledLocally) return;
      notifyError(error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _vars, _ctx, mutation) => {
      const isHandledLocally = mutation.meta?.handled === true;
      if (isHandledLocally) return;

      notifyError(error);
    },
  }),
  defaultOptions: {
    queries: { retry: 1, staleTime: config.staleTime.default, refetchOnWindowFocus: false },
  },
});

function notifyError(error: unknown) {
  const { messageKey } = parseApiError(error);
  toast.error(i18n.t(messageKey, { ns: 'errors' }));
}
export { queryClient };
