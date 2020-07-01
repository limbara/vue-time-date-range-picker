<template>
  <div class="vdpr-datepicker__calendar-dialog">
    <div class="vdpr-datepicker__calendar-button-helper" v-if="helpers.length">
      <button
        v-for="btn in helpers"
        :key="'btn' + btn.name"
        :class="[
          'vdpr-datepicker__button',
          'vdpr-datepicker__button--block',
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
      <div class="vdpr-datepicker__calendar-input">
        <span>All Days</span>
        <switch-button :checked="isAllDay" @onCheckChange="onCheckChange" />
      </div>
      <calendar-input-date
        :id="startInput.label"
        :name="startInput.label"
        :format="format"
        :timestamp="unixSelectedStartDate"
        :language="language"
        @onSubmit="onStartInputDateSubmit"
      />
      <calendar-input-time
        id="time_start"
        name="time_start"
        :timestamp="unixSelectedStartDate"
      />
      <calendar-input-date
        :id="endInput.label"
        :name="endInput.label"
        :format="format"
        :timestamp="unixSelectedEndDate"
        :language="language"
        @onSubmit="onEndDateInputDateSubmit"
      />
      <calendar-input-time
        id="time_end"
        name="time_end"
        :timestamp="unixSelectedEndDate"
      />
    </div>
  </div>
</template>

<script>
import PropsValidator from '../Utils/PropsValidator';
import DateUtil from '../Utils/DateUtil';
import Calendar from './Calendar.vue';
import SwitchButton from './SwitchButton.vue';
import CalendarInputDate from './CalendarInputDate.vue';
import CalendarInputTime from './CalendarInputTime.vue';

export default {
  components: {
    Calendar,
    CalendarInputDate,
    CalendarInputTime,
    SwitchButton,
  },
  props: {
    initialDates: {
      type: Array,
      validator: PropsValidator.isValidInitialDate,
      default() {
        return [];
      },
    },
    format: {
      type: String,
      default: 'DD/MM/yyyy',
    },
    language: String,
    disabledDates: Object,
    showHelperButtons: {
      type: Boolean,
      default: true,
    },
    helperButtons: {
      type: Array,
      validator: PropsValidator.isValidHelperButtons,
      default() {
        return [];
      },
    },
    startInput: {
      type: Object,
      validator: PropsValidator.isValidCalendarInput,
      default() {
        return {
          label: 'Starts',
          inputClass: '',
        };
      },
    },
    endInput: {
      type: Object,
      validator: PropsValidator.isValidCalendarInput,
      default() {
        return {
          label: 'Ends',
          inputClass: '',
        };
      },
    },
  },
  data() {
    const dateUtil = new DateUtil(this.language);
    const [from, to] = this.initialDates;

    return {
      selectedStartDate: from ?? null,
      selectedEndDate: to ?? null,
      isAllDay: false,
      dateUtil,
    };
  },
  computed: {
    helpers() {
      if (!this.showHelperButtons) return [];

      if (this.helperButtons.length) return this.helperButtons;

      return this.getDefaultHelpers();
    },
    unixSelectedStartDate() {
      if (!this.selectedStartDate) {
        return 0;
      }

      return this.dateUtil.toUnix(this.selectedStartDate);
    },
    unixSelectedEndDate() {
      if (!this.selectedEndDate) {
        return 0;
      }

      return this.dateUtil.toUnix(this.selectedEndDate);
    },
  },
  methods: {
    onCheckChange(check) {
      this.isAllDay = check;
    },
    onStartInputDateSubmit(value) {
      // eslint-disable-next-line no-console
      console.log(value);
    },
    onEndDateInputDateSubmit(value) {
      // eslint-disable-next-line no-console
      console.log(value);
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
      const todayFrom = this.dateUtil.startOf(now, 'd');
      const todayTo = this.dateUtil.endOf(now, 'd');
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
          name: 'Yesterday',
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
};
</script>
