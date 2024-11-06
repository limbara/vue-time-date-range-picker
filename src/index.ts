import "./globalSideEffect.ts";

export type { DatesAvailabilityConfig } from "@composables/useCalendarDateUtil.ts";
export type { InitialDate } from "@composables/useSelectedDates.ts";
export type { FromToRange } from "@components/commonTypes.ts";
export type { SameDateFormatConfig } from "@components/DateInput/types.ts";

export { default as DatePicker } from "@components/DatePicker/DatePicker.vue";
export type {
  DatePickerModelValue,
  DatePickerDateInputProps,
  DatePickerProps,
  datePickerProps,
  DatePickerEmits,
  datePickerEmits,
} from "@components/DatePicker/types.ts";

export { default as CalendarDialog } from "@components/CalendarDialog/CalendarDialog.vue";
export type {
  CalendarDialogInputTimeProps,
  CalendarDialogInputDateProps,
  HelperButtonShape,
  CalendarDialogProps,
  calendarDialogProps,
  CalendarDialogEmits,
  calendarDialogEmits,
} from "@components/CalendarDialog/types.ts";
