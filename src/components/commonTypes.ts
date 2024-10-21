export type FromToRange<F, T = F> = {
  from: F;
  to: T;
};

export type ClassValue = string | Array<unknown> | Record<string, unknown>;
