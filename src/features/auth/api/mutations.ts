import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/lib/config/axios.ts';
import { queryKeys } from '@/shared/lib/config/queryKeys.ts';
import { queryClient } from '@/shared/lib/config/queryClient.ts';
import { router } from '@/shared/lib/config/router.ts';
import type { AxiosError } from 'axios';
import type { ApiError, LoginInput, SingleResource, User } from '@/shared/types/api.ts';

function useLogin() {
  return useMutation<User, AxiosError<ApiError>, LoginInput>({
    meta: { handled: true },
    mutationFn: async (payload) => {
      const res = await apiClient.post<SingleResource<User>>('/auth/login', payload);
      return res.data.data;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.auth.me, user);

      const href = user.role === 'employee' ? '/home' : '/schedule';
      void router.navigate({ href }); // TODO: zmień na `to` po 3.6(typed routes)
    },
  });
}

export { useLogin };
