<template>
  <div>
    <h2>Example Helper Buttons</h2>
    <h4>show helper buttons</h4>
    <date-picker :dateInput="dateInput" :showHelperButtons="true" />
    <br />
    <h4>custom helper buttons</h4>
    <pre>
      helperButtons: [
        {
          name: "Custom 1",
          from: new Date("2022 09 01 00:00"),
          to: new Date("2022 09 02 23:59"),
        },
        {
          name: "Custom 2",
          from: new Date("2022 09 01 00:00"),
          to: new Date("2022 09 03 15:00"),
        },
        {
          name: "Custom 3",
          from: new Date("2022 09 01 00:00"),
          to: new Date("2022 09 15 00:00"),
        },
      ],
    </pre>
    <date-picker
      :dateInput="dateInput"
      :showHelperButtons="true"
      :helperButtons="helperButtons"
    />
  </div>
</template>

<script>
import DatePicker from '@components/DatePicker/DatePicker.vue';

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      dateInput: {
        placeholder: 'Select Date',
      },
      helperButtons: [
        {
          name: 'Custom 1',
          from: new Date('2022 09 01 00:00'),
          to: new Date('2022 09 02 23:59'),
        },
        {
          name: 'Custom 2',
          from: new Date('2022 09 01 00:00'),
          to: new Date('2022 09 03 15:00'),
        },
        {
          name: 'Custom 3',
          from: new Date('2022 09 01 00:00'),
          to: new Date('2022 09 15 00:00'),
        },
      ],
    };
  },
};
</script>
