/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExtractPropTypes } from "vue";

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

export const calendarProps = definePropOptions({
  selectedStartDate: Date,
  selectedEndDate: Date,
  language: String,
  disabledDates: Object,
  availableDates: Object,
  isMondayFirst: {
    type: Boolean,
    default: false,
  },
});

export type CalendarProps = ExtractPropTypes<typeof calendarProps>;

export const calendarEmits = defineEmitOptions({
  "select-disabled-date": (_d: Date) => true,
  "select-date": (_d: Date) => true,
  "on-prev-calendar": (_e: Event) => true,
  "on-next-calendar": (_e: Event) => true,
});
