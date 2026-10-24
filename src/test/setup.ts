import '@testing-library/jest-dom';
import i18n from '@/shared/i18n';
import { server } from '@/test/msw/server.ts';

await i18n.changeLanguage('en');

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());