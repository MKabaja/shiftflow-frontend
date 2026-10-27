import { useMutation } from '@tanstack/react-query';
import { http } from '@/shared/api/http.ts';
import { queryKeys } from '@/shared/lib/config/queryKeys.ts';
import { queryClient } from '@/shared/lib/config/queryClient.ts';
import { router } from '@/shared/lib/config/router.ts';
import { landingPathFor } from '@/features/auth/lib/landingPathFor.ts';
import type {
  ChangeLocaleInput,
  ChangePasswordInput,
  ChangePinInput,
  LoginInput,
  LoginPinInput,
  SingleResource,
  User,
} from '@/shared/types/api.ts';
import i18n from '@/shared/i18n';

function useLogin() {
  return useMutation({
    meta: { handled: true },
    mutationFn: async (payload: LoginInput) => {
      const response = await http.post<SingleResource<User>>('/auth/login', {
        body: payload,
        ignoreUnauthorized: true,
      });
      return response.data;
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
    mutationFn: async (payload: LoginPinInput) => {
      const response = await http.post<SingleResource<User>>('/auth/login-pin', {
        body: payload,
        ignoreUnauthorized: true,
      });
      return response.data;
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
      await http.post('/auth/logout');
    },
    onSuccess: () => {
      queryClient.clear();
      void router.navigate({ to: '/' });
    },
  });
}
function useChangePassword() {
  return useMutation({
    meta: { handled: true },
    mutationFn: async (payload: ChangePasswordInput) => {
      await http.patch('/me/password', { body: payload });
    },
  });
}
function useChangePin() {
  return useMutation({
    meta: { handled: true },
    mutationFn: async (payload: ChangePinInput) => {
      await http.patch('/me/pin', { body: payload });
    },
  });
}
function useChangeLocale() {
  return useMutation({
    mutationFn: async (payload: ChangeLocaleInput) => {
      await http.patch('/me/locale', { body: payload });
    },
    onSuccess: (_data, variables) => {
      void i18n.changeLanguage(variables.locale);
      void queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
    },
  });
}

export { useLogin, useLoginPin, useLogout, useChangePassword, useChangePin, useChangeLocale };
