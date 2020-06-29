<template>
  <div class="vdpr-datepicker__calendar">
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
              highlighted: day.isInRange || day.isStartDate || day.isEndDate,
            }"
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
  constructor(date, isInRange, isStartDate, isEndDate, isDisabled) {
    this.date = date;
    this.timestamp = date.getTime();
    this.dateNumber = date.getDate();
    this.isInRange = isInRange;
    this.isStartDate = isStartDate;
    this.isEndDate = isEndDate;
    this.isDisabled = isDisabled;
  }
}

export default {
  props: {
    selectedStartDate: Date,
    selectedEndDate: Date,
    language: String,
    disabledDates: Object,
  },
  data() {
    const dateUtil = new DateUtil(this.language);
    const startDate = this.selectedStartDate ?? this.selectedEndDate ?? new Date();
    const pageTimestamp = dateUtil.toUnix(dateUtil.startOf(startDate, 'month'));

    return {
      // stored page time stamp start of a month
      pageTimestamp,
      dateUtil,
    };
  },
  computed: {
    dayNames() {
      return this.dateUtil.getAbbrDayNames();
    },
    days() {
      let pageDate = this.dateUtil.fromUnix(this.pageTimestamp);
      const daysInMonth = this.dateUtil.daysInMonth(pageDate);
      const days = [];
      const preDays = [];
      const postDays = [];

      for (let i = 0; i < daysInMonth; i += 1) {
        days.push(this.constructDay(pageDate));
        pageDate = this.dateUtil.add(pageDate, 1, 'd');
      }

      let firstDay = days[0].date;

      for (let j = this.dateUtil.weekday(firstDay); j > 0; j -= 1) {
        firstDay = this.dateUtil.subtract(firstDay, 1, 'd');
        preDays.push(this.constructDay(firstDay));
      }

      let lastDay = days[days.length - 1].date;

      for (let k = preDays.length + days.length; k < 42; k += 1) {
        lastDay = this.dateUtil.add(lastDay, 1, 'd');
        postDays.push(this.constructDay(lastDay));
      }

      return [...preDays, ...days, ...postDays];
    },
  },
  methods: {
    getRowDays(row) {
      const endIndex = row * 7;
      const startIndex = endIndex - 7;

      return this.days.slice(startIndex, endIndex);
    },
    constructDay(date) {
      return new Day(
        date,
        this.dateUtil.isInRange(
          date,
          this.selectedStartDate,
          this.selectedEndDate,
        ),
        this.dateUtil.isSameDate(date, this.selectedStartDate),
        this.dateUtil.isSameDate(date, this.selectedEndDate),
        this.isDisabledDate(date),
      );
    },
    isDisabledDate(date) {
      if (typeof this.disabledDates === 'undefined') {
        return false;
      }
      let disabled = false;
      const {
        dates, from, to, ranges, custom,
      } = this.disabledDates;

      if (typeof dates !== 'undefined' && Array.isArray(dates)) {
        dates.forEach((d) => {
          if (this.DateUtil.isSameDate(d, date)) {
            disabled = true;
          }
        });
        if (disabled) return true;
      }

      if (ranges !== 'undefined') {
        ranges.forEach((range) => {
          if (
            this.dateUtil.isValidDate(range.from)
            && this.dateUtil.isValidDate(range.to)
          ) {
            if (this.dateUtil.isInRange(date, range.from, range.to)) {
              disabled = true;
            }
          }
        });
        if (disabled) return true;
      }

      if (this.dateUtil.isValidDate(to) && this.dateUtil.isBefore(date, to)) {
        disabled = true;
      }

      if (
        this.dateUtil.isValidDate(from)
        && this.dateUtil.isAfter(date, from)
      ) {
        disabled = true;
      }

      if (typeof custom === 'function' && custom(date)) {
        disabled = true;
      }

      return disabled;
    },
  },
};
</script>
