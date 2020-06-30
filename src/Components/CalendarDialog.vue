<template>
  <div class="vdpr-datepicker__calendar-dialog">
    <div class="vdpr-datepicker__calendar-button-helper">
      <button
        v-for="btn in helpers"
        :key="'btn' + btn.name"
        :class="[
          'vdpr-datepicker__button' ,
          'vdpr-datepicker__button--block' ,
          'vdpr-datepicker__button-default'
        ]"
        @click="() => { onHelperClick(btn.from, btn.to) } "
      >{{ btn.name }}</button>
    </div>
    <calendar
      :language="language"
      :selectedStartDate="selectedStartDate"
      :selectedEndDate="selectedEndDate"
      :disabledDates="disabledDates"
      @selectDate="selectDate"
    />
    <div class="vdpr-datepicker__calendar-actions">
      <switch-button :checked="isAllDay" @onCheckChange="onCheckChange" />
    </div>
  </div>
</template>

<script>
import DateUtil from '../Utils/DateUtil';
import Calendar from './Calendar.vue';
import SwitchButton from './SwitchButton.vue';

export default {
  components: {
    Calendar,
    SwitchButton,
  },
  props: {
    initialDates: Array,
    language: String,
    disabledDates: Object,
    helperButtons: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    const dateUtil = new DateUtil(this.language);
    const [fromDate, toDate] = this.initialDates;

    return {
      selectedStartDate: fromDate ?? null,
      selectedEndDate: toDate ?? null,
      isAllDay: false,
      dateUtil,
    };
  },
  computed: {
    validHelperButtons() {
      return this.helperButtons.filter((button) => {
        const isButtonNameValid = typeof button.name === 'string' && button.name !== '';
        const isButtonFromDateValid = this.dateUtil.isValidDate(button.from);
        const isButtonToDateValid = this.dateUtil.isValidDate(button.to);

        return (
          isButtonNameValid && isButtonFromDateValid && isButtonToDateValid
        );
      });
    },
    helpers() {
      if (this.validHelperButtons.length) return this.validHelperButtons;

      return this.getDefaultHelpers();
    },
  },
  methods: {
    onCheckChange(check) {
      this.isAllDay = check;
    },
    onHelperClick(fromDate, toDate) {
      // eslint-disable-next-line no-console
      console.log(fromDate, toDate);
    },
    selectDate(date) {
      if (
        this.dateUtil.isValidDate(this.selectedStartDate)
        && this.dateUtil.isValidDate(this.selectedEndDate)
        && this.dateUtil.isSameDate(this.selectedStartDate, this.selectedEndDate)
      ) {
        this.selectedEndDate = date;
      } else {
        this.selectedStartDate = date;
        this.selectedEndDate = date;
      }
      this.checkAndSwap();
    },
    clearSelectedDate() {
      this.selectedStartDate = null;
      this.selectedEndDate = null;
    },
    checkAndSwap() {
      if (this.dateUtil.isAfter(this.selectedStartDate, this.selectedEndDate)) {
        [this.selectedStartDate, this.selectedEndDate] = [
          this.selectedEndDate,
          this.selectedStartDate,
        ];
      }
    },
    getDefaultHelpers() {
      const now = new Date();
      const todayFrom = this.dateUtil.startOf(now, 'day');
      const todayTo = this.dateUtil.endOf(now, 'day');
      const yesterdayFrom = this.dateUtil.subtract(todayFrom, 1, 'd');
      const yesterdayTo = this.dateUtil.subtract(todayTo, 1, 'd');
      const thisWeekFrom = this.dateUtil.startOf(now, 'week');
      const thisWeekTo = this.dateUtil.endOf(now, 'week');
      const lastWeekFrom = this.dateUtil.subtract(thisWeekFrom, 7, 'd');
      const lastWeekTo = this.dateUtil.subtract(thisWeekTo, 7, 'd');
      const thisMonthFrom = this.dateUtil.startOf(now, 'month');
      const thisMonthTo = this.dateUtil.endOf(now, 'month');
      const lastMonthFrom = this.dateUtil.subtract(thisMonthFrom, 1, 'M');
      const lastMonthTo = this.dateUtil.subtract(thisMonthTo, 1, 'M');
      const thisYearFrom = this.dateUtil.startOf(now, 'year');
      const thisYearTo = this.dateUtil.endOf(now, 'year');
      const lastYearFrom = this.dateUtil.subtract(thisYearFrom, 1, 'y');
      const lastYearTo = this.dateUtil.subtract(thisYearTo, 1, 'y');

      return [
        {
          name: 'Today',
          from: todayFrom,
          to: todayTo,
        },
        {
          name: 'Yesterfay',
          from: yesterdayFrom,
          to: yesterdayTo,
        },
        {
          name: 'This Week',
          from: thisWeekFrom,
          to: thisWeekTo,
        },
        {
          name: 'Last Week',
          from: lastWeekFrom,
          to: lastWeekTo,
        },
        {
          name: 'This Month',
          from: thisMonthFrom,
          to: thisMonthTo,
        },
        {
          name: 'Last Month',
          from: lastMonthFrom,
          to: lastMonthTo,
        },
        {
          name: 'This Year',
          from: thisYearFrom,
          to: thisYearTo,
        },
        {
          name: 'Last Year',
          from: lastYearFrom,
          to: lastYearTo,
        },
      ];
    },
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.table(this.getDefaultHelpers());
  },
};
</script>
