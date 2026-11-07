import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from '@/shared/lib/config/router.ts';
import { logout } from '@/features/auth/api/auth.api.ts';

function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      void router.navigate({ to: '/' });
    },
  });
}

export { useLogout };
