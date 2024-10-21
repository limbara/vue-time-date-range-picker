/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClassValue } from "@/commonTypes";
import { ExtractPropTypes, PropType } from "vue";

export const calendarInputDateProps = {
  inputClass: [String, Object, Array] as PropType<ClassValue>,
  timestamp: {
    type: Number as PropType<number>,
    default: 0,
  },
  format: {
    type: String as PropType<string>,
    default: "DD/MM/YYYY",
  },
  language: {
    type: String as PropType<string>,
    default: "en",
  },
};

export type CalendarInputDateProps = ExtractPropTypes<
  typeof calendarInputDateProps
>;

export const calendarInputDateEmits = defineEmitOptions({
  change: (_d: Date) => true,
});

export type CalendarInputDateEmits = typeof calendarInputDateEmits;
