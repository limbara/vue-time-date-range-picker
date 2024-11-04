import { FromToRange } from "@components/commonTypes";
import DateUtil from "@utils/DateUtil";
import { isEmptyObject } from "@utils/helpers";
import { computed, ref, ToRefs } from "vue";

export type Day = {
  date: Date;
  timestamp: number;
  dateNumber: number;
  isFaded: boolean;
};

export type DisableDateCheckFunction = (date: Date) => boolean;

export type DatesAvailabilityConfig = Partial<
  {
    dates: Array<Date>;
    ranges: Array<FromToRange<Date>>;
    custom: DisableDateCheckFunction;
  } & FromToRange<Date>
>;

type UseCalendarProps = ToRefs<{
  pageDate: Date;
  language: string;
  isMondayFirst: boolean;
  disabledDates?: DatesAvailabilityConfig;
  availableDates?: DatesAvailabilityConfig;
}>;

export const useCalendar = (props: UseCalendarProps) => {
  const dateUtil = computed(() => {
    return new DateUtil(props.language.value);
  });

  const pageDate = ref<Date>(props.pageDate?.value ?? dateUtil.value.now());

  const disableDateCheckFunction = computed(() => {
    if (
      !props?.disabledDates?.value ||
      isEmptyObject(props?.disabledDates?.value)
    )
      return null;

    return createDisableDateCheckFunction(
      props?.disabledDates?.value,
      dateUtil.value
    );
  });

  const enableDateCheckFunction = computed(() => {
    if (
      !props?.availableDates?.value ||
      isEmptyObject(props?.availableDates?.value)
    )
      return null;

    return createEnableDateCheckFunction(
      props?.availableDates?.value,
      dateUtil.value
    );
  });

  const isDisabledDate = computed(() => (date: Date) => {
    // Disable date takes precedence

    if (disableDateCheckFunction.value) {
      return disableDateCheckFunction.value(date);
    }

    if (enableDateCheckFunction.value) {
      return !enableDateCheckFunction.value(date);
    }

    return false;
  });

  const days = computed(() => {
    return createDays(
      pageDate.value,
      props.isMondayFirst.value,
      dateUtil.value
    );
  });

  const isNextPageDisabled = computed(() => {
    const disabledDatesConfig = props?.disabledDates?.value ?? {};
    const availableDatesConfig = props?.availableDates?.value ?? {};

    if (!isEmptyObject(disabledDatesConfig)) {
      const { from, to } = disabledDatesConfig;

      if (!from) {
        return false;
      }

      // next is always available if there's 'to' date intersecting 'from' date
      if (to && dateUtil.value.isAfter(to, from)) {
        return false;
      }

      return (
        (dateUtil.value.month(from) <= dateUtil.value.month(pageDate.value) &&
          dateUtil.value.year(from) <= dateUtil.value.year(pageDate.value)) ||
        dateUtil.value.year(from) < dateUtil.value.year(pageDate.value)
      );
    }
    // availableDates cannot interfere disabledDates
    if (
      isEmptyObject(disabledDatesConfig) &&
      !isEmptyObject(availableDatesConfig)
    ) {
      const { from, to } = availableDatesConfig;

      if (!to) {
        return false;
      }

      // next is always available if there's 'from' date intersecting 'to' date
      if (from && dateUtil.value.isAfter(from, to)) {
        return false;
      }

      return (
        (dateUtil.value.month(to) <= dateUtil.value.month(pageDate.value) &&
          dateUtil.value.year(to) <= dateUtil.value.year(pageDate.value)) ||
        dateUtil.value.year(to) < dateUtil.value.year(pageDate.value)
      );
    }

    return false;
  });

  const isPrevPageDisabled = computed(() => {
    const disabledDatesConfig = props?.disabledDates?.value ?? {};
    const availableDatesConfig = props?.availableDates?.value ?? {};

    if (!isEmptyObject(disabledDatesConfig)) {
      const { from, to } = disabledDatesConfig;

      if (!to) {
        return false;
      }

      // prev is always available if there's 'from' date intersecting 'to' date
      if (from && dateUtil.value.isBefore(from, to)) {
        return false;
      }

      return (
        (dateUtil.value.month(to) >= dateUtil.value.month(pageDate.value) &&
          dateUtil.value.year(to) >= dateUtil.value.year(pageDate.value)) ||
        dateUtil.value.year(to) > dateUtil.value.year(pageDate.value)
      );
    }
    // availableDates cannot interfere disabledDates
    if (
      isEmptyObject(disabledDatesConfig) &&
      !isEmptyObject(availableDatesConfig)
    ) {
      const { from, to } = availableDatesConfig;

      if (!from) {
        return false;
      }

      // prev is always available if there's 'to' date intersecting 'from' date
      if (to && dateUtil.value.isBefore(to, from)) {
        return false;
      }

      return (
        (dateUtil.value.month(from) >= dateUtil.value.month(pageDate.value) &&
          dateUtil.value.year(from) >= dateUtil.value.year(pageDate.value)) ||
        dateUtil.value.year(from) > dateUtil.value.year(pageDate.value)
      );
    }
    return false;
  });

  const dayNames = computed(() => {
    const dayNames = dateUtil.value.getAbbrDayNames();

    if (props.isMondayFirst.value) {
      const [sunday, ...restOfDays] = dayNames;

      return [...restOfDays, sunday];
    }

    return dayNames;
  });

  const prevPage = (): boolean => {
    if (isPrevPageDisabled.value) return false;

    pageDate.value = dateUtil.value.subtract(pageDate.value, 1, "month");

    return true;
  };

  const nextPage = (): boolean => {
    if (isNextPageDisabled.value) return false;

    pageDate.value = dateUtil.value.add(pageDate.value, 1, "month");

    return true;
  };

  return {
    pageDate,
    dayNames,
    days,
    isNextPageDisabled,
    isPrevPageDisabled,
    nextPage,
    prevPage,
    isDisabledDate,
  };
};

