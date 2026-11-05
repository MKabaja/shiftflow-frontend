import { z } from 'zod';
import { config } from '@/shared/lib/config/config.ts';

type LoginFormValues = z.infer<typeof loginSchema>;
type LoginPinFormValues = z.infer<typeof loginPinSchema>;

const { pinLength, passwordMinLength } = config;

const loginSchema = z.object({
  login: z.string().trim().min(1, 'validation.loginRequired'),
  password: z
    .string()
    .min(1, 'validation.passwordRequired')
    .min(passwordMinLength, 'validation.passwordTooShort'),
});

const loginPinSchema = z.object({
  login: z.string().trim().min(1, 'validation.loginRequired'),
  pin: z
    .string()
    .regex(/^\d*$/, 'validation.pinDigitsOnly')
    .length(pinLength, 'validation.pinLength'),
});

export { loginSchema, loginPinSchema };
export type { LoginPinFormValues, LoginFormValues };
