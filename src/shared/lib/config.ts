const apiUrl = import.meta.env.VITE_API_URL
if (!apiUrl) {
  throw new Error('VITE_API_URL is not defined. Check your .env file.')
}

export const config = {
  apiUrl,
  isDev: import.meta.env.DEV,
} as const
