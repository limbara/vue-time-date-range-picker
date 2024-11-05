import { PropType, ToRefs, UnwrapRef } from "vue";

export type InferRecord<T extends object> = {
  [K in keyof T]: T[K];
};

export type UnwrapRefs<T extends ToRefs> = {
  [K in keyof T]: UnwrapRef<T[K]>;
};

export type Nullable<T> = T | null;

export type MappedRecord<
  Type extends object,
  Mapping extends Partial<Record<keyof Type, string>>
> = {
  [Property in keyof Type as Property extends keyof Mapping
    ? Mapping[Property] extends string
      ? Mapping[Property]
      : Property
    : Property]: Type[Property];
};

export type EventProp<T extends any[] = any[], F = (...args: T) => void> = F;
export const EventProp = <T extends any[] = any[]>() =>
  [Function, Array] as PropType<EventProp<T>>;

/**
 * check if value is an instance of Date
 * @param value
 * @returns
 */
export const isObjectDate = (value: any): value is Date => {
  return (
    typeof value === "object" &&
    Object.prototype.toString.call(value) === "[object Date]"
  );
};

/**
 * check if an object value's keys is empty
 * @param value
 * @returns
 */
export const isEmptyObject = <T extends object>(value: T): boolean => {
  return Object.keys(value).length === 0;
};

/**
 * exclude listed property from object
 * @param obj 
 * @param exclude 
 * @returns 
 */
export const omit = <T extends object, U extends Extract<keyof T, string>>(
  obj: T,
  exclude: U[]
): Omit<T, U> => {
  const clone = { ...obj };

  exclude.forEach((prop) => delete clone[prop]);

  return clone;
};
