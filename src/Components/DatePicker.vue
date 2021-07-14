<template>
  <div class="vdpr-datepicker">
    <date-input
      :type="showingDateInput ? 'text' : 'hidden'"
      :language="language"
      :selectedStartDate="selectedStartDate"
      :selectedEndDate="selectedEndDate"
      :format="format"
      :sameDateFormat="sameDateFormat"
      :refName="dateInput.refName"
      :inputClass="dateInput.inputClass"
      :name="dateInput.name"
      :id="dateInput.id"
      :placeholder="dateInput.placeholder"
      :required="dateInput.required"
      @on-click="onClickDateInput"
    />
    <calendar-dialog
      v-show="showingCalendarDialog"
      :language="language"
      :inline="inline"
      :initialDates="initialDates"
      :disabledDates="disabledDates"
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
      @select-date="selectDate"
      @select-disabled-date="selectDisabledDate"
      @on-prev-calendar="onPrevCalendar"
      @on-next-calendar="onNextCalendar"
    />
  </div>
</template>

<script setup>
import PropsValidator from '../Utils/PropsValidator';
import DateUtil from '../Utils/DateUtil';
import DateInput from './DateInput.vue';
import CalendarDialog from './CalendarDialog.vue';

import { computed, toRefs, ref } from 'vue';

  const props = defineProps({
    initialDates: {
      type: Array,
      validator: PropsValidator.isValidInitialDate,
      default() {
        return [];
      },
    },
    inline: {
      type: Boolean,
      default: false,
    },
    language: {
      type: String,
      default: 'en',
    },
    format: {
      type: String,
      default: 'DD/MM/YYYY HH:mm',
    },
    sameDateFormat: {
      type: Object,
      validator: PropsValidator.isValidSameDateFormat,
      default() {
        return {
          from: 'DD/MM/YYYY, HH:mm',
          to: 'HH:mm',
        };
      },
    },
    dateInput: {
      type: Object,
      default() {
        return {};
      },
    },
    disabledDates: Object,
    showHelperButtons: Boolean,
    helperButtons: Array,
    calendarDateInput: Object,
    calendarTimeInput: Object,
    switchButtonLabel: String,
    switchButtonInitial: Boolean,
    applyButtonLabel: String,
    resetButtonLabel: String,
    isMondayFirst: Boolean,
  });

  const { inline } = toRefs(props);
  const showCalendarDialog = ref(inline.value);

  const [fromDate, toDate] = props.initialDates;
  const selectedStartDate = ref(fromDate ?? null);
  const selectedEndDate = ref(toDate ?? null);

  const dateUtil = computed(() => new DateUtil(props.language));
  const showingDateInput = computed(() => !props.inline);
  const showingCalendarDialog = computed(() => showCalendarDialog.value || props.inline);

  const onApply = (date1, date2) => {
    if (!date1 || !date2) return false;

    selectedStartDate.value = date1;
    selectedEndDate.value = date2;

    if (!props.inline) {
      showCalendarDialog.value = false;
    }

    return emit('date-applied', date1, date2);
  };

  const onReset = () => {
    selectedStartDate.value = null;
    selectedEndDate.value = null;
  };

  const onClickDateInput = () => {
    if (props.inline) return;

    showCalendarDialog.value = !showCalendarDialog.value;

    if (showCalendarDialog.value) {
      datePickerOpened();
    } else {
      datePickerClosed();
    }
  };

  const emit = defineEmit([
    'on-prev-calendar',
    'on-next-calendar',
    'select-disabled-date',
    'select-date',
    'datepicker-opened',
    'datepicker-closed',
    'date-applied'
  ]);

  const datePickerClosed = () => emit('datepicker-closed');
  const datePickerOpened = () => emit('datepicker-opened');
  const onPrevCalendar = () => emit('on-prev-calendar');
  const onNextCalendar = () => emit('on-next-calendar');
  const selectDate = (date1, date2) => emit('select-date', date1, date2);
  const selectDisabledDate = (date) => emit('select-disabled-date', date);
</script>

<style lang="scss">
  @import "../Styles/DatePicker.scss";
</style>
