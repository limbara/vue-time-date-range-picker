/* eslint-disable @typescript-eslint/no-unused-vars */
import { calendarProps } from "@/Calendar/types";
import { CalendarInputDateProps } from "@/CalendarInputDate/types";
import { CalendarInputTimeProps } from "@/CalendarInputTime/types";
import { FromToRange } from "@/commonTypes";
import PropsValidator from "@utils/PropsValidator";
import { ExtractPropTypes, PropType } from "vue";

type HelperButtonShape = Readonly<
  {
    name: string;
  } & FromToRange<Date>
>;

type TimeInputProps = Partial<
  Pick<CalendarInputTimeProps, "inputClass" | "readonly" | "step">
>;

type DateInputProps = Partial<
  Pick<CalendarInputDateProps, "format" | "inputClass"> & {
    labelStarts: string;
    labelEnds: string;
  }
>;

export const calendarDialogProps = {
  language: calendarProps.language,
  disabledDates: calendarProps.disabledDates,
  availableDates: calendarProps.availableDates,
  isMondayFirst: calendarProps.isMondayFirst,
  inline: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  initialDates: {
    type: Array as unknown as PropType<[Date, Date]>,
    validator: PropsValidator.isValidInitialDate,
    default: () => [] as unknown as [Date, Date],
  },
  showHelperButtons: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  helperButtons: {
    type: Array as unknown as PropType<Array<HelperButtonShape>>,
    validator: PropsValidator.isValidHelperButtons,
    default: () => [] as unknown as Array<HelperButtonShape>,
  },
  timeInput: {
    type: Object as PropType<TimeInputProps>,
    default: () =>
      ({
        inputClass: null,
        readonly: false,
        step: 60,
      } as TimeInputProps),
  },
  dateInput: {
    type: Object as PropType<DateInputProps>,
    default: () =>
      ({
        inputClass: null,
        labelStarts: "Starts",
        labelEnds: "Ends",
        format: "DD/MM/YYYY",
      } as DateInputProps),
  },
  switchButtonLabel: {
    type: String as PropType<string>,
    default: "All Days",
  },
  switchButtonInitial: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  applyButtonLabel: {
    type: String as PropType<string>,
    default: "Apply",
  },
  resetButtonLabel: {
    type: String as PropType<string>,
    default: "Reset",
  },
};

export type CalendarDialogProps = ExtractPropTypes<typeof calendarDialogProps>;

export const calendarDialogEmits = defineEmitOptions({
  "on-apply": (_startDate: Date, _endDate: Date) => true,
  "on-reset": (_e: Event) => true,
  "select-date": (_startDate: Date, _endDate: Date) => true,
  "select-disabled-date": (_date: Date) => true,
  "on-prev-calendar": (_e: Event) => true,
  "on-next-calendar": (_e: Event) => true,
});

export type CalendarDialogEmits = typeof calendarDialogEmits;