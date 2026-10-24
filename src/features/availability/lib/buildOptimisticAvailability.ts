import type { Availability, UpsertAvailabilityInput } from '@/shared/types/api.ts';

/**
 * Builds a temporary {@link Availability} to show in the cache before the server confirms it.
 *
 * The `id` is negative, so it never collides with a real one and marks the entry as not yet
 * saved. The server's entry replaces it once the month is refetched.
 *
 * @param input Data sent to the backend.
 * @param userId Owner of the entry — the logged-in user.
 * @param now Moment of the change; sets the timestamps and the temporary `id`.
 * @returns A complete {@link Availability} with a temporary `id` and timestamps set to `now`.
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
