<template>
  <div class="vdpr-datepicker__calendar">
    <div class="vdpr-datepicker__calendar-control">
      <span
        class="vdpr-datepicker__calendar-control-prev"
        :class="{
          'vdpr-datepicker__calendar-control-disabled': isPrevPageDisabled,
        }"
        @click="onPrevClick"
      ></span>
      <span class="vdpr-datepicker__calendar-month-year">{{ monthYear }}</span>
      <span
        class="vdpr-datepicker__calendar-control-next"
        :class="{
          'vdpr-datepicker__calendar-control-disabled': isNextPageDisabled,
        }"
        @click="onNextClick"
      ></span>
    </div>
    <table class="vdpr-datepicker__calendar-table">
      <thead>
        <tr>
          <th v-for="dayName in dayNames" :key="dayName">{{ dayName }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in 6" :key="row">
          <td
            v-for="day in getRowDays(row)"
            :key="day.timestamp"
            :class="{
              highlighted: day.isHighlighted,
              faded: day.isFaded,
              disabled: day.isDisabled,
            }"
            @click="selectDate(day)"
          >
            {{ day.dateNumber }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import DateUtil from "@utils/DateUtil";
import { calendarEmits, calendarProps, ComputedDay } from "./types";
import { computed } from "vue";

const props = defineProps(calendarProps);
const emit = defineEmits(calendarEmits);

const dateUtil = computed(() => new DateUtil(props.language));

const monthYear = computed(() => {
  return props.pageDate
    ? dateUtil.value.formatDate(props.pageDate, "MMM YYYY")
    : "MMM YYYY";
});

const getRowDays = (row: number) => {
  const endIndex = row * 7;
  const startIndex = endIndex - 7;

  return props.days.slice(startIndex, endIndex);
};

const selectDate = (day: ComputedDay) => {
  if (day.isDisabled) {
    return emit("select-disabled-date", day.date);
  }

  return emit("select-date", day.date);
};

const onPrevClick = (e: Event) => {
  if (props.isPrevPageDisabled) return;

  emit("on-prev-calendar", e);
};

const onNextClick = (e: Event) => {
  if (props.isNextPageDisabled) return;

  emit("on-next-calendar", e);
};

defineExpose({
  selectDate,
  getRowDays,
});
</script>
