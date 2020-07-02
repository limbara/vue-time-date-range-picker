<template>
  <div class="vdpr-datepicker">
    <date-input
      :language="language"
      :selectedStartDate="selectedStartDate"
      :selectedEndDate="selectedEndDate"
      :format="format"
      :inputClass="dateInput.inputClass"
      :name="dateInput.name"
      :id="dateInput.id"
      :placeholder="dateInput.placeholder"
      :required="dateInput.required"
      @onClick="onClickDateInput"
    />
    <calendar-dialog
      v-show="showCalendarDialog"
      :language="language"
      :initialDates="initialDates"
      :disabledDates="disabledDates"
      :showHelperButtons="showHelperButtons"
      :helperButtons="helperButtons"
      :startInput="startInput"
      :endInput="endInput"
      @onApply="onApply"
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
      default: 'DD/MM/yyyy, HH:mm',
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
    startInput: Object,
    endInput: Object,
  },
  data() {
    const dateUtil = new DateUtil(this.language);
    const [fromDate, toDate] = this.initialDates;

    return {
      selectedStartDate: fromDate ?? null,
      selectedEndDate: toDate ?? null,
      dateUtil,
      showCalendarDialog: false,
    };
  },
  methods: {
    onApply(date1, date2) {
      this.selectedStartDate = date1;
      this.selectedEndDate = date2;
    },
    onClickDateInput() {
      this.showCalendarDialog = !this.showCalendarDialog;
    },
  },
};
</script>

<style lang="scss">
@import "../Styles/DatePicker.scss";
</style>
