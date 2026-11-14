import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '@/features/auth/api/auth.api.ts';
import { authQueries } from '@/features/auth/api/auth.queries.ts';

function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    meta: { handled: true },
    onSuccess: (user) => queryClient.setQueryData(authQueries.currentUser().queryKey, user),
  });
}

export { useLogin };
