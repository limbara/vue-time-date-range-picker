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

<script>
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

export default {
  props: {
    selectedStartDate: Date,
    selectedEndDate: Date,
    language: String,
    disabledDates: Object,
    isMondayFirst: Boolean,
  },
  data() {
    const dateUtil = new DateUtil(this.language);
    const startDate = this.selectedStartDate ?? this.selectedEndDate ?? new Date();
    const pageTimestamp = dateUtil.toUnix(dateUtil.startOf(startDate, 'month'));

    return {
      // stored page time stamp start of a month
      pageTimestamp,
    };
  },
  computed: {
    dateUtil() {
      return new DateUtil(this.language);
    },
    dayNames() {
      const dayNames = this.dateUtil.getAbbrDayNames();

      if (this.isMondayFirst) {
        const [sunday, ...restOfDays] = dayNames;

        return [...restOfDays, sunday];
      }

      return dayNames;
    },
    monthYear() {
      const pageDate = this.dateUtil.fromUnix(this.pageTimestamp);

      return this.dateUtil.formatDate(pageDate, 'MMM YYYY');
    },
    days() {
      let pageDate = this.dateUtil.fromUnix(this.pageTimestamp);
      const daysInMonth = this.dateUtil.daysInMonth(pageDate);
      const days = [];
      const preDays = [];
      const postDays = [];

      for (let i = 0; i < daysInMonth; i += 1) {
        days.push(this.constructDay(pageDate, false));
        pageDate = this.dateUtil.add(pageDate, 1, 'd');
      }

      let firstDay = days[0].date;
      const SUNDAY = 0;
      const MONDAY = 1;
      for (
        let j = (this.isMondayFirst && firstDay.getDay() == SUNDAY) ? 7 : firstDay.getDay();
        j > this.isMondayFirst ? MONDAY : SUNDAY;
        j -= 1
      ) {
        firstDay = this.dateUtil.subtract(firstDay, 1, 'd');
        preDays.unshift(this.constructDay(firstDay, true));
      }

      let lastDay = days[days.length - 1].date;

      for (let k = preDays.length + days.length; k < 42; k += 1) {
        lastDay = this.dateUtil.add(lastDay, 1, 'd');
        postDays.push(this.constructDay(lastDay, true));
      }

      return [...preDays, ...days, ...postDays];
    },
    isNextDisabled() {
      if (!this.disabledDates || !this.disabledDates.from) return false;

      const pageDate = this.dateUtil.fromUnix(this.pageTimestamp);

      return (
        this.dateUtil.month(this.disabledDates.from)
          <= this.dateUtil.month(pageDate)
        && this.dateUtil.year(this.disabledDates.from)
          <= this.dateUtil.year(pageDate)
      );
    },
    isPrevDisabled() {
      if (!this.disabledDates || !this.disabledDates.to) return false;

      const pageDate = this.dateUtil.fromUnix(this.pageTimestamp);
      return (
        this.dateUtil.month(this.disabledDates.to)
          >= this.dateUtil.month(pageDate)
        && this.dateUtil.year(this.disabledDates.to)
          >= this.dateUtil.year(pageDate)
      );
    },
  },
  methods: {
    getRowDays(row) {
      const endIndex = row * 7;
      const startIndex = endIndex - 7;

      return this.days.slice(startIndex, endIndex);
    },
    constructDay(date, isFaded) {
      return new Day(
        date,
        this.dateUtil.isBetween(
          date,
          this.selectedStartDate,
          this.selectedEndDate,
        ),
        this.dateUtil.isSameDate(date, this.selectedStartDate),
        this.dateUtil.isSameDate(date, this.selectedEndDate),
        this.isDisabledDate(date),
        isFaded,
      );
    },
    isDisabledDate(date) {
      if (!this.disabledDates) {
        return false;
      }
      let disabled = false;
      const {
        dates, from, to, ranges, custom,
      } = this.disabledDates;

      if (typeof dates !== 'undefined' && Array.isArray(dates)) {
        dates.forEach((d) => {
          if (this.dateUtil.isSameDate(d, date)) {
            disabled = true;
          }
        });
        if (disabled) return true;
      }

      if (ranges !== 'undefined' && Array.isArray(ranges)) {
        ranges.forEach((range) => {
          if (
            this.dateUtil.isValidDate(range.from)
            && this.dateUtil.isValidDate(range.to)
          ) {
            if (this.dateUtil.isSameOrBetween(date, range.from, range.to)) {
              disabled = true;
            }
          }
        });
        if (disabled) return true;
      }

      if (
        this.dateUtil.isValidDate(to)
        && this.dateUtil.isSameOrBefore(date, to)
      ) {
        disabled = true;
      }

      if (
        this.dateUtil.isValidDate(from)
        && this.dateUtil.isSameOrAfter(date, from)
      ) {
        disabled = true;
      }

      if (typeof custom === 'function' && custom(date)) {
        disabled = true;
      }

      return disabled;
    },
    selectDate(day) {
      if (day.isDisabled) {
        return this.$emit('select-disabled-date', day.date);
      }

      return this.$emit('select-date', day.date);
    },
    onPrevClick() {
      if (this.isPrevDisabled) return;

      const pageDate = this.dateUtil.subtract(
        this.dateUtil.fromUnix(this.pageTimestamp),
        1,
        'month',
      );

      this.pageTimestamp = this.dateUtil.toUnix(pageDate);

      this.$emit('on-prev-calendar');
    },
    onNextClick() {
      if (this.isNextDisabled) return;

      const pageDate = this.dateUtil.add(
        this.dateUtil.fromUnix(this.pageTimestamp),
        1,
        'month',
      );

      this.pageTimestamp = this.dateUtil.toUnix(pageDate);

      this.$emit('on-next-calendar');
    },
  },
};
</script>
