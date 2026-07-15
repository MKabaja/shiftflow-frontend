import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';
import { config } from './config.ts';
import { queryClient } from '@/shared/lib/config/queryClient.ts';
import { queryKeys } from '@/shared/lib/config/queryKeys.ts';
import { router } from '@/shared/lib/config/router.ts';

export const apiClient = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

apiClient.interceptors.response.use(
  (res): AxiosResponse => res,
  (error: AxiosError) => {
    const url = error.config?.url ?? '';
    const isAuthPath = url.includes('/auth/login');

    if (error.response?.status === 401 && !isAuthPath) {
      queryClient.setQueryData(queryKeys.auth.me, null);
      void router.navigate({ href: '/' }); //TODO : zmienić  a `to:'/login' po  3.6
    }
    return Promise.reject(error);
  },
);
