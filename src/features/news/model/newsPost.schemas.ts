import { z } from 'zod';

type NewsPost = z.infer<typeof newsPostSchema>;

const newsPostSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  is_important: z.boolean(),
  author: z.object({ id: z.number(), name: z.string() }).nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export { newsPostSchema };
export type { NewsPost };