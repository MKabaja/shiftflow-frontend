import { useMutation } from '@tanstack/react-query';
import { backend } from '@/shared/api/backend.ts';
import { resourceOf } from '@/shared/api/envelopes.ts';
import { queryKeys } from '@/shared/lib/config/queryKeys.ts';
import { queryClient } from '@/shared/lib/config/queryClient.ts';
import { router } from '@/shared/lib/config/router.ts';
import { landingPathFor } from '@/features/auth/lib/landingPathFor.ts';
import { userSchema } from '@/features/auth/model/user.schemas.ts';
import type { LoginFormValues, LoginPinFormValues } from '@/features/auth/model/login.schemas.ts';

function useLogin() {
  return useMutation({
    meta: { handled: true },
    mutationFn: async (payload: LoginFormValues) => {
      const body = await backend.post('/auth/login', {
        body: payload,
        ignoreUnauthorized: true,
      });
      return resourceOf(userSchema).parse(body).data;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.auth.me, user);

      const to = landingPathFor(user);
      void router.navigate({ to });
    },
  });
}
function useLoginPin() {
  return useMutation({
    meta: { handled: true },
    mutationFn: async (payload: LoginPinFormValues) => {
      const body = await backend.post('/auth/login-pin', {
        body: payload,
        ignoreUnauthorized: true,
      });
      return resourceOf(userSchema).parse(body).data;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.auth.me, user);

      const to = landingPathFor(user);
      void router.navigate({ to });
    },
  });
}

function useLogout() {
  return useMutation({
    mutationFn: async () => {
      await backend.post('/auth/logout');
    },
    onSuccess: () => {
      queryClient.clear();
      void router.navigate({ to: '/' });
    },
  });
}

export { useLogin, useLoginPin, useLogout };
