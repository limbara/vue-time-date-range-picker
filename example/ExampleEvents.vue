<template>
  <div>
    <h2>Example Events</h2>
    <ol class="event-list">
      <li v-for="event in events" :key="event.name+event.time.getTime()" class="event-list__item">
        {{event.name}} - {{event.value}}
      </li>
    </ol>
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

class Event {
  constructor(name, value) {
    this.name = name;
    this.value = value;
    this.time = new Date();
  }
}

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
      events: [],
      disabledDates: {
        to: new Date(new Date().setDate(1)),
      },
    };
  },
  methods: {
    dateApplied(date1, date2) {
      this.events.push(
        new Event('date-applied', `${date1.toString()} - ${date2.toString()}`),
      );
    },
    onPrevCalendar() {
      this.events.push(new Event('on-prev-calendar', ''));
    },
    onNextCalendar() {
      this.events.push(new Event('on-next-calendar', ''));
    },
    datepickerOpened() {
      this.events.push(new Event('datepicker-opened', ''));
    },
    datepickerClosed() {
      this.events.push(new Event('datepicker-closed', ''));
    },
    selectDate(date1, date2) {
      this.events.push(
        new Event('select-date', `${date1.toString()} - ${date2.toString()}`),
      );
    },
    selectDisabledDate(date) {
      this.events.push(new Event('select-disabled-date', date.toString()));
    },
    clearEvents() {
      const date = new Date();
      this.events = this.events.filter((event) => date.getTime() < event.time.getTime() + 5000);
    },
  },
  mounted() {
    setInterval(this.clearEvents, 1000);
  },
};
</script>

<style lang="scss" scoped>
.event-list {
  padding: 0;
  margin: 0;
  &__item {
    font-size: 10px;
  }
}
</style>
