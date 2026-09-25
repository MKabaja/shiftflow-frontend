export const config = {
  apiUrl: '/api',
  isDev: false,
  pinLength: 4,
  passwordMinLength: 6,
  desktopMediaQuery: '(min-width: 48rem)',
  staleTime: {
    auth: 5 * 60 * 1000, //5min
    default: 30 * 1000, //30 sec
  },
} as const;
