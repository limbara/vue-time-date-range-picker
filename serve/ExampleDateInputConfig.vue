<template>
  <div>
    <h2>Example Date Input Config</h2>
    <pre>
      {
        labelStarts: 'Awal',
        labelEnds: 'Akhir',
        inputClass: null,
        format: 'DD-MM-YYYY',
      }
    </pre>
    <date-picker
      language="id"
      :dateInput="dateInput"
      :calendarDateInput="calendarDateInput"
      switch-button-label="Seharian"
    />
  </div>
</template>

<script lang="ts" setup>
import DatePicker from "./StatefullDatepicker.vue";

const dateInput = {
  placeholder: "Select Date",
};
const calendarDateInput = {
  labelStarts: "Awal",
  labelEnds: "Akhir",
  inputClass: null,
  format: "DD-MM-YYYY",
};
</script>
