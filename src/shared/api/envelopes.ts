import { z } from 'zod';

const paginationLinksSchema = z.object({
  first: z.string(),
  last: z.string(),
  prev: z.string().nullable(),
  next: z.string().nullable(),
});

const paginationMetaSchema = z.object({
  current_page: z.number(),
  from: z.number().nullable(),
  last_page: z.number(),
  links: z.array(
    z.object({
      url: z.string().nullable(),
      label: z.string(),
      page: z.number().nullable(),
      active: z.boolean(),
    }),
  ),
  path: z.string(),
  per_page: z.number(),
  to: z.number().nullable(),
  total: z.number(),
});

/** Schema of a single Laravel API resource: `{ data }`. */
function resourceOf<T extends z.ZodType>(schema: T) {
  return z.object({ data: schema });
}

/** Schema of a Laravel resource collection without pagination: `{ data: [] }`. */
function collectionOf<T extends z.ZodType>(schema: T) {
  return z.object({ data: z.array(schema) });
}

/** Schema of a Laravel paginated list: `{ data: [], links, meta }`. */
function pageOf<T extends z.ZodType>(schema: T) {
  return z.object({
    data: z.array(schema),
    links: paginationLinksSchema,
    meta: paginationMetaSchema,
  });
}

export { resourceOf, collectionOf, pageOf };
