<template>
  <div class="vdpr-datepicker">
    <date-input :type="showingDateInput ? 'text' : 'hidden'" :language="language" :selectedStartDate="selectedStartDate"
      :selectedEndDate="selectedEndDate" :format="format" :sameDateFormat="sameDateFormat" :refName="dateInput.refName"
      :inputClass="dateInput.inputClass" :name="dateInput.name" :id="dateInput.id" :placeholder="dateInput.placeholder"
      :required="dateInput.required" @click="onClickDateInput" />
    <calendar-dialog v-show="showingCalendarDialog" :language="language" :inline="inline" :initialDates="initialDates"
      :disabledDates="disabledDates" :availableDates="availableDates" :showHelperButtons="showHelperButtons"
      :helperButtons="helperButtons" :dateInput="calendarDateInput" :timeInput="calendarTimeInput"
      :switchButtonLabel="switchButtonLabel" :switchButtonInitial="switchButtonInitial"
      :applyButtonLabel="applyButtonLabel" :resetButtonLabel="resetButtonLabel" :isMondayFirst="isMondayFirst"
      @on-apply="onApply" @on-reset="onReset" @select-date="selectDate" @select-disabled-date="selectDisabledDate"
      @on-prev-calendar="onPrevCalendar" @on-next-calendar="onNextCalendar" />
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: true
}
</script>

<script lang="ts" setup>
import DateInput from '../DateInput/DateInput.vue';
import CalendarDialog from '../CalendarDialog/CalendarDialog.vue';
import { datePickerEmits, datePickerProps } from './types';
import { computed, ref } from 'vue';

const props = defineProps(datePickerProps)
const emit = defineEmits(datePickerEmits)

const showCalendarDialog = ref(props.inline)
const selectedStartDate = ref(props.initialDates?.at(0) ?? null)
const selectedEndDate = ref(props.initialDates?.at(1) ?? null)


const showingDateInput = computed(() => {
  return !props.inline;
})

const showingCalendarDialog = computed(() => {
  return showCalendarDialog.value || props.inline;
})

const onApply = (startDate, endDate) => {
  if (!startDate || !endDate) return false;

  selectedStartDate.value = startDate;
  selectedEndDate.value = endDate;

  if (!props.inline) {
    showCalendarDialog.value = false;
  }

  return emit('date-applied', startDate, endDate);
}

const onReset = (e: Event) => {
  selectedStartDate.value = null;
  selectedEndDate.value = null;

  emit('on-reset', e)
}

const onClickDateInput = () => {
  if (props.inline) return;

  showCalendarDialog.value = !showCalendarDialog.value;

  if (showCalendarDialog.value) {
    emit('datepicker-opened');
  } else {
    emit('datepicker-closed');
  }
}

const onPrevCalendar = (e: Event) => {
  emit('on-prev-calendar', e);
}

const onNextCalendar = (e: Event) => {
  emit('on-next-calendar', e)
}

const selectDate = (startDate: Date, endDate: Date) => {
  emit('select-date', startDate, endDate);
}

const selectDisabledDate = (date: Date) => {
  emit('select-disabled-date', date);
}
</script>

<style lang="scss">
@import "../../styles/DatePicker.scss";
</style>
