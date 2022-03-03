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
import Util from '../Utils/Util';

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
    availableDates: Object,
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
  emits: [
    'select-disabled-date',
    'select-date',
    'on-prev-calendar',
    'on-next-calendar',
  ],
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
      const threshold = this.isMondayFirst ? MONDAY : SUNDAY;

      while (firstDay.getDay() !== threshold) {
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
      if (this.disabledDates && this.disabledDates.from) {
        const { from, to } = this.disabledDates;

        // next is always available if there's 'to' date intersecting 'from' date
        if (to && this.dateUtil.isAfter(to, from)) {
          return false;
        }

        const pageDate = this.dateUtil.fromUnix(this.pageTimestamp);
        return (
          (this.dateUtil.month(from) <= this.dateUtil.month(pageDate)
            && this.dateUtil.year(from) <= this.dateUtil.year(pageDate))
          || this.dateUtil.year(from) < this.dateUtil.year(pageDate)
        );
      }
      // availableDates cannot interfere disabledDates
      if (
        Util.isEmptyObject(this.disabledDates)
        && this.availableDates
        && this.availableDates.to
      ) {
        const { from, to } = this.availableDates;

        // next is always available if there's 'from' date intersecting 'to' date
        if (from && this.dateUtil.isAfter(from, to)) {
          return false;
        }

        const pageDate = this.dateUtil.fromUnix(this.pageTimestamp);
        return (
          (this.dateUtil.month(to) <= this.dateUtil.month(pageDate)
            && this.dateUtil.year(to) <= this.dateUtil.year(pageDate))
          || this.dateUtil.year(to) < this.dateUtil.year(pageDate)
        );
      }
      return false;
    },
    isPrevDisabled() {
      if (this.disabledDates && this.disabledDates.to) {
        const { from, to } = this.disabledDates;

        // prev is always available if there's 'from' date intersecting 'to' date
        if (from && this.dateUtil.isBefore(from, to)) {
          return false;
        }

        const pageDate = this.dateUtil.fromUnix(this.pageTimestamp);
        return (
          (this.dateUtil.month(to) >= this.dateUtil.month(pageDate)
            && this.dateUtil.year(to) >= this.dateUtil.year(pageDate))
          || this.dateUtil.year(to) > this.dateUtil.year(pageDate)
        );
      }
      // availableDates cannot interfere disabledDates
      if (
        Util.isEmptyObject(this.disabledDates)
        && this.availableDates
        && this.availableDates.from
      ) {
        const { from, to } = this.availableDates;

        // prev is always available if there's 'to' date intersecting 'from' date
        if (to && this.dateUtil.isBefore(to, from)) {
          return false;
        }

        const pageDate = this.dateUtil.fromUnix(this.pageTimestamp);
        return (
          (this.dateUtil.month(from) >= this.dateUtil.month(pageDate)
            && this.dateUtil.year(from) >= this.dateUtil.year(pageDate))
          || this.dateUtil.year(from) > this.dateUtil.year(pageDate)
        );
      }
      return false;
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
      if (
        Util.isEmptyObject(this.disabledDates)
        && Util.isEmptyObject(this.availableDates)
      ) {
        return false;
      }
      let disabled = false;
      if (!Util.isEmptyObject(this.disabledDates)) {
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
          this.dateUtil.isValidDate(from)
          && this.dateUtil.isValidDate(to)
          && this.dateUtil.isBefore(from, to)
        ) {
          // 'from' date smaller than 'to' date,
          // disabling dates only happens between 'from' & 'to'
          if (this.dateUtil.isSameOrBetween(date, from, to)) {
            disabled = true;
          }
        } else {
          if (
            this.dateUtil.isValidDate(from)
            && this.dateUtil.isSameOrAfter(date, from)
          ) {
            disabled = true;
          }

          if (
            this.dateUtil.isValidDate(to)
            && this.dateUtil.isSameOrBefore(date, to)
          ) {
            disabled = true;
          }
        }

        if (typeof custom === 'function' && custom(date)) {
          disabled = true;
        }
      } else if (!Util.isEmptyObject(this.availableDates)) {
        disabled = true;
        const {
          dates, from, to, ranges, custom,
        } = this.availableDates;

        if (typeof dates !== 'undefined' && Array.isArray(dates)) {
          dates.forEach((d) => {
            if (this.dateUtil.isSameDate(d, date)) {
              disabled = false;
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
                disabled = false;
              }
            }
          });
          if (disabled) return true;
        }

        if (
          this.dateUtil.isValidDate(from)
          && this.dateUtil.isValidDate(to)
          && this.dateUtil.isBefore(from, to)
        ) {
          // 'from' date is smaller than 'to' date,
          // enabling dates only happens between 'from' & 'to'
          if (this.dateUtil.isSameOrBetween(date, from, to)) {
            disabled = false;
          }
        } else {
          if (
            this.dateUtil.isValidDate(to)
            && this.dateUtil.isSameOrBefore(date, to)
          ) {
            disabled = false;
          }

          if (
            this.dateUtil.isValidDate(from)
            && this.dateUtil.isSameOrAfter(date, from)
          ) {
            disabled = false;
          }
        }

        if (typeof custom === 'function' && custom(date)) {
          disabled = false;
        }
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
