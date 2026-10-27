/**
 * Thrown by `backend` when the request never reached the server (offline, DNS, CORS); `cause` holds
 * the original `fetch` error.
 */
class NetworkError extends Error {
  constructor(cause: unknown) {
    super('Network request failed', { cause });
    this.name = 'NetworkError';
  }
}

export { NetworkError };
