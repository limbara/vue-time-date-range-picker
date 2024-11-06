<template>
  <div>
    <h2>Example Initial Dates</h2>
    <pre>
      {
        initialDates: [new Date("2024 09 01 00:00"), new Date("2024 09 03 23:59")],
      }
    </pre>
    <date-picker :dateInput="dateInput" :initialDates="dates1" />
    <br />
    <pre>
      {
        initialDates: [new Date("2024 09 01 00:00"), new Date("2024 09 15 00:00")],
      }
    </pre>
    <date-picker :dateInput="dateInput" :initialDates="dates2" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import DatePicker from "./StatefullDatepicker.vue";
import { InitialDate } from "@composables/useSelectedDates";

const dateInput = {
  placeholder: "Select Date",
  required: true,
};

const dates1 = ref<InitialDate>([
  new Date("2024 09 01 00:00"),
  new Date("2024 09 03 23:59"),
]);

const dates2 = ref<InitialDate>([
  new Date("2024 09 01 00:00"),
  new Date("2024 09 15 00:00"),
]);
</script>
