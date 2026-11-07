import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from '@/shared/lib/config/router.ts';
import { login } from '@/features/auth/api/auth.api.ts';
import { authQueries } from '@/features/auth/api/auth.queries.ts';
import { landingPathFor } from '@/features/auth/lib/landingPathFor.ts';

function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    meta: { handled: true },
    onSuccess: (user) => {
      queryClient.setQueryData(authQueries.currentUser().queryKey, user);

      const to = landingPathFor(user);
      void router.navigate({ to });
    },
  });
}

export { useLogin };
