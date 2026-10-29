import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { ZodError } from 'zod';
import { config } from '@/shared/lib/config/config.ts';
import { parseApiError } from '@/shared/api/parseApiError.ts';
import { onUnauthorized } from '@/shared/api/backend.ts';
import { queryKeys } from '@/shared/lib/config/queryKeys.ts';
import { toast } from 'sonner';
import i18n from '@/shared/i18n';

type AppMeta = {
  handled?: boolean;
};

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: AppMeta;
    mutationMeta: AppMeta;
  }
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      logContractError(error);

      const isHandledLocally = query.meta?.handled === true;
      if (isHandledLocally) return;
      notifyError(error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _vars, _ctx, mutation) => {
      logContractError(error);

      const isHandledLocally = mutation.meta?.handled === true;
      if (isHandledLocally) return;

      notifyError(error);
    },
  }),
  defaultOptions: {
    queries: { retry: 1, staleTime: config.staleTime.default, refetchOnWindowFocus: false },
  },
});

onUnauthorized(() => queryClient.setQueryData(queryKeys.auth.me, null));

function logContractError(error: unknown) {
  if (config.isDev && error instanceof ZodError) console.error(error);
}

function notifyError(error: unknown) {
  const { messageKey } = parseApiError(error);
  toast.error(i18n.t(messageKey, { ns: 'errors' }));
}
export { queryClient };
