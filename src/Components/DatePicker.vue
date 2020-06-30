<template>
  <div class="vdpr-datepicker">
    <date-input
      :language="language"
      :format="format"
      :selectedStartDate="selectedStartDate"
      :selectedEndDate="selectedEndDate"
    />
    <calendar-dialog
      :language="language"
      :disabledDates="disabledDates"
      :initialDates="initialDates"
    />
  </div>
</template>

<script>
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
      default: 'DD MM yyyy',
    },
  },
  data() {
    const dateUtil = new DateUtil(this.language);
    const [fromDate, toDate] = this.initialDates;

    return {
      selectedStartDate: fromDate ?? null,
      selectedEndDate: toDate ?? null,
      dateUtil,
      disabledDates: {
        ranges: [
          {
            from: new Date('2020 05 01'),
            to: new Date('2020 05 31'),
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss">
@import "../Styles/DatePicker.scss";
</style>
