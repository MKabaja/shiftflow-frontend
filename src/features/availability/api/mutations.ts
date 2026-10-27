import { useMutation } from '@tanstack/react-query';
import { backend } from '@/shared/api/backend.ts';
import { queryKeys } from '@/shared/lib/config/queryKeys.ts';
import { queryClient } from '@/shared/lib/config/queryClient.ts';
import { toMonthParams } from '@/features/availability/lib/toMonthParams.ts';
import { buildOptimisticAvailability } from '@/features/availability/lib/buildOptimisticAvailability.ts';
import { getCachedUser } from '@/features/auth/lib/getCachedUser.ts';
import type {
  Availability,
  DeleteAvailabilityInput,
  SingleResource,
  UpsertAvailabilityInput,
} from '@/shared/types/api.ts';

type AvailabilityMonthKey = ReturnType<typeof queryKeys.availability.month>;

type AvailabilityMonthSnapshot = {
  prev: Availability[] | undefined;
  key: AvailabilityMonthKey;
};

type AvailabilityListUpdater = (availabilities: Availability[]) => Availability[];

/**
 * Creates or overwrites one day's availability (`POST /availabilities`).
 *
 * Optimistic: updates the month cache first, rolls back on error, refetches when settled.
 * Errors go to the global toast.
 */
function useUpsertAvailability() {
  return useMutation({
    mutationFn: async (availabilityInput: UpsertAvailabilityInput) => {
      const response = await backend.post<SingleResource<Availability>>('/availabilities', {
        body: availabilityInput,
      });
      return response.data;
    },
    onMutate: (availabilityInput) =>
      updateMonthOptimistically(availabilityInput.date, (availabilities) => {
        const exists = availabilities.some(
          (availability) => availability.date === availabilityInput.date,
        );

        if (!exists) {
          const user = getCachedUser();
          if (!user) return availabilities;

          return [
            ...availabilities,
            buildOptimisticAvailability(availabilityInput, user.id, new Date()),
          ];
        }

        return availabilities.map((availability) =>
          availability.date === availabilityInput.date
            ? { ...availability, ...availabilityInput }
            : availability,
        );
      }),
    onError: (_error, _availabilityInput, snapshot) => rollbackMonth(snapshot),
    onSettled: (_data, _error, _availabilityInput, snapshot) => invalidateMonth(snapshot),
  });
}

/**
 * Deletes one day's availability (`DELETE /availabilities/{id}`).
 *
 * Optimistic: removes it from the month cache first, restores it on error, refetches when settled.
 * Errors go to the global toast.
 */
function useDeleteAvailability() {
  return useMutation({
    mutationFn: async (availabilityInput: DeleteAvailabilityInput) => {
      await backend.delete(`/availabilities/${availabilityInput.id}`);
    },
    onMutate: (availabilityInput) =>
      updateMonthOptimistically(availabilityInput.date, (availabilities) =>
        availabilities.filter((availability) => availability.id !== availabilityInput.id),
      ),
    onError: (_error, _availabilityInput, snapshot) => rollbackMonth(snapshot),
    onSettled: (_data, _error, _availabilityInput, snapshot) => invalidateMonth(snapshot),
  });
}

async function updateMonthOptimistically(
  date: string,
  updater: AvailabilityListUpdater,
): Promise<AvailabilityMonthSnapshot> {
  const key = queryKeys.availability.month(toMonthParams(date));
  await queryClient.cancelQueries({ queryKey: key });
  const prev = queryClient.getQueryData<Availability[]>(key);

  queryClient.setQueryData<Availability[]>(key, (old) => (old ? updater(old) : old));
  return { prev, key };
}

function rollbackMonth(snapshot: AvailabilityMonthSnapshot | undefined) {
  if (snapshot?.prev === undefined) return;

  queryClient.setQueryData<Availability[]>(snapshot.key, snapshot.prev);
}

function invalidateMonth(snapshot: AvailabilityMonthSnapshot | undefined) {
  if (!snapshot) return;

  return queryClient.invalidateQueries({ queryKey: snapshot.key });
}

export { useUpsertAvailability, useDeleteAvailability };
