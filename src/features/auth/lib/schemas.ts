import { z } from 'zod';
import type { LoginInput, LoginPinInput } from '@/shared/types/api.ts';

const loginSchema = z.object({
  login: z.string().min(1),
  password: z.string().min(3),
}) satisfies z.ZodType<LoginInput>;

const loginPinSchema = z.object({
  login: z.string().min(1),
  pin: z.string().length(4).regex(/^\d+$/),
}) satisfies z.ZodType<LoginPinInput>;

export { loginSchema, loginPinSchema };
