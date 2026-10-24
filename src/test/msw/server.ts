import { setupServer } from 'msw/node';

/**
 * MSW server shared by every test file — started, reset and closed in `test/setup.ts`.
 *
 * Starts with no handlers: each test declares the responses it needs with `server.use(...)`,
 * and any request without a handler fails the test.
 *
 * @example
 * server.use(http.get('/api/news', () => HttpResponse.json(page([makePost()]))));
 */
export const server = setupServer();