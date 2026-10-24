type Deferred<T> = {
  promise: Promise<T>;
  resolve: (value: T) => void;
};

/**
 * Creates a promise that the test resolves by hand, to hold a response at a chosen moment.
 *
 * @example
 * const response = createDeferred();
 * server.use(http.get('/api/news', async () => {
 *   await response.promise;
 *   return HttpResponse.json(page([makePost()]));
 * }));
 * response.resolve();
 */
export function createDeferred<T = void>(): Deferred<T> {
  let resolve: (value: T) => void = () => {};
  const promise = new Promise<T>((resolvePromise) => {
    resolve = resolvePromise;
  });

  return { promise, resolve };
}