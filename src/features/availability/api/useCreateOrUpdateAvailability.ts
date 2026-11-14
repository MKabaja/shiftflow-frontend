import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCachedUser } from '@/features/auth/lib/getCachedUser.ts';
import { createOrUpdateAvailability } from '@/features/availability/api/availability.api.ts';
import {
	invalidateMonth,
	rollbackMonth,
	updateMonthOptimistically,
} from '@/features/availability/api/availabilityMonthCache.ts';
import { buildOptimisticAvailability } from '@/features/availability/lib/buildOptimisticAvailability.ts';

/**
 * Creates or overwrites one day's availability.
 *
 * Optimistic: updates the month cache first, rolls back on error, refetches when settled.
 * Errors go to the global toast.
 */
function useCreateOrUpdateAvailability() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createOrUpdateAvailability,
		onMutate: (payload) =>
			updateMonthOptimistically(queryClient, payload.date, (availabilities) => {
				const exists = availabilities.some(
					(availability) => availability.date === payload.date,
				);

				if (!exists) {
					const user = getCachedUser(queryClient);
					if (!user) return availabilities;

					return [
						...availabilities,
						buildOptimisticAvailability(payload, user.id, new Date()),
					];
				}

				return availabilities.map((availability) =>
					availability.date === payload.date
						? { ...availability, ...payload }
						: availability,
				);
			}),
		onError: (_error, _payload, snapshot) =>
			rollbackMonth(queryClient, snapshot),
		onSettled: (_data, _error, _payload, snapshot) =>
			invalidateMonth(queryClient, snapshot),
	});
}

export { useCreateOrUpdateAvailability };
