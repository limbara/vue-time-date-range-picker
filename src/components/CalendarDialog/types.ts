/* eslint-disable @typescript-eslint/no-unused-vars */
import PropsValidator from "@utils/PropsValidator";
import { ExtractPropTypes } from "vue";

export const calendarDialogProps = definePropOptions({
  inline: {
    type: Boolean,
    default: false,
  },
  initialDates: {
    type: Array,
    validator: PropsValidator.isValidInitialDate,
    default() {
      return [];
    },
  },
  language: {
    type: String,
    default: "en",
  },
  disabledDates: {
    type: Object,
    validator: PropsValidator.isValidDateRestriction,
    default() {
      return {};
    },
  },
  availableDates: {
    type: Object,
    validator: PropsValidator.isValidDateRestriction,
    default() {
      return {};
    },
  },
  showHelperButtons: {
    type: Boolean,
    default: true,
  },
  helperButtons: {
    type: Array,
    validator: PropsValidator.isValidHelperButtons,
    default() {
      return [];
    },
  },
  timeInput: {
    type: Object,
    default() {
      return {
        inputClass: null,
        readonly: false,
        step: 60, // in minutes
      };
    },
  },
  dateInput: {
    type: Object,
    default() {
      return {
        labelStarts: "Starts",
        labelEnds: "Ends",
        inputClass: null,
        format: "DD/MM/YYYY",
        readonly: false,
      };
    },
  },
  switchButtonLabel: {
    type: String,
    default: "All Days",
  },
  switchButtonInitial: {
    type: Boolean,
    default: false,
  },
  applyButtonLabel: {
    type: String,
    default: "Apply",
  },
  resetButtonLabel: {
    type: String,
    default: "Reset",
  },
  isMondayFirst: {
    type: Boolean,
    default: false,
  },
});

export type CalendarDialogProps = ExtractPropTypes<typeof calendarDialogProps>;

export const calendarDialogEmits = defineEmitOptions({
  "on-apply": (_startDate: Date, _endDate: Date) => true,
  "on-reset": (_e: Event) => true,
  "select-date": (_startDate: Date, _endDate: Date) => true,
  "select-disabled-date": (_date: Date) => true,
  "on-prev-calendar": (_e: Event) => true,
  "on-next-calendar": (_e: Event) => true,
});

export type CalendarDialogEmits = typeof calendarDialogEmits
