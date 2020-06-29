<template>
  <div class="vdpr-datepicker__calendar">
    <table class="vdpr-datepicker__calendar-table">
      <thead>
        <tr>
          <th v-for="dayName in dayNames" :key="dayName">{{ dayName }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="i in 7" :key={i}>{{ i }}</td>
        </tr>
        <tr>
          <td v-for="i in 7" :key={i}>{{ i }}</td>
        </tr>
        <tr>
          <td v-for="i in 7" :key={i}>{{ i }}</td>
        </tr>
        <tr>
          <td v-for="i in 7" :key={i}>{{ i }}</td>
        </tr>
        <tr>
          <td v-for="i in 7" :key={i}>{{ i }}</td>
        </tr>
        <tr>
          <td v-for="i in 7" :key={i}>{{ i }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import DateUtil from '../Utils/DateUtil';

export default {
  props: {
    selectedStartDate: Date,
    selectedEndDate: Date,
    language: String,
  },
  data() {
    return {
      dateUtil: new DateUtil(this.language),
    };
  },
  computed: {
    dayNames() {
      return this.dateUtil.getAbbrDayNames();
    },
  },
};
</script>
