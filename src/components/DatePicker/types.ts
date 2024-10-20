/* eslint-disable @typescript-eslint/no-unused-vars */
import PropsValidator from "@utils/PropsValidator";
import { ExtractPropTypes } from "vue";

export const datePickerProps = definePropOptions({
  initialDates: {
    type: Array,
    validator: PropsValidator.isValidInitialDate,
    default() {
      return [];
    },
  },
  inline: {
    type: Boolean,
    default: false,
  },
  language: {
    type: String,
    default: "en",
  },
  format: {
    type: String,
    default: "DD/MM/YYYY HH:mm",
  },
  sameDateFormat: {
    type: Object,
    validator: PropsValidator.isValidSameDateFormat,
    default() {
      return {
        from: "DD/MM/YYYY, HH:mm",
        to: "HH:mm",
      };
    },
  },
  dateInput: {
    type: Object,
    default() {
      return {};
    },
  },
  disabledDates: Object,
  availableDates: Object,
  showHelperButtons: Boolean,
  helperButtons: Array,
  calendarDateInput: Object,
  calendarTimeInput: Object,
  switchButtonLabel: String,
  switchButtonInitial: Boolean,
  applyButtonLabel: String,
  resetButtonLabel: String,
  isMondayFirst: Boolean,
});

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
