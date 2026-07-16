import type { AxiosError } from 'axios';
import { apiClient } from '../axios.ts';
import { queryClient } from '@/shared/lib/config/queryClient.ts';
import { router } from '@/shared/lib/config/router.ts';
import { queryKeys } from '@/shared/lib/config/queryKeys.ts';

type RejectedHandler = (error: AxiosError) => Promise<never>;

vi.mock('../config.ts', () => ({
  config: { apiUrl: '/api' },
}));
vi.mock('@/shared/lib/config/queryClient.ts', () => ({
  queryClient: { setQueryData: vi.fn() },
}));
vi.mock('@/shared/lib/config/router.ts', () => ({
  router: { navigate: vi.fn() },
}));

const rejected = (
  apiClient.interceptors.response as unknown as {
    handlers: { rejected: RejectedHandler }[];
  }
).handlers[0].rejected;

const makeError = (status: number | undefined, url: string): AxiosError =>
  ({
    config: { url },
    response: status === undefined ? undefined : { status },
  }) as AxiosError;

describe('apiClient 401 interceptor', () => {
  beforeEach(() => vi.clearAllMocks());

  it('clears auth.me cache on 401 for a non-auth endpoint', async () => {
    const error = makeError(401, '/api/schedules');

    await expect(rejected(error)).rejects.toBe(error);
    expect(queryClient.setQueryData).toHaveBeenCalledWith(queryKeys.auth.me, null); //null clears cache
  });

  it('redirects on 401 for a non-auth endpoint', async () => {
    const error = makeError(401, '/api/schedules');

    await expect(rejected(error)).rejects.toBe(error);
    expect(router.navigate).toHaveBeenCalledOnce();
  });

  it('does not clear cache or redirect on 401 from /auth/login', async () => {
    const error = makeError(401, '/auth/login');

    await expect(rejected(error)).rejects.toBe(error);
    expect(queryClient.setQueryData).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('does not clear cache or redirect on 401 from /auth/login-pin', async () => {
    const error = makeError(401, '/auth/login-pin');

    await expect(rejected(error)).rejects.toBe(error);
    expect(queryClient.setQueryData).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('ignores non-401 errors', async () => {
    const error = makeError(500, '/api/schedules');

    await expect(rejected(error)).rejects.toBe(error);
    expect(queryClient.setQueryData).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('ignores network errors without a response', async () => {
    const error = makeError(undefined, '/api/schedules');

    await expect(rejected(error)).rejects.toBe(error);
    expect(queryClient.setQueryData).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
