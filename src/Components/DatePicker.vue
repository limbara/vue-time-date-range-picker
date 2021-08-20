<template>
  <div class="vdpr-datepicker">
    <date-input
      :type="showingDateInput ? 'text' : 'hidden'"
      :language="language"
      :selectedStartDate="selectedStartDate"
      :selectedEndDate="selectedEndDate"
      :format="format"
      :sameDateFormat="sameDateFormat"
      :refName="dateInput.refName"
      :inputClass="dateInput.inputClass"
      :name="dateInput.name"
      :id="dateInput.id"
      :placeholder="dateInput.placeholder"
      :required="dateInput.required"
      @on-click="onClickDateInput"
    />
    <calendar-dialog
      v-show="showingCalendarDialog"
      :language="language"
      :inline="inline"
      :initialDates="initialDates"
      :disabledDates="disabledDates"
      :availableDates="availableDates"
      :showHelperButtons="showHelperButtons"
      :helperButtons="helperButtons"
      :dateInput="calendarDateInput"
      :timeInput="calendarTimeInput"
      :switchButtonLabel="switchButtonLabel"
      :switchButtonInitial="switchButtonInitial"
      :applyButtonLabel="applyButtonLabel"
      :resetButtonLabel="resetButtonLabel"
      :isMondayFirst="isMondayFirst"
      @on-apply="onApply"
      @on-reset="onReset"
      @select-date="selectDate"
      @select-disabled-date="selectDisabledDate"
      @on-prev-calendar="onPrevCalendar"
      @on-next-calendar="onNextCalendar"
    />
  </div>
</template>

<script>
import PropsValidator from '../Utils/PropsValidator';
import DateUtil from '../Utils/DateUtil';
import DateInput from './DateInput.vue';
import CalendarDialog from './CalendarDialog.vue';

export { CalendarDialog };
export default {
  components: {
    DateInput,
    CalendarDialog,
  },
  props: {
    initialDates: {
      type: Array,
      validator: PropsValidator.isValidInitialDate,
      default() {
        return [];
      },
    },
    inline: {
      type: Boolean,
      default: false,
    },
    language: {
      type: String,
      default: 'en',
    },
    format: {
      type: String,
      default: 'DD/MM/YYYY HH:mm',
    },
    sameDateFormat: {
      type: Object,
      validator: PropsValidator.isValidSameDateFormat,
      default() {
        return {
          from: 'DD/MM/YYYY, HH:mm',
          to: 'HH:mm',
        };
      },
    },
    dateInput: {
      type: Object,
      default() {
        return {};
      },
    },
    disabledDates: Object,
    availableDates: Object,
    showHelperButtons: Boolean,
    helperButtons: Array,
    calendarDateInput: Object,
    calendarTimeInput: Object,
    switchButtonLabel: String,
    switchButtonInitial: Boolean,
    applyButtonLabel: String,
    resetButtonLabel: String,
    isMondayFirst: Boolean,
  },
  data() {
    const [fromDate, toDate] = this.initialDates;
    const showCalendarDialog = this.inline;

    return {
      selectedStartDate: fromDate ?? null,
      selectedEndDate: toDate ?? null,
      showCalendarDialog,
    };
  },
  computed: {
    dateUtil() {
      return new DateUtil(this.language);
    },
    showingDateInput() {
      return !this.inline;
    },
    showingCalendarDialog() {
      return this.showCalendarDialog || this.inline;
    },
  },
  methods: {
    onApply(date1, date2) {
      if (!date1 || !date2) return false;

      this.selectedStartDate = date1;
      this.selectedEndDate = date2;

      if (!this.inline) {
        this.showCalendarDialog = false;
      }

      return this.$emit('date-applied', date1, date2);
    },
    onReset() {
      this.selectedStartDate = null;
      this.selectedEndDate = null;
    },
    onClickDateInput() {
      if (this.inline) return;

      this.showCalendarDialog = !this.showCalendarDialog;

      if (this.showCalendarDialog) {
        this.$emit('datepicker-opened');
      } else {
        this.$emit('datepicker-closed');
      }
    },
    onPrevCalendar() {
      this.$emit('on-prev-calendar');
    },
    onNextCalendar() {
      this.$emit('on-next-calendar');
    },
    selectDate(date1, date2) {
      this.$emit('select-date', date1, date2);
    },
    selectDisabledDate(date) {
      this.$emit('select-disabled-date', date);
    },
  },
};
</script>

<style lang="scss">
@import "../Styles/DatePicker.scss";
</style>
