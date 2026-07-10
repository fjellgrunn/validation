import { describe, expect, it } from 'vitest';
import { isComKey, isPriKey, toKeyTypeArray } from '../src/utils';

describe('validation utils type guards', () => {
  it('isComKey returns false for null/undefined without throwing', () => {
    expect(isComKey(null)).toBe(false);
    expect(isComKey(undefined)).toBe(false);
  });

  it('isPriKey returns false for null/undefined without throwing', () => {
    expect(isPriKey(null)).toBe(false);
    expect(isPriKey(undefined)).toBe(false);
  });

  it('isComKey accepts empty loc arrays', () => {
    expect(isComKey({ kt: 'product', pk: '1', loc: [] })).toBe(true);
    expect(isPriKey({ kt: 'product', pk: '1', loc: [] })).toBe(false);
  });

  it('isPriKey accepts keys without loc', () => {
    expect(isPriKey({ kt: 'product', pk: '1' })).toBe(true);
    expect(isComKey({ kt: 'product', pk: '1' })).toBe(false);
  });

  it('toKeyTypeArray includes location key types for ComKey', () => {
    expect(toKeyTypeArray({
      kt: 'product',
      pk: '1',
      loc: [{ kt: 'store', lk: '2' }]
    })).toEqual(['product', 'store']);
  });
});
