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

<script>
import DatePicker from '../src/components/DatePicker.vue';

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      dateInput: {
        placeholder: 'Select Date',
      },
      calendarDateInput: {
        labelStarts: 'Awal',
        labelEnds: 'Akhir',
        inputClass: null,
        format: 'DD-MM-YYYY',
      },
    };
  },
};
</script>
