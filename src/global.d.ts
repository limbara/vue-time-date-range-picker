import { defineEmitOptions } from "./globalSideEffect";

declare global {
  const defineEmitOptions: defineEmitOptions;
}
