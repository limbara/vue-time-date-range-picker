<template>
  <div>
    <h2>Example Events</h2>
    <p>{{ eventName }}</p>
    <p>{{ eventParams }}</p>
    <date-picker
      :showHelperButtons="showHelperButtons"
      :dateInput="dateInput"
      :disabledDates="disabledDates"
      @date-applied="dateApplied"
      @on-prev-calendar="onPrevCalendar"
      @on-next-calendar="onNextCalendar"
      @datepicker-opened="datepickerOpened"
      @datepicker-closed="datepickerClosed"
      @select-date="selectDate"
      @select-disabled-date="selectDisabledDate"
    />
  </div>
</template>

<script>
import DatePicker from '../src/Components/DatePicker.vue';

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      dateInput: {
        placeholder: 'Select Date',
      },
      showHelperButtons: true,
      eventName: '',
      eventParams: '',
      disabledDates: {
        to: new Date((new Date()).setDate(1)),
      },
    };
  },
  methods: {
    dateApplied(date1, date2) {
      this.eventName = 'date-applied';
      this.eventParams = `${date1.toString()} - ${date2.toString()}`;
    },
    onPrevCalendar() {
      this.eventName = 'on-prev-calendar';
      this.eventParams = '';
    },
    onNextCalendar() {
      this.eventName = 'on-next-calendar';
      this.eventParams = '';
    },
    datepickerOpened() {
      this.eventName = 'datepicker-opened';
      this.eventParams = '';
    },
    datepickerClosed() {
      this.eventName = 'datepicker-closed';
      this.eventParams = '';
    },
    selectDate(date1, date2) {
      this.eventName = 'select-date';
      this.eventParams = `${date1.toString()} - ${date2.toString()}`;
    },
    selectDisabledDate(date) {
      this.eventName = 'select-disabled-date';
      this.eventParams = date.toString();
    },
  },
};
</script>

<style lang="scss" scoped></style>
