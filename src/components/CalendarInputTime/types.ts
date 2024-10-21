/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClassValue } from "@/commonTypes";
import { ExtractPropTypes, PropType } from "vue";

export const calendarInputTimeProps = {
  inputClass: [String, Object, Array] as PropType<ClassValue>,
  readonly: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  timestamp: {
    type: Number as PropType<number>,
    default: 0,
  },
  language: {
    type: String as PropType<string>,
    default: "en",
  },
  step: {
    type: Number as PropType<number>,
    default: 60, // in minutes
  },
};

export type CalendarInputTimeProps = ExtractPropTypes<
  typeof calendarInputTimeProps
>;

export const calendarInputTimeEmits = defineEmitOptions({
  change: (_d: Date) => true,
});

export type CalendarInputTimeEmits = typeof calendarInputTimeEmits;
