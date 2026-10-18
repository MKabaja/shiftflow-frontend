import { queryClient } from '@/shared/lib/config/queryClient.ts';
import type { AxiosError } from 'axios';
import type {
  Availability,
  UpsertAvailabilityInput,
  ApiError,
  SingleResource,
} from '@/shared/types/api.ts';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/lib/config/axios.ts';
import { queryKeys } from '@/shared/lib/config/queryKeys.ts';
import { toMonthParams } from '@/features/availability/lib/toMonthParams.ts';
import { buildOptimisticAvailability } from '@/features/availability/lib/buildOptimisticAvailability.ts';
import { getCachedUser } from '@/features/auth/lib/getCachedUser.ts';

type AvailabilityMonthKey = ReturnType<typeof queryKeys.availability.month>;

type UpsertAvailabilityContext = {
  prev: Availability[] | undefined;
  key: AvailabilityMonthKey;
};

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
    UpsertAvailabilityContext
  >({
    mutationFn: async (availabilityInput) => {
      const response = await apiClient.post<SingleResource<Availability>>(
        '/availabilities',
        availabilityInput,
      );
      return response.data.data;
    },
    onMutate: async (availabilityInput) => {
      const key = queryKeys.availability.month(toMonthParams(availabilityInput.date));
      await queryClient.cancelQueries({ queryKey: key });
      const prev = queryClient.getQueryData<Availability[]>(key);

      queryClient.setQueryData<Availability[]>(key, (old) => {
        if (!old) return old;
        const exists: boolean = old.some(
          (availability) => availability.date === availabilityInput.date,
        );

        if (!exists) {
          const userId = getCachedUser()?.id ?? 0;
          return [...old, buildOptimisticAvailability(availabilityInput, userId)];
        }

        return old.map((availability) =>
          availability.date === availabilityInput.date
            ? { ...availability, ...availabilityInput }
            : availability,
        );
      });
      return { prev, key };
    },
    onError: (_e, _availabilityInput, context) => {
      if (context?.prev === undefined) return;

      queryClient.setQueryData<Availability[]>(context.key, context.prev);
    },
    onSettled: (_d, _e, _availabilityInput, context) => {
      if (!context) return;

      return queryClient.invalidateQueries({ queryKey: context.key });
    },
  });
}

export { useUpsertAvailability };
