import { z } from 'zod';
import type { LoginInput, LoginPinInput } from '@/shared/types/api.ts';
import { config } from '@/shared/lib/config/config.ts';

const { pinLength, passwordMinLength } = config;

const loginSchema = z.object({
  login: z.string().trim().min(1, 'validation.loginRequired'),
  password: z
    .string()
    .min(1, 'validation.passwordRequired')
    .min(passwordMinLength, 'validation.passwordTooShort'),
}) satisfies z.ZodType<LoginInput>;

const loginPinSchema = z.object({
  login: z.string().trim().min(1, 'validation.loginRequired'),
  pin: z
    .string()
    .regex(/^\d*$/, 'validation.pinDigitsOnly')
    .length(pinLength, 'validation.pinLength'),
}) satisfies z.ZodType<LoginPinInput>;

type LoginFormValues = z.infer<typeof loginSchema>;
type LoginPinFormValues = z.infer<typeof loginPinSchema>;

export { loginSchema, loginPinSchema };
export type { LoginPinFormValues, LoginFormValues };
