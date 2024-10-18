/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExtractPropTypes } from "vue";

export const calendarInputDateProps = definePropOptions({
  inputClass: [String, Object, Array],
  timestamp: Number,
  format: String,
  language: String,
});

export type CalendarInputDateProps = ExtractPropTypes<
  typeof calendarInputDateProps
>;

export const calendarInputDateEmits = defineEmitOptions({
  change: (_d: Date) => true,
});

export type CalendarInputDateEmits = typeof calendarInputDateEmits
