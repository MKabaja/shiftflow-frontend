import { getInitials } from '../getInitials.ts';

describe('getInitials', () => {
  it('returns initials for full name', () => {
    const initials = getInitials('John Doe');
    expect(initials).toBe('JD');
    expect(initials).not.toBe('??');
    expect(initials).not.toBe('');
  });

  it('uppercases the result', () => {
    const initials = getInitials('bratt pitt');
    expect(initials).toBe('BP');
    expect(initials).not.toBe('bp');
  });

  it('uses first and last word when 3+words given', () => {
    const threeWordsName = getInitials('John Mark Smith');
    expect(threeWordsName).toBe('JS');
    expect(threeWordsName).not.toBe('JMS');
    expect(threeWordsName).not.toBe('??');
  });

  it('returns JJ for single word', () => {
    const initials = getInitials('John');
    expect(initials).toBe('JJ');
    expect(initials).not.toBe('??');
  });

  it('returns ?? for empty string', () => {
    const initials = getInitials('');
    expect(initials).toBe('??');
  });

  it('returns ?? for whitespace-only string', () => {
    const initials = getInitials(' ');
    expect(initials).toBe('??');
  });
});
