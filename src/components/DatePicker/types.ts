/* eslint-disable @typescript-eslint/no-unused-vars */
import { calendarDialogProps } from "@/CalendarDialog/types";
import { DateInputProps, dateInputProps } from "@/DateInput/types";
import { ExtractPropTypes, PropType } from "vue";

type DatePickerDateInputProps = Partial<
  Pick<
    DateInputProps,
    "inputClass" | "refName" | "name" | "placeholder" | "id" | "required"
  >
>;

export const datePickerProps = {
  initialDates: calendarDialogProps.initialDates,
  inline: calendarDialogProps.inline,
  language: calendarDialogProps.language,
  format: dateInputProps.format,
  sameDateFormat: dateInputProps.sameDateFormat,
  dateInput: {
    type: Object as PropType<DatePickerDateInputProps>,
    default: () => ({} as DatePickerDateInputProps),
  },
  disabledDates: calendarDialogProps.disabledDates,
  availableDates: calendarDialogProps.availableDates,
  showHelperButtons: calendarDialogProps.showHelperButtons,
  helperButtons: calendarDialogProps.helperButtons,
  calendarDateInput: calendarDialogProps.dateInput,
  calendarTimeInput: calendarDialogProps.timeInput,
  switchButtonLabel: calendarDialogProps.switchButtonLabel,
  switchButtonInitial: calendarDialogProps.switchButtonInitial,
  applyButtonLabel: calendarDialogProps.applyButtonLabel,
  resetButtonLabel: calendarDialogProps.resetButtonLabel,
  isMondayFirst: calendarDialogProps.isMondayFirst,
};

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>;

export const datePickerEmits = defineEmitOptions({
  "date-applied": (_startDate: Date, _endDate: Date) => true,
  "datepicker-opened": () => true,
  "datepicker-closed": () => true,
  "on-prev-calendar": (_e: Event) => true,
  "on-next-calendar": (_e: Event) => true,
  "select-date": (_startDate: Date, _endDate: Date) => true,
  "select-disabled-date": (_date: Date) => true,
  "on-reset": (_e: Event) => true,
});
