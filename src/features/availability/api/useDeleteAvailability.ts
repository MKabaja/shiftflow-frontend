import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAvailability } from '@/features/availability/api/availability.api.ts';
import {
	invalidateMonth,
	rollbackMonth,
	updateMonthOptimistically,
} from '@/features/availability/api/availabilityMonthCache.ts';

/**
 * Deletes one day's availability.
 *
 * Optimistic: removes it from the month cache first, restores it on error, refetches when settled.
 * Errors go to the global toast.
 */
export function useDeleteAvailability() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteAvailability,
		onMutate: (payload) =>
			updateMonthOptimistically(queryClient, payload.date, (availabilities) =>
				availabilities.filter((availability) => availability.id !== payload.id),
			),
		onError: (_error, _payload, snapshot) =>
			rollbackMonth(queryClient, snapshot),
		onSettled: (_data, _error, _payload, snapshot) =>
			invalidateMonth(queryClient, snapshot),
	});
}
