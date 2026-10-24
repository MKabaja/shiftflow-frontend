import { http, HttpResponse } from 'msw';
import { apiClient } from '../axios.ts';
import { queryClient } from '@/shared/lib/config/queryClient.ts';
import { queryKeys } from '@/shared/lib/config/queryKeys.ts';
import { makeUser } from '@/test/factories/user.ts';
import { server } from '@/test/msw/server.ts';

const respondWithStatus = (path: string, status: number) => {
  server.use(http.all(`/api${path}`, () => HttpResponse.json({ message: 'Error' }, { status })));
};

const loggedInUser = makeUser();
const getCachedMe = () => queryClient.getQueryData(queryKeys.auth.me);

describe('apiClient 401 interceptor', () => {
  beforeEach(() => {
    queryClient.setQueryData(queryKeys.auth.me, loggedInUser);
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('clears auth.me cache on 401 for a non-auth endpoint', async () => {
    respondWithStatus('/schedules', 401);

    await expect(apiClient.get('/schedules')).rejects.toMatchObject({ response: { status: 401 } });
    expect(getCachedMe()).toBeNull();
  });

  it('does not clear cache on 401 from /auth/login', async () => {
    respondWithStatus('/auth/login', 401);

    await expect(apiClient.post('/auth/login', {})).rejects.toMatchObject({
      response: { status: 401 },
    });
    expect(getCachedMe()).toBe(loggedInUser);
  });

  it('does not clear cache on 401 from /auth/login-pin', async () => {
    respondWithStatus('/auth/login-pin', 401);

    await expect(apiClient.post('/auth/login-pin', {})).rejects.toMatchObject({
      response: { status: 401 },
    });
    expect(getCachedMe()).toBe(loggedInUser);
  });

  it('ignores non-401 errors', async () => {
    respondWithStatus('/schedules', 500);

    await expect(apiClient.get('/schedules')).rejects.toMatchObject({ response: { status: 500 } });
    expect(getCachedMe()).toBe(loggedInUser);
  });

  it('ignores network errors without a response', async () => {
    server.use(http.get('/api/schedules', () => HttpResponse.error()));

    await expect(apiClient.get('/schedules')).rejects.toMatchObject({ code: 'ERR_NETWORK' });
    expect(getCachedMe()).toBe(loggedInUser);
  });
});
