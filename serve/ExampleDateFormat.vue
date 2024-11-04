<template>
  <div>
    <h2>Example Date Format</h2>
    <h4>format applied date with "format" and "sameDateFormat"</h4>
    <pre>
      {
        format: "DD MM YYYY hh:mm",
        sameDateFormat: {
          from: "DD MM YYYY, hh:mm",
          to: "hh:mm",
        },
      }
    </pre>
    <date-picker
      :dateInput="dateInput"
      :format="format"
      :sameDateFormat="sameDateFormat"
    />
  </div>
</template>

<script lang="ts" setup>
import DatePicker from "./StatefullDatepicker.vue";

const dateInput = {
  placeholder: "Select Date",
};
const format = "DD MM YYYY hh:mm";
const sameDateFormat = {
  from: "DD MM YYYY, hh:mm",
  to: "hh:mm",
};
</script>
