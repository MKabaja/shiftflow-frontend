import type { AvailabilityPayload } from '@/features/availability/model/availability.schemas.ts';

import { buildOptimisticAvailability } from '../buildOptimisticAvailability.ts';

const CURRENT_USER_ID = 7;
const MOMENT_OF_CHANGE = new Date('2026-10-18T12:00:00.000Z');
const MOMENT_OF_CHANGE_ISO = '2026-10-18T12:00:00.000Z';
const EXPECTED_TEMPORARY_ID = -1792324800000;

describe('buildOptimisticAvailability', () => {
  it('builds a complete entry with a negative id and timestamps from the given moment', () => {
    const payload = buildPayload('Doctor appointment');

    const result = buildOptimisticAvailability(payload, CURRENT_USER_ID, MOMENT_OF_CHANGE);

    expect(result).toEqual({
      date: '2026-10-18',
      is_available: false,
      notes: 'Doctor appointment',
      id: EXPECTED_TEMPORARY_ID,
      user_id: CURRENT_USER_ID,
      created_at: MOMENT_OF_CHANGE_ISO,
      updated_at: MOMENT_OF_CHANGE_ISO,
    });
  });

  it('keeps null notes as null', () => {
    const payload = buildPayload(null);

    const result = buildOptimisticAvailability(payload, CURRENT_USER_ID, MOMENT_OF_CHANGE);

    expect(result.notes).toBeNull();
  });
});

function buildPayload(notes: string | null): AvailabilityPayload {
  return { date: '2026-10-18', is_available: false, notes };
}