<template>
  <div>
    <h2>Example First Day Of Week Monday</h2>
    <date-picker :dateInput="dateInput" :is-monday-first="true" />
  </div>
</template>

<script lang="ts" setup>
import DatePicker from "./StatefullDatepicker.vue";

const dateInput = {
  placeholder: "Select Date",
};
</script>
