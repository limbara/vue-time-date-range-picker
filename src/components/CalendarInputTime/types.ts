import { ExtractPropTypes } from "vue";

export const calendarInputTimeProps = definePropOptions({
  inputClass: [String, Object, Array],
  readonly: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Number,
    default: 0,
  },
  language: String,
  step: {
    type: Number,
    default: 60, // in minutes
  },
});

export type CalendarInputTimeProps = ExtractPropTypes<
  typeof calendarInputTimeProps
>;

export const calendarInputTimeEmits = defineEmitOptions({
  change: (_d: Date) => true,
});

export type CalendarInputTimeEmits = typeof calendarInputTimeEmits;
