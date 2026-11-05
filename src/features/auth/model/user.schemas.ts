import { z } from 'zod';

type User = z.infer<typeof userSchema>;

const positionSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  color: z.string(),
});

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().nullable(),
  login: z.string(),
  role: z.enum(['admin', 'manager', 'employee']),
  is_active: z.boolean(),
  hourly_rate: z.number().nullable(),
  monthly_hour_limit: z.number().nullable(),
  quarter_hour_limit: z.number().nullable(),
  break_limit: z.number().nullable(),
  contract_type: z.enum(['employment_contract', 'mandate_contract']).nullable(),
  locale: z.enum(['pl', 'en']),
  positions: z.array(positionSchema),
  created_at: z.string(),
});

export { userSchema };
export type { User };
