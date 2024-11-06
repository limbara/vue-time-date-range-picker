<template>
  <DatePicker
    v-bind="props"
    :initialDates="initialDates"
    @datepicker-closed="(...params) => emit('datepicker-closed', ...params)"
    @datepicker-opened="(...params) => emit('datepicker-opened', ...params)"
    @on-next-calendar="(...params) => emit('on-next-calendar', ...params)"
    @on-prev-calendar="(...params) => emit('on-prev-calendar', ...params)"
    @on-reset="
      (...params) => {
        initialDates = [null, null];
        emit('on-reset', ...params);
      }
    "
    @select-date="(...params) => emit('select-date', ...params)"
    @date-applied="
      (startDate, endDate) => {
        initialDates = [startDate, endDate];
        emit('date-applied', startDate, endDate);
      }
    "
    @select-disabled-date="
      (...params) => emit('select-disabled-date', ...params)
    "
  />
</template>

<script lang="ts">
export default {
  inheritAttrs: true,
};
</script>

<script lang="ts" setup>
import DatePicker from "@components/DatePicker/DatePicker.vue";
import { datePickerEmits, datePickerProps } from "@components/DatePicker/types";
import { InitialDate } from "@composables/useSelectedDates";
import { ref } from "vue";

const props = defineProps(datePickerProps);
const emit = defineEmits(datePickerEmits);

const initialDates = ref<InitialDate>(props.initialDates);
</script>
