/**
 * Thrown by `backend` for any non-2xx response.
 *
 * `body` is the parsed JSON, or `null` when the response was not JSON; narrow it before use.
 */
class HttpError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, body: unknown) {
    super(`Request failed with status ${status}`);
    this.name = 'HttpError';
    this.status = status;
    this.body = body;
  }
}

export { HttpError };
