<template>
  <div class="vdpr-datepicker__calendar">
    <div class="vdpr-datepicker__calendar-control">
      <span class="vdpr-datepicker__calendar-control-prev" :class="{
        'vdpr-datepicker__calendar-control-disabled': isPrevDisabled,
      }" @click="onPrevClick"></span>
      <span class="vdpr-datepicker__calendar-month-year">{{ monthYear }}</span>
      <span class="vdpr-datepicker__calendar-control-next" :class="{
        'vdpr-datepicker__calendar-control-disabled': isNextDisabled,
      }" @click="onNextClick"></span>
    </div>
    <table class="vdpr-datepicker__calendar-table">
      <thead>
        <tr>
          <th v-for="dayName in dayNames" :key="dayName">{{ dayName }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in 6" :key="row">
          <td v-for="day in getRowDays(row)" :key="day.timestamp" :class="{
            highlighted: day.isBetween || day.isStartDate || day.isEndDate,
            faded: day.isFaded,
            disabled: day.isDisabled,
          }" @click="selectDate(day)">
            {{ day.dateNumber }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script lang="ts" setup>
import DateUtil from '@utils/DateUtil';
import Util from '@utils/Util';
import { calendarEmits, calendarProps, Day } from './types';
import { computed, ref } from 'vue';

const props = defineProps(calendarProps)
const emit = defineEmits(calendarEmits)

const dateUtil = computed(() => new DateUtil(props.language))
const pageTimestamp = ref(dateUtil.value.toUnix(dateUtil.value.startOf(props.selectedStartDate ?? props.selectedEndDate ?? new Date(), 'month')))

const dayNames = computed(() => {
  const dayNames = dateUtil.value.getAbbrDayNames();

  if (props.isMondayFirst) {
    const [sunday, ...restOfDays] = dayNames;

    return [...restOfDays, sunday];
  }

  return dayNames;
})

const monthYear = computed(() => {
  const pageDate = dateUtil.value.fromUnix(pageTimestamp.value);

  return dateUtil.value.formatDate(pageDate, 'MMM YYYY');
})

const isDisabledDate = computed(() => (date: Date) => {
  if (
    Util.isEmptyObject(props.disabledDates)
    && Util.isEmptyObject(props.availableDates)
  ) {
    return false;
  }
  let disabled = false;
  if (!Util.isEmptyObject(props.disabledDates)) {
    const {
      dates, from, to, ranges, custom,
    } = props.disabledDates;

    if (Array.isArray(dates)) {
      dates.forEach((d) => {
        if (dateUtil.value.isSameDate(d, date)) {
          disabled = true;
        }
      });
      if (disabled) return true;
    }

    if (Array.isArray(ranges)) {
      ranges.forEach((range) => {
        if (
          dateUtil.value.isValidDate(range.from)
          && dateUtil.value.isValidDate(range.to)
        ) {
          if (dateUtil.value.isSameOrBetween(date, range.from, range.to)) {
            disabled = true;
          }
        }
      });
      if (disabled) return true;
    }

    if (
      dateUtil.value.isValidDate(from)
      && dateUtil.value.isValidDate(to)
      && dateUtil.value.isBefore(from, to)
    ) {
      // 'from' date smaller than 'to' date,
      // disabling dates only happens between 'from' & 'to'
      if (dateUtil.value.isSameOrBetween(date, from, to)) {
        disabled = true;
      }
    } else {
      if (
        dateUtil.value.isValidDate(from)
        && dateUtil.value.isSameOrAfter(date, from)
      ) {
        disabled = true;
      }

      if (
        dateUtil.value.isValidDate(to)
        && dateUtil.value.isSameOrBefore(date, to)
      ) {
        disabled = true;
      }
    }

    if (typeof custom === 'function' && custom(date)) {
      disabled = true;
    }
  } else if (!Util.isEmptyObject(props.availableDates)) {
    disabled = true;
    const {
      dates, from, to, ranges, custom,
    } = props.availableDates;

    if (Array.isArray(dates)) {
      dates.forEach((d) => {
        if (dateUtil.value.isSameDate(d, date)) {
          disabled = false;
        }
      });
      if (disabled) return true;
    }

    if (Array.isArray(ranges)) {
      ranges.forEach((range) => {
        if (
          dateUtil.value.isValidDate(range.from)
          && dateUtil.value.isValidDate(range.to)
        ) {
          if (dateUtil.value.isSameOrBetween(date, range.from, range.to)) {
            disabled = false;
          }
        }
      });
      if (disabled) return true;
    }

    if (
      dateUtil.value.isValidDate(from)
      && dateUtil.value.isValidDate(to)
      && dateUtil.value.isBefore(from, to)
    ) {
      // 'from' date is smaller than 'to' date,
      // enabling dates only happens between 'from' & 'to'
      if (dateUtil.value.isSameOrBetween(date, from, to)) {
        disabled = false;
      }
    } else {
      if (
        dateUtil.value.isValidDate(to)
        && dateUtil.value.isSameOrBefore(date, to)
      ) {
        disabled = false;
      }

      if (
        dateUtil.value.isValidDate(from)
        && dateUtil.value.isSameOrAfter(date, from)
      ) {
        disabled = false;
      }
    }

    if (typeof custom === 'function' && custom(date)) {
      disabled = false;
    }
  }
  return disabled;
})

const constructDay = computed(() => (date: Date, isFaded: boolean): Day => {
  return {
    date,
    timestamp: date.getTime(),
    dateNumber: date.getDate(),
    isBetween: dateUtil.value.isBetween(date, props.selectedStartDate, props.selectedEndDate),
    isStartDate: dateUtil.value.isSameDate(date, props.selectedStartDate),
    isEndDate: dateUtil.value.isSameDate(date, props.selectedEndDate),
    isDisabled: isDisabledDate.value(date),
    isFaded
  }
})

const days = computed(() => {
  let pageDate = dateUtil.value.fromUnix(pageTimestamp.value);
  const daysInMonth = dateUtil.value.daysInMonth(pageDate);
  const days: Array<Day> = [];
  const preDays: Array<Day> = [];
  const postDays: Array<Day> = [];

  for (let i = 0; i < daysInMonth; i += 1) {
    days.push(constructDay.value(pageDate, false));
    pageDate = dateUtil.value.add(pageDate, 1, 'd');
  }

  let firstDay = days[0].date;
  const SUNDAY = 0;
  const MONDAY = 1;
  const threshold = props.isMondayFirst ? MONDAY : SUNDAY;

  while (firstDay.getDay() !== threshold) {
    firstDay = dateUtil.value.subtract(firstDay, 1, 'd');
    preDays.unshift(constructDay.value(firstDay, true));
  }

  let lastDay = days[days.length - 1].date;

  for (let k = preDays.length + days.length; k < 42; k += 1) {
    lastDay = dateUtil.value.add(lastDay, 1, 'd');
    postDays.push(constructDay.value(lastDay, true));
  }

  return [...preDays, ...days, ...postDays];
})

const isNextDisabled = computed(() => {
  if (props.disabledDates && props.disabledDates.from) {
    const { from, to } = props.disabledDates;

    // next is always available if there's 'to' date intersecting 'from' date
    if (to && dateUtil.value.isAfter(to, from)) {
      return false;
    }

    const pageDate = dateUtil.value.fromUnix(pageTimestamp.value);
    return (
      (dateUtil.value.month(from) <= dateUtil.value.month(pageDate)
        && dateUtil.value.year(from) <= dateUtil.value.year(pageDate))
      || dateUtil.value.year(from) < dateUtil.value.year(pageDate)
    );
  }
  // availableDates cannot interfere disabledDates
  if (
    Util.isEmptyObject(props.disabledDates)
    && props.availableDates
    && props.availableDates.to
  ) {
    const { from, to } = props.availableDates;

    // next is always available if there's 'from' date intersecting 'to' date
    if (from && dateUtil.value.isAfter(from, to)) {
      return false;
    }

    const pageDate = dateUtil.value.fromUnix(pageTimestamp.value);
    return (
      (dateUtil.value.month(to) <= dateUtil.value.month(pageDate)
        && dateUtil.value.year(to) <= dateUtil.value.year(pageDate))
      || dateUtil.value.year(to) < dateUtil.value.year(pageDate)
    );
  }
  return false;
})
const isPrevDisabled = computed(() => {
  if (props.disabledDates && props.disabledDates.to) {
    const { from, to } = props.disabledDates;

    // prev is always available if there's 'from' date intersecting 'to' date
    if (from && dateUtil.value.isBefore(from, to)) {
      return false;
    }

    const pageDate = dateUtil.value.fromUnix(pageTimestamp.value);
    return (
      (dateUtil.value.month(to) >= dateUtil.value.month(pageDate)
        && dateUtil.value.year(to) >= dateUtil.value.year(pageDate))
      || dateUtil.value.year(to) > dateUtil.value.year(pageDate)
    );
  }
  // availableDates cannot interfere disabledDates
  if (
    Util.isEmptyObject(props.disabledDates)
    && props.availableDates
    && props.availableDates.from
  ) {
    const { from, to } = props.availableDates;

    // prev is always available if there's 'to' date intersecting 'from' date
    if (to && dateUtil.value.isBefore(to, from)) {
      return false;
    }

    const pageDate = dateUtil.value.fromUnix(pageTimestamp.value);
    return (
      (dateUtil.value.month(from) >= dateUtil.value.month(pageDate)
        && dateUtil.value.year(from) >= dateUtil.value.year(pageDate))
      || dateUtil.value.year(from) > dateUtil.value.year(pageDate)
    );
  }
  return false;
})

const getRowDays = (row: number) => {
  const endIndex = row * 7;
  const startIndex = endIndex - 7;

  return days.value.slice(startIndex, endIndex);
}

const selectDate = (day: Day) => {
  if (day.isDisabled) {
    return emit('select-disabled-date', day.date);
  }

  return emit('select-date', day.date);
}

const onPrevClick = (e: Event) => {
  if (isPrevDisabled.value) return;

  const pageDate = dateUtil.value.subtract(
    dateUtil.value.fromUnix(pageTimestamp.value),
    1,
    'month',
  );

  pageTimestamp.value = dateUtil.value.toUnix(pageDate);

  emit('on-prev-calendar', e);
}

const onNextClick = (e: Event) => {
  if (isNextDisabled.value) return;

  const pageDate = dateUtil.value.add(
    dateUtil.value.fromUnix(pageTimestamp.value),
    1,
    'month',
  );

  pageTimestamp.value = dateUtil.value.toUnix(pageDate);

  emit('on-next-calendar', e);
}
</script>
