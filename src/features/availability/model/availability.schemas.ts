import { z } from 'zod';

type Availability = z.infer<typeof availabilitySchema>;

type AvailabilityQueryParams = {
  year: number;
  month: number;
};

type UpsertAvailabilityKeys = 'date' | 'is_available' | 'notes';
type UpsertAvailabilityInput = Pick<Availability, UpsertAvailabilityKeys>;

type DeleteAvailabilityKeys = 'id' | 'date';
type DeleteAvailabilityInput = Pick<Availability, DeleteAvailabilityKeys>;

const availabilitySchema = z.object({
  id: z.number(),
  user_id: z.number(),
  date: z.string(),
  is_available: z.boolean(),
  notes: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export { availabilitySchema };
export type {
  Availability,
  AvailabilityQueryParams,
  UpsertAvailabilityInput,
  DeleteAvailabilityInput,
};