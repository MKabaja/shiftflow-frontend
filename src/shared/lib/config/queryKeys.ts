import type { AvailabilityQueryParams } from '@/features/availability/model/availability.schemas.ts';

export const queryKeys = {
  auth: { me: ['auth', 'me'] as const },
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
