import { z } from 'zod';

type Availability = z.infer<typeof availabilitySchema>;

type AvailabilityQueryParams = {
	year: number;
	month: number;
};

type AvailabilityPayloadKeys = 'date' | 'is_available' | 'notes';
type AvailabilityPayload = Pick<Availability, AvailabilityPayloadKeys>;

type DeleteAvailabilityPayloadKeys = 'id' | 'date';
type DeleteAvailabilityPayload = Pick<
	Availability,
	DeleteAvailabilityPayloadKeys
>;

const availabilitySchema = z.object({
	id: z.number(),
	user_id: z.number(),
	date: z.string(),
	is_available: z.boolean(),
	notes: z.string().nullable(),
	created_at: z.string(),
	updated_at: z.string(),
});

export type {
	Availability,
	AvailabilityPayload,
	AvailabilityQueryParams,
	DeleteAvailabilityPayload,
};
export { availabilitySchema };
