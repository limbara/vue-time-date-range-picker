 
import { PropType } from "vue";

export type InferRecord<T extends object> = {
  [K in keyof T]: T[K];
};

export type EventProp<T extends any[] = any[], F = (...args: T) => void> = F;
export const EventProp = <T extends any[] = any[]>() =>
  [Function, Array] as PropType<EventProp<T>>;
