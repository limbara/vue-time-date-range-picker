<template>
  <div>
    <date-picker
      :initialDates="initialDates"
      :showHelperButtons="showHelperButtons"
      :dateInput="dateInput"
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
      initialDates: [new Date(), new Date()],
      dateInput: {
        placeholder: 'Select Date',
        id: 'date_picker_1',
        name: 'date_picker_1',
        required: true,
      },
      showHelperButtons: true,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
