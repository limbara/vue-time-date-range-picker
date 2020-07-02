<template>
  <div>
    <h2>Example Time Input Config</h2>
    <h4>Read only &amp; 30 minutes step</h4>
    <pre>
      {
        readonly: true,
        step: 30,
        inputClass: "my_custom_class",
      },
    </pre>
    <pre>
      .vdpr-datepicker /deep/ .my_custom_class {
        background-color: aqua !important;
      }
    </pre>
    <date-picker
      :dateInput="dateInput"
      :showHelperButtons="true"
      :calendarTimeInput="calendarTimeInput"
    />
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
      calendarTimeInput: {
        readonly: true,
        step: 30,
        inputClass: 'my_custom_class',
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.vdpr-datepicker /deep/ .my_custom_class {
  background-color: aqua !important;
}
</style>
