/* eslint-disable @typescript-eslint/no-unused-vars */
import { CalendarInputDateProps } from "@components/CalendarInputDate/types";
import { CalendarInputTimeProps } from "@components/CalendarInputTime/types";
import { FromToRange } from "@components/commonTypes";
import { calendarProps } from "@components/Calendar/types";
import { ExtractPropTypes, PropType } from "vue";
import {
  isValidDateAvailabilityConfig,
  isValidHelperButtons,
  isValidInitialDate,
} from "@utils/propsValidator";
import { InitialDate } from "@composables/useSelectedDates";
import { Nullable } from "@utils/helpers";
import { DatesAvailabilityConfig } from "@composables/useCalendarDateUtil";

export type HelperButtonShape = Readonly<
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
  disabledDates: {
    type: Object as PropType<DatesAvailabilityConfig>,
    validator: isValidDateAvailabilityConfig,
    default: () => ({} as DatesAvailabilityConfig),
  },
  availableDates: {
    type: Object as PropType<DatesAvailabilityConfig>,
    validator: isValidDateAvailabilityConfig,
    default: () => ({} as DatesAvailabilityConfig),
  },
  isMondayFirst: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  initialDates: {
    type: Array as unknown as PropType<InitialDate>,
    validator: isValidInitialDate,
    default: () => [] as unknown as InitialDate,
  },
  inline: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  showHelperButtons: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  helperButtons: {
    type: Array as unknown as PropType<Array<HelperButtonShape>>,
    validator: isValidHelperButtons,
    default: () => [] as unknown as Array<HelperButtonShape>,
  },
  timeInput: {
    type: Object as PropType<TimeInputProps>,
    default: () =>
      ({
        inputClass: null,
        readonly: false,
        step: 60,
      } as unknown as TimeInputProps),
  },
  dateInput: {
    type: Object as PropType<DateInputProps>,
    default: () =>
      ({
        inputClass: null,
        labelStarts: "Starts",
        labelEnds: "Ends",
        format: "DD/MM/YYYY",
      } as unknown as DateInputProps),
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
  "select-date": (_startDate: Nullable<Date>, _endDate: Nullable<Date>) => true,
  "select-disabled-date": (_date: Date) => true,
  "on-prev-calendar": (_e: Event) => true,
  "on-next-calendar": (_e: Event) => true,
});

export type CalendarDialogEmits = typeof calendarDialogEmits;
