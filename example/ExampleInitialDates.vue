<template>
  <div>
    <h2>Example Initial Dates</h2>
    <pre>
      {
        initialDates: [new Date("2020 08 01 00:00"), new Date("2020 08 03 23:59")],
      }
    </pre>
    <date-picker :dateInput="dateInput" :initialDates="dates1" />
    <br />
    <pre>
      {
        initialDates: [new Date("2020 08 01 00:00"), new Date("2020 08 15 00:00")],
      }
    </pre>
    <date-picker :dateInput="dateInput" :initialDates="dates2" />
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
      dates1: [new Date('2020 08 01 00:00'), new Date('2020 08 03 23:59')],
      dates2: [new Date('2020 08 01 00:00'), new Date('2020 08 15 00:00')],
    };
  },
};
</script>
