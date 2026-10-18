import type { Availability, UpsertAvailabilityInput } from '@/shared/types/api.ts';

/**
 * Builds a temporary {@link Availability} to show in the cache before the server confirms it.
 *
 * The `id` is negative, so it never collides with a real one and marks the entry as not yet
 * saved. The server's entry replaces it once the month is refetched.
 *
 * @param input Data sent to the backend.
 * @param userId Owner of the entry — the logged-in user.
 * @returns A complete {@link Availability} with a temporary `id` and current timestamps.
 */
function buildOptimisticAvailability(input: UpsertAvailabilityInput, userId: number): Availability {
  const now = new Date().toISOString();

  return {
    ...input,
    id: -Date.now(),
    user_id: userId,
    created_at: now,
    updated_at: now,
  };
}

export { buildOptimisticAvailability };
