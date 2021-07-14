<template>
  <div class="vdpr-datepicker__calendar">
    <div class="vdpr-datepicker__calendar-control">
      <span
        class="vdpr-datepicker__calendar-control-prev"
        :class="{
          'vdpr-datepicker__calendar-control-disabled': isPrevDisabled,
        }"
        @click="onPrevClick"
      ></span>
      <span class="vdpr-datepicker__calendar-month-year">{{ monthYear }}</span>
      <span
        class="vdpr-datepicker__calendar-control-next"
        :class="{
          'vdpr-datepicker__calendar-control-disabled': isNextDisabled,
        }"
        @click="onNextClick"
      ></span>
    </div>
    <table class="vdpr-datepicker__calendar-table">
      <thead>
        <tr>
          <th v-for="dayName in dayNames" :key="dayName">{{ dayName }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in 6" :key="row">
          <td
            v-for="day in getRowDays(row)"
            :key="day.timestamp"
            :class="{
              highlighted: day.isBetween || day.isStartDate || day.isEndDate,
              faded: day.isFaded,
              disabled: day.isDisabled,
            }"
            @click="selectDate(day)"
          >
            {{ day.dateNumber }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import DateUtil from '../Utils/DateUtil';

  class Day {
    constructor(date, isBetween, isStartDate, isEndDate, isDisabled, isFaded) {
      this.date = date;
      this.timestamp = date.getTime();
      this.dateNumber = date.getDate();
      this.isBetween = isBetween;
      this.isStartDate = isStartDate;
      this.isEndDate = isEndDate;
      this.isDisabled = isDisabled;
      this.isFaded = isFaded;
    }
  }

  const props = defineProps({
    selectedStartDate: Date,
    selectedEndDate: Date,
    language: String,
    disabledDates: Object,
    isMondayFirst: Boolean,
  });

  const emit = defineEmit(['select-disabled-date', 'select-date', 'on-prev-calendar', 'on-next-calendar']);

  const dateUtil = computed(() => new DateUtil(props.language));

  const startDate = props.selectedStartDate ?? props.selectedEndDate ?? new Date();
  const pageTimestamp = ref(dateUtil.value.toUnix(dateUtil.value.startOf(startDate, 'month')));

  const dayNames = computed(() => {
    const dayNames = dateUtil.value.getAbbrDayNames();

    if (props.isMondayFirst) {
      const [sunday, ...restOfDays] = dayNames;

      return [...restOfDays, sunday];
    }

    return dayNames;
  });

  const monthYear = computed(() => {
    const pageDate = dateUtil.value.fromUnix(pageTimestamp.value);

    return dateUtil.value.formatDate(pageDate, 'MMM YYYY');
  });

  const days = computed(() => {
    let pageDate = dateUtil.value.fromUnix(pageTimestamp.value);
    const daysInMonth = dateUtil.value.daysInMonth(pageDate);
    const days = [];
    const preDays = [];
    const postDays = [];

    for (let i = 0; i < daysInMonth; i += 1) {
      days.push(constructDay(pageDate, false));
      pageDate = dateUtil.value.add(pageDate, 1, 'd');
    }

    let firstDay = days[0].date;
    const SUNDAY = 0;
    const MONDAY = 1;
    const threshold = props.isMondayFirst ? MONDAY : SUNDAY;

    while (firstDay.getDay() !== threshold) {
      firstDay = dateUtil.value.subtract(firstDay, 1, 'd');
      preDays.unshift(constructDay(firstDay, true));
    }

    let lastDay = days[days.length - 1].date;

    for (let k = preDays.length + days.length; k < 42; k += 1) {
      lastDay = dateUtil.value.add(lastDay, 1, 'd');
      postDays.push(constructDay(lastDay, true));
    }

    return [...preDays, ...days, ...postDays];
  });

  const isNextDisabled = computed(() => {
    if (!props.disabledDates || !props.disabledDates.from) return false;

    const pageDate = dateUtil.value.fromUnix(pageTimestamp.value);

    return (
      dateUtil.value.month(props.disabledDates.from)
        <= dateUtil.value.month(pageDate)
      && dateUtil.value.year(props.disabledDates.from)
        <= dateUtil.value.year(pageDate)
    );
  });

  const isPrevDisabled = computed(() => {
    if (!props.disabledDates || !props.disabledDates.to) return false;

    const pageDate = dateUtil.value.fromUnix(pageTimestamp.value);
    return (
      dateUtil.value.month(props.disabledDates.to)
        >= dateUtil.value.month(pageDate)
      && dateUtil.value.year(props.disabledDates.to)
        >= dateUtil.value.year(pageDate)
    );
  });

  const getRowDays = (row) => {
    const endIndex = row * 7;
    const startIndex = endIndex - 7;

    return days.value.slice(startIndex, endIndex);
  };

  const constructDay = (date, isFaded) => {
    return new Day(
      date,
      dateUtil.value.isBetween(
        date,
        props.selectedStartDate,
        props.selectedEndDate,
      ),
      dateUtil.value.isSameDate(date, props.selectedStartDate),
      dateUtil.value.isSameDate(date, props.selectedEndDate),
      isDisabledDate(date),
      isFaded,
    );
  };

  const isDisabledDate = (date) => {
    if (!props.disabledDates) {
      return false;
    }
    let disabled = false;
    const {
      dates, from, to, ranges, custom,
    } = props.disabledDates;

    if (typeof dates !== 'undefined' && Array.isArray(dates)) {
      dates.forEach((d) => {
        if (dateUtil.value.isSameDate(d, date)) {
          disabled = true;
        }
      });
      if (disabled) return true;
    }

    if (ranges !== 'undefined' && Array.isArray(ranges)) {
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
      dateUtil.value.isValidDate(to)
      && dateUtil.value.isSameOrBefore(date, to)
    ) {
      disabled = true;
    }

    if (
      dateUtil.value.isValidDate(from)
      && dateUtil.value.isSameOrAfter(date, from)
    ) {
      disabled = true;
    }

    if (typeof custom === 'function' && custom(date)) {
      disabled = true;
    }

    return disabled;
  };

  const selectDate = (day) => {
    if (day.isDisabled) {
      emit('select-disabled-date', day.date);
    }

    return emit('select-date', day.date);
  };

  const onPrevClick = () => {
    if (isPrevDisabled.value) return;

    const pageDate = dateUtil.value.subtract(
      dateUtil.value.fromUnix(pageTimestamp.value),
      1,
      'month',
    );

    pageTimestamp.value = dateUtil.value.toUnix(pageDate);

    emit('on-prev-calendar');
  };

  const onNextClick = () => {
    if (isNextDisabled.value) return;

    const pageDate = dateUtil.value.add(
      dateUtil.value.fromUnix(pageTimestamp.value),
      1,
      'month',
    );

    pageTimestamp.value = dateUtil.value.toUnix(pageDate);

    emit('on-next-calendar');
  };
</script>
