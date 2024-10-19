/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExtractPropTypes } from "vue";

export const calendarInputDateProps = definePropOptions({
  inputClass: {
    type: [String, Object, Array],
  },
  timestamp: {
    type: Number,
    default: 0,
  },
  format: {
    type: String,
    default: "DD/MM/YYYY",
  },
  language: String,
});

export type CalendarInputDateProps = ExtractPropTypes<
  typeof calendarInputDateProps
>;

export const calendarInputDateEmits = defineEmitOptions({
  change: (_d: Date) => true,
});

export type CalendarInputDateEmits = typeof calendarInputDateEmits;
