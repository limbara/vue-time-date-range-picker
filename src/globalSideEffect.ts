import { InferRecord } from "@utils/helpers";
import { ObjectEmitsOptions } from "vue";

type defineEmitOptions = typeof _defineEmitOptions;

const _defineEmitOptions = <T extends ObjectEmitsOptions>(emitOptions: T) => {
  return emitOptions as InferRecord<T>;
};

Object.assign(globalThis, {
  defineEmitOptions: _defineEmitOptions,
});

export type { defineEmitOptions };
