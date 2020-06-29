<template>
  <div class="vdpr-datepicker">
    <date-input
      :language="language"
      :selectedStartDate="selectedStartDate"
      :selectedEndDate="selectedEndDate"
    />
    <div class="vdpr-datepicker__calendar-dialog">
      <calendar
        :language="language"
        :selectedStartDate="selectedStartDate"
        :selectedEndDate="selectedEndDate"
      />
    </div>
  </div>
</template>

<script>
import DateInput from './DateInput.vue';
import Calendar from './Calendar.vue';

export default {
  components: {
    DateInput,
    Calendar,
  },
  props: {
    language: {
      type: String,
      default: 'en',
    },
  },
  data() {
    return {
      selectedStartDate: new Date('2020-06-28'),
      selectedEndDate: new Date('2020-06-29'),
    };
  },
  mounted() {},
};
</script>

<style lang="scss">
@import "../Styles/DatePicker.scss";
</style>
