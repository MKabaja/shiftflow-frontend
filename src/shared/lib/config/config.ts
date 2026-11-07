export const config = {
  apiUrl: '/api',
  isDev: import.meta.env.DEV,
  pinLength: 4,
  passwordMinLength: 6,
  latestNewsLimit: 10,
  relativeDateLimitDays: 2,
  desktopMediaQuery: '(min-width: 48rem)',
  staleTime: {
    auth: 5 * 60_000,
    default: 30_000,
  },
} as const;
