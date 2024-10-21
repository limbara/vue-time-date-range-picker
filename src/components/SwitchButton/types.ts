/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExtractPropTypes } from "vue";

export const switchButtonProps = {
  checked: {
    type: Boolean,
  },
};

export type SwitchButtonProps = ExtractPropTypes<typeof switchButtonProps>;

export const switchButtonEmits = defineEmitOptions({
  change: (_e: Event) => true,
});
