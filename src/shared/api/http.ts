import { config } from '@/shared/lib/config/config.ts';
import { HttpError } from '@/shared/api/httpError.ts';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

type QueryParams = Record<string, string | number>;

type RequestOptions = {
  params?: QueryParams;
  signal?: AbortSignal;
  ignoreUnauthorized?: boolean;
};

type BodyRequestOptions = RequestOptions & {
  body?: unknown;
};

type UnauthorizedHandler = () => void;

const acceptJsonHeaders = { Accept: 'application/json' };
const sendJsonHeaders = { ...acceptJsonHeaders, 'Content-Type': 'application/json' };

let unauthorizedHandler: UnauthorizedHandler | undefined;

/**
 * JSON client for the backend; paths are relative to `config.apiUrl`.
 *
 * - resolves to the parsed body, or `undefined` when the body is empty,
 * - rejects with a plain `Error` when a 2xx body is not JSON,
 * - rejects with {@link HttpError} for any non-2xx status; a `401` first calls the
 *   {@link onUnauthorized} handler, unless `ignoreUnauthorized` is set.
 */
const http = {
  get,
  post,
  patch,
  delete: deleteRequest,
};

function onUnauthorized(handler: UnauthorizedHandler) {
  unauthorizedHandler = handler;
}

function get<T = unknown>(path: string, options?: RequestOptions): Promise<T> {
  return request<T>('GET', path, options);
}

function post<T = unknown>(path: string, options?: BodyRequestOptions): Promise<T> {
  return request<T>('POST', path, options);
}

function patch<T = unknown>(path: string, options?: BodyRequestOptions): Promise<T> {
  return request<T>('PATCH', path, options);
}

function deleteRequest<T = unknown>(path: string, options?: RequestOptions): Promise<T> {
  return request<T>('DELETE', path, options);
}

async function request<T>(
  method: HttpMethod,
  path: string,
  options: BodyRequestOptions = {},
): Promise<T> {
  const { params, signal, ignoreUnauthorized = false, body } = options;
  const hasBody = body !== undefined;

  const response = await fetch(buildUrl(path, params), {
    method,
    signal,
    headers: hasBody ? sendJsonHeaders : acceptJsonHeaders,
    body: hasBody ? JSON.stringify(body) : undefined,
  });

  if (response.ok) return (await readSuccessBody(response)) as T;

  if (response.status === 401 && !ignoreUnauthorized) unauthorizedHandler?.();

  throw new HttpError(response.status, await readErrorBody(response));
}

function buildUrl(path: string, params: QueryParams = {}): URL {
  const url = new URL(config.apiUrl + path, window.location.origin);

  for (const [name, value] of Object.entries(params)) {
    url.searchParams.set(name, String(value));
  }

  return url;
}

async function readSuccessBody(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) return undefined;
  if (!isJsonResponse(response)) throw new Error(`Expected a JSON response from ${response.url}`);

  return JSON.parse(text);
}

async function readErrorBody(response: Response): Promise<unknown> {
  if (!isJsonResponse(response)) return null;

  try {
    return await response.json();
  } catch {
    return null;
  }
}

function isJsonResponse(response: Response): boolean {
  return response.headers.get('Content-Type')?.includes('application/json') ?? false;
}

export { http, onUnauthorized };
