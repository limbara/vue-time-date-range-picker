import { defineEmitOptions, definePropOptions } from "./globalSideEffect";

declare global {
  const definePropOptions: definePropOptions;
  const defineEmitOptions: defineEmitOptions;
}
