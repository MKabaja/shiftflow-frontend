import type { Availability, UpsertAvailabilityInput } from '@/features/availability/model/availability.schemas.ts';

/**
 * Builds a temporary {@link Availability} to show in the cache before the server confirms it.
 *
 * @param now - Sets the timestamps and the temporary `id`, which is negative so it never collides with a real one.
 */
function buildOptimisticAvailability(
  input: UpsertAvailabilityInput,
  userId: number,
  now: Date,
): Availability {
  const timestamp = now.toISOString();

  return {
    ...input,
    id: -now.getTime(),
    user_id: userId,
    created_at: timestamp,
    updated_at: timestamp,
  };
}

export { buildOptimisticAvailability };
