import { z } from 'zod';

/** Error body sent by the backend; `errors` maps field names to messages and comes only with `422`. */
const apiErrorBodySchema = z.object({
  message: z.string(),
  errors: z.record(z.string(), z.array(z.string())).optional(),
});

type ApiErrorBody = z.infer<typeof apiErrorBodySchema>;

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

export { HttpError, apiErrorBodySchema };
export type { ApiErrorBody };
