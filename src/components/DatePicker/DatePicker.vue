<template>
  <div class="vdpr-datepicker">
    <date-input
      :type="showingDateInput ? 'text' : 'hidden'"
      :language="language"
      :selectedStartDate="modelValue?.[0] ?? initialDates?.[0]"
      :selectedEndDate="modelValue?.[1] ?? initialDates?.[1]"
      :format="format"
      :sameDateFormat="sameDateFormat"
      :refName="dateInput.refName"
      :inputClass="dateInput.inputClass"
      :name="dateInput.name"
      :id="dateInput.id"
      :placeholder="dateInput.placeholder"
      :required="dateInput.required"
      @click="onClickDateInput"
    />
    <calendar-dialog
      v-show="showingCalendarDialog"
      :language="language"
      :inline="inline"
      :initialDates="modelValue ?? initialDates"
      :disabledDates="disabledDates"
      :availableDates="availableDates"
      :showHelperButtons="showHelperButtons"
      :helperButtons="helperButtons"
      :dateInput="calendarDateInput"
      :timeInput="calendarTimeInput"
      :switchButtonLabel="switchButtonLabel"
      :switchButtonInitial="switchButtonInitial"
      :applyButtonLabel="applyButtonLabel"
      :resetButtonLabel="resetButtonLabel"
      :isMondayFirst="isMondayFirst"
      @on-apply="onApply"
      @on-reset="onReset"
      @select-date="onSelectDate"
      @select-disabled-date="selectDisabledDate"
      @on-prev-calendar="onPrevCalendar"
      @on-next-calendar="onNextCalendar"
    />
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: true,
};
</script>

<script lang="ts" setup>
import DateInput from "../DateInput/DateInput.vue";
import CalendarDialog from "../CalendarDialog/CalendarDialog.vue";
import { datePickerEmits, datePickerProps } from "./types";
import { computed, ref } from "vue";
import { CalendarDialogEmits } from "@components/CalendarDialog/types";

const props = defineProps(datePickerProps);
const emit = defineEmits(datePickerEmits);

const showCalendarDialog = ref(props.inline);

const showingDateInput = computed(() => {
  return !props.inline;
});

const showingCalendarDialog = computed(() => {
  return showCalendarDialog.value || props.inline;
});

const onApply: CalendarDialogEmits["on-apply"] = (startDate, endDate) => {
  emit("update:model-value", [startDate, endDate]);

  if (startDate && endDate) {
    emit("date-applied", startDate, endDate);

    if (!props.inline) {
      showCalendarDialog.value = false;
    }
  }

  return true;
};

const onReset = (e: Event) => {
  emit("update:model-value", null);

  emit("on-reset", e);
};

const onClickDateInput = () => {
  if (props.inline) return;

  showCalendarDialog.value = !showCalendarDialog.value;

  if (showCalendarDialog.value) {
    emit("datepicker-opened");
  } else {
    emit("datepicker-closed");
  }
};

const onPrevCalendar = (e: Event) => {
  emit("on-prev-calendar", e);
};

const onNextCalendar = (e: Event) => {
  emit("on-next-calendar", e);
};

const onSelectDate: CalendarDialogEmits["select-date"] = (
  startDate,
  endDate
) => {
  emit("update:model-value", [startDate, endDate]);

  emit("select-date", startDate, endDate);
  
  return true;
};

const selectDisabledDate = (date: Date) => {
  emit("select-disabled-date", date);
};

defineExpose({
  showCalendarDialog,
});
</script>

<style lang="scss">
@import "../../styles/DatePicker.scss";
</style>
