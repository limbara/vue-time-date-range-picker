<template>
  <div class="vdpr-datepicker__calendar-dialog">
    <div class="vdpr-datepicker__calendar-button-helper" v-if="helpers.length">
      <button
        v-for="btn in helpers"
        :key="'btn' + btn.name"
        :class="[
          'vdpr-datepicker__button',
          'vdpr-datepicker__button--block',
          'vdpr-datepicker__button-default',
        ]"
        @click="
          () => {
            onHelperClick(btn.from, btn.to);
          }
        "
      >
        {{ btn.name }}
      </button>
    </div>
    <calendar
      :language="language"
      :selectedStartDate="selectedStartDate"
      :selectedEndDate="selectedEndDate"
      :disabledDates="disabledDates"
      @selectDate="selectDate"
    />
    <div class="vdpr-datepicker__calendar-actions">
      <div class="vdpr-datepicker__calendar-input-wrapper">
        <span>All Days</span>
        <switch-button :checked="isAllDay" @onCheckChange="onCheckChange" />
      </div>
      <div class="vdpr-datepicker__calendar-input-wrapper">
        <span>Starts</span>
        <calendar-input-date
          :id="startInput.label"
          :name="startInput.label"
          :format="startInput.format"
          :timestamp="unixSelectedStartDate"
          :language="language"
          @onChange="onStartInputDateChange"
        />
      </div>
      <div
        class="vdpr-datepicker__calendar-input-wrapper vdpr-datepicker__calendar-input-wrapper--end"
      >
        <calendar-input-time
          v-show="isVisibleTimeInput"
          id="time_start"
          name="time_start"
          :timestamp="unixSelectedStartDate"
          @onChange="onTimeStartInputChange"
        />
      </div>
      <div class="vdpr-datepicker__calendar-input-wrapper">
        <span>Ends</span>
        <calendar-input-date
          :id="endInput.label"
          :name="endInput.label"
          :format="endInput.format"
          :timestamp="unixSelectedEndDate"
          :language="language"
          @onChange="onEndDateInputDateChange"
        />
      </div>
      <div
        class="vdpr-datepicker__calendar-input-wrapper vdpr-datepicker__calendar-input-wrapper--end"
      >
        <calendar-input-time
          v-show="isVisibleTimeInput"
          id="time_end"
          name="time_end"
          :timestamp="unixSelectedEndDate"
          @onChange="onTimeEndInputChange"
        />
      </div>
      <button
        :class="[
          'vdpr-datepicker__button',
          'vdpr-datepicker__button--block',
          'vdpr-datepicker__button-submit',
        ]"
        @click="onClickButtonApply"
      >
        Apply
      </button>
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
    language: String,
    disabledDates: {
      type: Object,
      validator: PropsValidator.isValidDisabledDates,
      default() {
        return {};
      },
    },
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
          format: 'DD/MM/yyyy',
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
          format: 'DD/MM/yyyy',
        };
      },
    },
  },
  data() {
    const dateUtil = new DateUtil(this.language);
    let [from, to] = this.initialDates;

    if (this.isAllDay) {
      from = this.dateUtil.startOf(from, 'd');
      to = this.dateUtil.endOf(to, 'd');
    }

    return {
      selectedStartDate: from ?? null,
      selectedEndDate: to ?? null,
      isAllDay: true,
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
    isVisibleTimeInput() {
      return !this.isAllDay;
    },
  },
  methods: {
    onCheckChange(check) {
      this.isAllDay = check;
      if (!this.selectedStartDate || !this.selectedEndDate) return;

      this.selectedStartDate = this.dateUtil.startOf(
        this.selectedStartDate,
        'd',
      );
      if (check) {
        this.selectedEndDate = this.dateUtil.endOf(this.selectedEndDate, 'd');
      } else {
        this.selectedEndDate = this.dateUtil.startOf(this.selectedEndDate, 'd');
      }
    },
    onStartInputDateChange(value) {
      this.selectedStartDate = value;
      this.checkAndSwap();
    },
    onEndDateInputDateChange(value) {
      this.selectedEndDate = value;
      this.checkAndSwap();
    },
    onTimeStartInputChange(value) {
      this.selectedStartDate = value;
      this.checkAndSwap();
    },
    onTimeEndInputChange(value) {
      this.selectedEndDate = value;
      this.checkAndSwap();
    },
    onHelperClick(fromDate, toDate) {
      if (
        this.dateUtil.isSame(fromDate, this.dateUtil.startOf(fromDate, 'd'))
        && this.dateUtil.isSame(toDate, this.dateUtil.endOf(toDate, 'd'))
      ) {
        this.isAllDay = true;
      } else {
        this.isAllDay = false;
      }

      this.selectedStartDate = fromDate;
      this.selectedEndDate = toDate;
    },
    onClickButtonApply() {
      this.$emit('onApply', this.selectedStartDate, this.selectedEndDate);
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

      if (this.isAllDay) {
        this.selectedStartDate = this.dateUtil.startOf(
          this.selectedStartDate,
          'd',
        );
        this.selectedEndDate = this.dateUtil.endOf(this.selectedEndDate, 'd');
      }
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
