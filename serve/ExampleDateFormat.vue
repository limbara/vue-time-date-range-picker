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
      format: 'DD MM YYYY hh:mm',
      sameDateFormat: {
        from: 'DD MM YYYY, hh:mm',
        to: 'hh:mm',
      },
    };
  },
};
</script>
