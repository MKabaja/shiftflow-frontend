import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/lib/config/axios.ts';
import { queryKeys } from '@/shared/lib/config/queryKeys.ts';
import { queryClient } from '@/shared/lib/config/queryClient.ts';
import { router } from '@/shared/lib/config/router.ts';
import { landingPathFor } from '@/features/auth/lib/landingPathFor.ts';
import type { AxiosError } from 'axios';
import type {
  ApiError,
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
  return useMutation<User, AxiosError<ApiError>, LoginInput>({
    meta: { handled: true },
    mutationFn: async (payload) => {
      const res = await apiClient.post<SingleResource<User>>('/auth/login', payload);
      return res.data.data;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.auth.me, user);

      const to = landingPathFor(user);
      void router.navigate({ to });
    },
  });
}
function useLoginPin() {
  return useMutation<User, AxiosError<ApiError>, LoginPinInput>({
    meta: { handled: true },
    mutationFn: async (payload) => {
      const res = await apiClient.post<SingleResource<User>>('/auth/login-pin', payload);
      return res.data.data;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.auth.me, user);

      const to = landingPathFor(user);
      void router.navigate({ to });
    },
  });
}

function useLogout() {
  return useMutation<void, AxiosError<ApiError>>({
    mutationFn: async () => {
      await apiClient.post('/auth/logout');
    },
    onSuccess: () => {
      queryClient.clear();
      void router.navigate({ to: '/' });
    },
  });
}
function useChangePassword() {
  return useMutation<void, AxiosError<ApiError>, ChangePasswordInput>({
    meta: { handled: true },
    mutationFn: async (payload) => {
      await apiClient.patch('/me/password', payload);
    },
  });
}
function useChangePin() {
  return useMutation<void, AxiosError<ApiError>, ChangePinInput>({
    meta: { handled: true },
    mutationFn: async (payload) => {
      await apiClient.patch('/me/pin', payload);
    },
  });
}
function useChangeLocale() {
  return useMutation<void, AxiosError<ApiError>, ChangeLocaleInput>({
    mutationFn: async (payload) => {
      await apiClient.patch('/me/locale', payload);
    },
    onSuccess: (_data, variables) => {
      void i18n.changeLanguage(variables.locale);
      void queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
    },
  });
}

export { useLogin, useLoginPin, useLogout, useChangePassword, useChangePin, useChangeLocale };
