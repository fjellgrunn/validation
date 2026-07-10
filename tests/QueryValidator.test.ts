import { describe, expect, it } from 'vitest';
import {
  validateActionName,
  validateFacetName,
  validateFinderName,
  validateOperationParams,
  validateQuery,
} from '../src/QueryValidator';

describe('QueryValidator', () => {
  describe('validateQuery', () => {
    it('allows undefined and null query', () => {
      expect(() => validateQuery(undefined, 'all')).not.toThrow();
      expect(() => validateQuery(null as any, 'all')).not.toThrow();
    });

    it('allows empty and populated object queries', () => {
      expect(() => validateQuery({}, 'all')).not.toThrow();
      expect(() => validateQuery({ filter: { status: 'active' } }, 'all')).not.toThrow();
    });

    it('rejects non-objects and arrays', () => {
      expect(() => validateQuery('bad' as any, 'all')).toThrow(/Invalid query parameter/);
      expect(() => validateQuery([] as any, 'all')).toThrow(/cannot be an array/);
    });
  });

  describe('validateOperationParams', () => {
    it('allows undefined and valid param objects', () => {
      expect(() => validateOperationParams(undefined, 'find')).not.toThrow();
      expect(() => validateOperationParams({}, 'find')).not.toThrow();
      expect(() => validateOperationParams({
        email: 'a@b.com',
        limit: 10,
        active: true,
        when: new Date(),
        tags: ['a', 1, true],
      }, 'find')).not.toThrow();
    });

    it('rejects null, non-objects, arrays, and invalid value types', () => {
      expect(() => validateOperationParams(null as any, 'find')).toThrow(/cannot be null/);
      expect(() => validateOperationParams('x' as any, 'find')).toThrow(/Invalid operation parameters/);
      expect(() => validateOperationParams([] as any, 'find')).toThrow(/cannot be an array/);
      expect(() => validateOperationParams({ nested: { a: 1 } } as any, 'find')).toThrow(
        /Invalid value type for parameter "nested"/
      );
    });
  });

  describe('validateFinderName', () => {
    it('accepts non-empty finder names', () => {
      expect(() => validateFinderName('byEmail', 'find')).not.toThrow();
    });

    it('rejects missing, non-string, and whitespace-only names', () => {
      expect(() => validateFinderName(undefined, 'find')).toThrow(/non-empty string/);
      expect(() => validateFinderName(123 as any, 'find')).toThrow(/non-empty string/);
      expect(() => validateFinderName('   ', 'find')).toThrow(/cannot be empty/);
    });
  });

  describe('validateActionName', () => {
    it('accepts non-empty action names', () => {
      expect(() => validateActionName('archive', 'action')).not.toThrow();
    });

    it('rejects missing, non-string, and whitespace-only names', () => {
      expect(() => validateActionName(undefined, 'action')).toThrow(/non-empty string/);
      expect(() => validateActionName(false as any, 'action')).toThrow(/non-empty string/);
      expect(() => validateActionName('\t', 'action')).toThrow(/cannot be empty/);
    });
  });

  describe('validateFacetName', () => {
    it('accepts non-empty facet names', () => {
      expect(() => validateFacetName('summary', 'facet')).not.toThrow();
    });

    it('rejects missing, non-string, and whitespace-only names', () => {
      expect(() => validateFacetName(undefined, 'facet')).toThrow(/non-empty string/);
      expect(() => validateFacetName({} as any, 'facet')).toThrow(/non-empty string/);
      expect(() => validateFacetName(' ', 'facet')).toThrow(/cannot be empty/);
    });
  });
});
