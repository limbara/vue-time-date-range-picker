<template>
  <div>
    <h2>Example First Day Of Week Monday</h2>
    <date-picker :dateInput="dateInput" :is-monday-first="true" />
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
    };
  },
};
</script>
