const apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl) {
  throw new Error('VITE_API_URL is not defined. Check your .env file.');
}

const rawPinLength = Number(import.meta.env.VITE_PIN_LENGTH);
const pinLength = Number.isInteger(rawPinLength) && rawPinLength > 0 ? rawPinLength : 4;

export const config = {
  apiUrl,
  isDev: import.meta.env.DEV,
  pinLength,
  staleTime: {
    auth: 5 * 60 * 1000, //5min
    default: 30 * 1000, //30 sec
  },
} as const;
