/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExtractPropTypes, PropType } from "vue";
import { FromToRange } from "../commonTypes";
import { isValidDateAvailabilityConfig } from "@utils/propsValidator";

export type Day = {
  date: Date;
  timestamp: number;
  dateNumber: number;
  isBetween: boolean;
  isStartDate: boolean;
  isEndDate: boolean;
  isDisabled: boolean;
  isFaded: boolean;
};

export type DatesAvailabilityConfig = Partial<
  {
    dates: Array<Date>;
    ranges: Array<FromToRange<Date>>;
    custom: (date: Date) => boolean;
  } & FromToRange<Date>
>;

export const calendarProps = {
  selectedStartDate: Date as PropType<Date>,
  selectedEndDate: Date as PropType<Date>,
  language: {
    type: String as PropType<string>,
    default: "en",
  },
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
};

export type CalendarProps = ExtractPropTypes<typeof calendarProps>;

export const calendarEmits = defineEmitOptions({
  "select-disabled-date": (_d: Date) => true,
  "select-date": (_d: Date) => true,
  "on-prev-calendar": (_e: Event) => true,
  "on-next-calendar": (_e: Event) => true,
});
