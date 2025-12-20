import { ComKey, LocKey, PriKey } from "@fjell/types";

export const isComKey = (key: any): key is ComKey<any, any, any, any, any, any> => {
  return typeof key !== 'undefined' &&
    (typeof key.pk !== 'undefined' && typeof key.kt !== 'undefined') && (typeof key.loc !== 'undefined' && Array.isArray(key.loc));
}

export const isPriKey = (key: any): key is PriKey<any> => {
  return typeof key !== 'undefined' &&
    (typeof key.pk !== 'undefined' && typeof key.kt !== 'undefined') && (typeof key.loc === 'undefined');
}

export const toKeyTypeArray = <
  S extends string,
  L1 extends string = never,
  L2 extends string = never,
  L3 extends string = never,
  L4 extends string = never,
  L5 extends string = never
>(ik: ComKey<S, L1, L2, L3, L4, L5> | PriKey<S>):
  string[] => {
  if (isComKey(ik)) {
    const ck = ik as ComKey<S, L1, L2, L3, L4, L5>;
    return [ck.kt, ...ck.loc.map((l: LocKey<L1 | L2 | L3 | L4 | L5>) => l.kt)];
  } else {
    return [(ik as PriKey<S>).kt];
  }
}