export const createDay = (date: Date, isFaded: boolean): Day => {
  return {
    date,
    timestamp: date.getTime(),
    dateNumber: date.getDate(),
    isFaded,
  };
};

/**
 * returns full 42 days (1 row = 7 days) in specified pageDate's month, followed by the pre-days and post-days of the month
 * @param pageDate
 * @param isMondayFirst
 * @param dateUtil
 * @returns
 */
export const createDays = (
  pageDate: Date,
  isMondayFirst: boolean,
  dateUtil: DateUtil
) => {
  let pointer = dateUtil.startOf(pageDate, "month");
  const daysInMonth = dateUtil.daysInMonth(pageDate);

  const days: Array<Day> = [];
  const preDays: Array<Day> = [];
  const postDays: Array<Day> = [];

  for (let i = 0; i < daysInMonth; i += 1) {
    days.push(createDay(pointer, false));
    pointer = dateUtil.add(pointer, 1, "day");
  }

  let firstDay = days[0].date;
  const SUNDAY = 0;
  const MONDAY = 1;
  const threshold = isMondayFirst ? MONDAY : SUNDAY;

  while (firstDay.getDay() !== threshold) {
    firstDay = dateUtil.subtract(firstDay, 1, "day");
    preDays.unshift(createDay(firstDay, true));
  }

  let lastDay = days[days.length - 1].date;

  for (let k = preDays.length + days.length; k < 42; k += 1) {
    lastDay = dateUtil.add(lastDay, 1, "day");
    postDays.push(createDay(lastDay, true));
  }

  return [...preDays, ...days, ...postDays];
};

export const createDisableDateCheckFunction = (
  datesAvailabilityConfig: DatesAvailabilityConfig,
  dateUtil: DateUtil
): DisableDateCheckFunction => {
  const functions = createDisableDateCheckFuctions(
    datesAvailabilityConfig,
    dateUtil
  );

  return (date) =>
    functions.length === 0 ? false : functions.some((f) => f(date));
};

export const createEnableDateCheckFunction = (
  datesAvailabilityConfig: DatesAvailabilityConfig,
  dateUtil: DateUtil
): DisableDateCheckFunction => {
  return (date) =>
    !createDisableDateCheckFunction(datesAvailabilityConfig, dateUtil)(date);
};

const createDisableDateCheckFuctions = (
  datesAvailabilityConfig: DatesAvailabilityConfig,
  dateUtil: DateUtil
): DisableDateCheckFunction[] => {
  const result: DisableDateCheckFunction[] = [];
  const { dates, from, to, ranges, custom } = datesAvailabilityConfig;

  if (Array.isArray(dates)) {
    dates.forEach((d) => {
      result.push((date) => dateUtil.isSameDate(date, d));
    });
  }

  if (Array.isArray(ranges)) {
    ranges.forEach((r) => {
      result.push((date) => dateUtil.isSameOrBetween(date, r.from, r.to));
    });
  }

  // 'from' date smaller than 'to' date,
  // disabling dates only happens between 'from' & 'to'
  if (from && to && dateUtil.isBefore(from, to)) {
    result.push((date) => dateUtil.isSameOrBetween(date, from, to));
  } else {
    if (from) {
      result.push((date) => dateUtil.isSameOrAfter(date, from));
    }
    if (to) {
      result.push((date) => dateUtil.isSameOrBefore(date, to));
    }
  }

  if (custom && typeof custom === "function") {
    result.push((date) => Boolean(custom(date)));
  }

  return result;
};
