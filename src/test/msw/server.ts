import { setupServer } from 'msw/node';

/**
 * MSW server shared by all tests, managed in `test/setup.ts`.
 *
 * Starts without handlers: declare responses per test with `server.use(...)`; an unhandled request fails the test.
 */
export const server = setupServer();