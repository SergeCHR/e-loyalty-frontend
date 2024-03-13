import { FunctionN } from "fp-ts/function";

export const prependParam =
  <PARAMS extends unknown[], R>(f: FunctionN<PARAMS, R>) =>
  (_: unknown, ...params: PARAMS) =>
    f(...params);

export const fill = <T>(length: number, fillFn: FunctionN<[idx: number], T>) =>
  Array.from({ length }, prependParam(fillFn));
