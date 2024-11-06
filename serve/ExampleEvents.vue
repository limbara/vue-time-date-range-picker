<template>
  <div>
    <h2>Example Events</h2>
    <ol class="event-list">
      <li
        v-for="event in events"
        :key="event.name + event.time.getTime()"
        class="event-list__item"
      >
        {{ event.name }} - {{ event.value }}
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
      @on-reset="onReset"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import DatePicker from "./StatefullDatepicker.vue";
import { Nullable } from "@utils/helpers";

class Event {
  name: string;
  value: any;
  time: Date;

  constructor(name: string, value: any) {
    this.name = name;
    this.value = value;
    this.time = new Date();
  }
}

const dateInput = {
  placeholder: "Select Date",
};
const showHelperButtons = true;
const events = ref<Array<Event>>([]);
const disabledDates = {
  to: new Date(new Date().setDate(1)),
};

const dateApplied = (date1: Date, date2: Date) => {
  events.value.push(
    new Event("date-applied", `${date1?.toString()} - ${date2?.toString()}`)
  );
};
const onReset = () => {
  events.value.push(new Event("on-reset", ""));
};

const onPrevCalendar = () => {
  events.value.push(new Event("on-prev-calendar", ""));
};
const onNextCalendar = () => {
  events.value.push(new Event("on-next-calendar", ""));
};
const datepickerOpened = () => {
  events.value.push(new Event("datepicker-opened", ""));
};
const datepickerClosed = () => {
  events.value.push(new Event("datepicker-closed", ""));
};
const selectDate = (date1: Nullable<Date>, date2: Nullable<Date>) => {
  events.value.push(
    new Event("select-date", `${date1?.toString()} - ${date2?.toString()}`)
  );
};
const selectDisabledDate = (date: Date) => {
  events.value.push(new Event("select-disabled-date", date?.toString()));
};

const clearEvents = () => {
  const date = new Date();
  events.value = events.value.filter(
    (event) => date.getTime() < event.time.getTime() + 5000
  );
};

onMounted(() => {
  setInterval(clearEvents, 1000);
});
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
