import type { AvailabilityQueryParams } from '@/features/availability/model/availability.schemas.ts';

export const queryKeys = {
  availability: {
    all: ['availability'] as const,
    month: ({ year, month }: AvailabilityQueryParams) =>
      ['availability', 'month', year, month] as const,
  },
};
