import { toMonthParams } from '../toMonthParams.ts';

const NEGATIVE_OFFSET_TIME_ZONE = 'America/New_York';
const DECEMBER_INDEX = 11;

function setTimeZone(timeZone: string | undefined) {
  if (timeZone === undefined) {
    delete process.env.TZ;
  } else {
    process.env.TZ = timeZone;
  }
}

describe('toMonthParams', () => {
  const originalTimeZone = process.env.TZ;

  afterEach(() => {
    setTimeZone(originalTimeZone);
  });

  it('extracts year and month from a mid-month date', () => {
    expect(toMonthParams('2026-10-18')).toEqual({ year: 2026, month: 10 });
  });

  it('returns month 12 for the last day of the year', () => {
    expect(toMonthParams('2026-12-31')).toEqual({ year: 2026, month: 12 });
  });

  it('keeps the 1st of a month in its own month in a negative-offset time zone', () => {
    setTimeZone(NEGATIVE_OFFSET_TIME_ZONE);
    const firstOfJanuary = '2026-01-01';

    expect(new Date(firstOfJanuary).getMonth()).toBe(DECEMBER_INDEX);
    expect(toMonthParams(firstOfJanuary)).toEqual({ year: 2026, month: 1 });
  });
});
