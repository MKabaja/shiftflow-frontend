import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/lib/config/axios.ts';
import { queryKeys } from '@/shared/lib/config/queryKeys.ts';
import { queryClient } from '@/shared/lib/config/queryClient.ts';
import { toMonthParams } from '@/features/availability/lib/toMonthParams.ts';
import { buildOptimisticAvailability } from '@/features/availability/lib/buildOptimisticAvailability.ts';
import { getCachedUser } from '@/features/auth/lib/getCachedUser.ts';
import type { AxiosError } from 'axios';
import type {
  ApiError,
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
 * Creates or overwrites the availability entry for one day (`POST /availabilities`).
 *
 * Optimistic: the month's cache changes before the request, is rolled back on error and
 * refetched once the mutation settles. Errors go to the global toast.
 *
 * @returns TanStack mutation; `mutate` takes an {@link UpsertAvailabilityInput}.
 */
function useUpsertAvailability() {
  return useMutation<
    Availability,
    AxiosError<ApiError>,
    UpsertAvailabilityInput,
    AvailabilityMonthSnapshot
  >({
    mutationFn: async (availabilityInput) => {
      const response = await apiClient.post<SingleResource<Availability>>(
        '/availabilities',
        availabilityInput,
      );
      return response.data.data;
    },
    onMutate: (availabilityInput) =>
      updateMonthOptimistically(availabilityInput.date, (availabilities) => {
        const exists = availabilities.some(
          (availability) => availability.date === availabilityInput.date,
        );

        if (!exists) {
          const user = getCachedUser();
          if (!user) return availabilities;

          return [...availabilities, buildOptimisticAvailability(availabilityInput, user.id)];
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
 * Deletes one day's availability entry (`DELETE /availabilities/{id}`).
 *
 * Optimistic: the entry disappears from the month's cache before the request, comes back on
 * error and the month is refetched once the mutation settles. Errors go to the global toast.
 *
 * @returns TanStack mutation; `mutate` takes a {@link DeleteAvailabilityInput}.
 */
function useDeleteAvailability() {
  return useMutation<
    void,
    AxiosError<ApiError>,
    DeleteAvailabilityInput,
    AvailabilityMonthSnapshot
  >({
    mutationFn: async (availabilityInput) => {
      await apiClient.delete(`/availabilities/${availabilityInput.id}`);
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
