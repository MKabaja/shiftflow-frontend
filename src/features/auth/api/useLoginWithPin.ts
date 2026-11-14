import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginWithPin } from '@/features/auth/api/auth.api.ts';
import { authQueries } from '@/features/auth/api/auth.queries.ts';

function useLoginWithPin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginWithPin,
    meta: { handled: true },
    onSuccess: (user) => queryClient.setQueryData(authQueries.currentUser().queryKey, user),
  });
}

export { useLoginWithPin };
