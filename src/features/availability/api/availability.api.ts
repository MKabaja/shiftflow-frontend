import {
	type Availability,
	type AvailabilityPayload,
	type AvailabilityQueryParams,
	availabilitySchema,
	type DeleteAvailabilityPayload,
} from '@/features/availability/model/availability.schemas.ts';
import { backend } from '@/shared/api/backend.ts';
import { collectionOf, resourceOf } from '@/shared/api/envelopes.ts';

/** `GET /availabilities`: entries of one month, sorted by date. `month` is 1–12, not `Date.getMonth()`. */
async function fetchAvailabilityMonth(
	params: AvailabilityQueryParams,
): Promise<Availability[]> {
	const body = await backend.get('/availabilities', { params });

	return collectionOf(availabilitySchema).parse(body).data;
}

/** `POST /availabilities`: creates the entry for `payload.date` or overwrites the existing one. */
async function createOrUpdateAvailability(
	payload: AvailabilityPayload,
): Promise<Availability> {
	const body = await backend.post('/availabilities', { body: payload });

	return resourceOf(availabilitySchema).parse(body).data;
}

/** `DELETE /availabilities/{id}`. */
async function deleteAvailability(
	payload: DeleteAvailabilityPayload,
): Promise<void> {
	await backend.delete(`/availabilities/${payload.id}`);
}

export {
	createOrUpdateAvailability,
	deleteAvailability,
	fetchAvailabilityMonth,
};
