import { InferRecord } from "@utils/helpers";
import { ComponentObjectPropsOptions, ObjectEmitsOptions } from "vue";

type definePropOptions = typeof _definePropOptions;

const _definePropOptions = <T>(propOptions: ComponentObjectPropsOptions<T>) => {
  return propOptions;
};

type defineEmitOptions = typeof _defineEmitOptions;

const _defineEmitOptions = <T extends ObjectEmitsOptions>(emitOptions: T) => {
  return emitOptions as InferRecord<T>;
};

Object.assign(globalThis, {
  definePropOptions: _definePropOptions,
  defineEmitOptions: _defineEmitOptions,
});

export type { definePropOptions, defineEmitOptions };
