<template>
  <div>
    <h2>Example Events</h2>
    <p>{{ eventName }}</p>
    <p>{{ eventParams }}</p>
    <date-picker
      :showHelperButtons="showHelperButtons"
      :dateInput="dateInput"
      @dateApplied="dateApplied"
      @onPrevCalendar="onPrevCalendar"
      @onNextCalendar="onNextCalendar"
      @datepickerOpened="datepickerOpened"
      @datepickerClosed="datepickerClosed"
      @selectDate="selectDate"
      @selectDisabledDate="selectDisabledDate"
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
    };
  },
  methods: {
    dateApplied(date1, date2) {
      this.eventName = 'dateApplied';
      this.eventParams = `${date1.toString()} - ${date2.toString()}`;
    },
    onPrevCalendar() {
      this.eventName = 'onPrevCalendar';
      this.eventParams = '';
    },
    onNextCalendar() {
      this.eventName = 'onNextCalendar';
      this.eventParams = '';
    },
    datepickerOpened() {
      this.eventName = 'datepickerOpened';
      this.eventParams = '';
    },
    datepickerClosed() {
      this.eventName = 'datepickerClosed';
      this.eventParams = '';
    },
    selectDate(date1, date2) {
      this.eventName = 'selectDate';
      this.eventParams = `${date1.toString()} - ${date2.toString()}`;
    },
    selectDisabledDate(date) {
      this.eventName = 'selectDisabledDate';
      this.eventParams = date.toString();
    },
  },
};
</script>

<style lang="scss" scoped></style>
