import { hashColor } from '../hashColor.ts';

describe('hashColor', () => {
  const hexadecimal = /^#[0-9A-F]{6}$/;
  it('returns the same color for the same input (deterministic)', () => {
    const first = hashColor('John Doe');
    const second = hashColor('John Doe');
    expect(first).toEqual(second);
  });

  it('returns a hex color string', () => {
    const hex = hashColor('John Doe');
    expect(hex).toBeTypeOf('string');
    expect(hex).toMatch(hexadecimal);
  });

  it('does not throw for empty string', () => {
    expect(() => hashColor('')).not.toThrow();
  });
});
