import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '@/features/auth/api/auth.api.ts';

function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.clear(),
  });
}

export { useLogout };
