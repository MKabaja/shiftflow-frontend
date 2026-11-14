import type { QueryClient } from '@tanstack/react-query';
import { availabilityQueries } from '@/features/availability/api/availability.queries.ts';
import { toMonthParams } from '@/features/availability/lib/toMonthParams.ts';
import type { Availability } from '@/features/availability/model/availability.schemas.ts';

type AvailabilityMonthKey = ReturnType<
	typeof availabilityQueries.month
>['queryKey'];

type AvailabilityMonthSnapshot = {
	prev: Availability[] | undefined;
	key: AvailabilityMonthKey;
};

type AvailabilityListUpdater = (
	availabilities: Availability[],
) => Availability[];

/**
 * Applies `updater` to the cached month of `date` and returns a snapshot for rollback.
 *
 * Cancels in-flight fetches of that month first. Leaves the cache untouched when the month is not cached.
 */
async function updateMonthOptimistically(
	queryClient: QueryClient,
	date: string,
	updater: AvailabilityListUpdater,
): Promise<AvailabilityMonthSnapshot> {
	const key = availabilityQueries.month(toMonthParams(date)).queryKey;
	await queryClient.cancelQueries({ queryKey: key });
	const prev = queryClient.getQueryData<Availability[]>(key);

	queryClient.setQueryData<Availability[]>(key, (old) =>
		old ? updater(old) : old,
	);
	return { prev, key };
}

/** Restores the month from the snapshot; does nothing when the month was not cached. */
function rollbackMonth(
	queryClient: QueryClient,
	snapshot: AvailabilityMonthSnapshot | undefined,
) {
	if (snapshot?.prev === undefined) return;

	queryClient.setQueryData<Availability[]>(snapshot.key, snapshot.prev);
}

/** Refetches the month from the snapshot; does nothing without a snapshot. */
function invalidateMonth(
	queryClient: QueryClient,
	snapshot: AvailabilityMonthSnapshot | undefined,
): Promise<void> | undefined {
	if (!snapshot) return;

	return queryClient.invalidateQueries({ queryKey: snapshot.key });
}

export { updateMonthOptimistically, rollbackMonth, invalidateMonth };
