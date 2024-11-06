/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExtractPropTypes, PropType } from "vue";

export type ComputedDay = {
  date: Date;
  timestamp: number;
  dateNumber: number;
  isHighlighted: boolean;
  isDisabled: boolean;
  isFaded: boolean;
};

export const calendarProps = {
  pageDate: {
    type: Date as PropType<Date>,
    required: true,
  },
  days: {
    type: Array as PropType<Array<ComputedDay>>,
    default: () => [] as Array<ComputedDay>,
  },
  dayNames: {
    type: Array as PropType<Array<string>>,
    default: () => [] as Array<string>,
  },
  isPrevPageDisabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  isNextPageDisabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  language: {
    type: String as PropType<string>,
    default: "en",
  },
};

export type CalendarProps = ExtractPropTypes<typeof calendarProps>;

export const calendarEmits = defineEmitOptions({
  "select-disabled-date": (_d: Date) => true,
  "select-date": (_d: Date) => true,
  "on-prev-calendar": (_e: Event) => true,
  "on-next-calendar": (_e: Event) => true,
});
