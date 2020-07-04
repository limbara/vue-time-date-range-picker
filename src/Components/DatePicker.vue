<template>
  <div class="vdpr-datepicker">
    <date-input
      :language="language"
      :selectedStartDate="selectedStartDate"
      :selectedEndDate="selectedEndDate"
      :format="format"
      :sameDateFormat="sameDateFormat"
      :inputClass="dateInput.inputClass"
      :name="dateInput.name"
      :id="dateInput.id"
      :placeholder="dateInput.placeholder"
      :required="dateInput.required"
      @on-click="onClickDateInput"
    />
    <calendar-dialog
      v-show="showCalendarDialog"
      :language="language"
      :initialDates="initialDates"
      :disabledDates="disabledDates"
      :showHelperButtons="showHelperButtons"
      :helperButtons="helperButtons"
      :dateInput="calendarDateInput"
      :timeInput="calendarTimeInput"
      @on-apply="onApply"
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
    showHelperButtons: Boolean,
    helperButtons: Array,
    calendarDateInput: Object,
    calendarTimeInput: Object,
  },
  data() {
    const [fromDate, toDate] = this.initialDates;

    return {
      selectedStartDate: fromDate ?? null,
      selectedEndDate: toDate ?? null,
      showCalendarDialog: false,
    };
  },
  computed: {
    dateUtil() {
      return new DateUtil(this.language);
    },
  },
  methods: {
    onApply(date1, date2) {
      this.selectedStartDate = date1;
      this.selectedEndDate = date2;
      this.showCalendarDialog = false;
      this.$emit('date-applied', date1, date2);
    },
    onClickDateInput() {
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
