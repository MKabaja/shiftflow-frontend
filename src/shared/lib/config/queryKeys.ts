//TANSTACK query cache keys
import type { AvailabilityQueryParams } from '@/shared/types/api.ts';

export const queryKeys = {
  auth: { me: ['auth', 'me'] as const },
  schedules: {
    all: ['schedules'] as const,
    list: (filters: Record<string, unknown>) => ['schedules', 'list', filters] as const,
    detail: (id: number) => ['schedules', 'detail', id] as const,
  },
  news: {
    all: ['news'] as const,
    latest: ['news', 'latest'] as const,
  },
  availability: {
    all: ['availability'] as const,
    month: ({ year, month }: AvailabilityQueryParams) =>
      ['availability', 'month', year, month] as const,
  },
};
