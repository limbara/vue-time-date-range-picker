<template>
  <div class="vdpr-datepicker__calendar-dialog" :class="{
    'vdpr-datepicker__calendar-dialog--inline': this.inline,
  }">
    <div class="vdpr-datepicker__calendar-button-helper" v-if="helpers.length">
      <button v-for="btn in helpers" :key="'btn' + btn.name" :class="[
        'vdpr-datepicker__button',
        'vdpr-datepicker__button--block',
        'vdpr-datepicker__button-default',
      ]" @click="() => {
        onHelperClick(btn.from, btn.to);
      }
        ">
        {{ btn.name }}
      </button>
    </div>
    <calendar :language="language" :selectedStartDate="selectedStartDate" :selectedEndDate="selectedEndDate"
      :disabledDates="disabledDates" :availableDates="availableDates" :isMondayFirst="isMondayFirst"
      @select-date="selectDate" @select-disabled-date="selectDisabledDate" @on-prev-calendar="onPrevCalendar"
      @on-next-calendar="onNextCalendar" />
    <div class="vdpr-datepicker__calendar-actions">
      <div class="vdpr-datepicker__calendar-input-wrapper">
        <span>{{ switchButtonLabel }}</span>
        <switch-button :checked="isAllDay" @change="onCheckChange" />
      </div>
      <div class="vdpr-datepicker__calendar-input-wrapper">
        <span>{{ dateInput.labelStarts }}</span>
        <calendar-input-date :format="dateInput.format" :inputClass="dateInput.inputClass"
          :timestamp="unixSelectedStartDate" :language="language" @change="onStartInputDateChange" />
      </div>
      <div class="vdpr-datepicker__calendar-input-wrapper vdpr-datepicker__calendar-input-wrapper--end">
        <calendar-input-time v-show="isVisibleTimeInput" :step="timeInput.step" :readonly="timeInput.readonly"
          :inputClass="timeInput.inputClass" :timestamp="unixSelectedStartDate" @change="onTimeStartInputChange" />
      </div>
      <div class="vdpr-datepicker__calendar-input-wrapper">
        <span>{{ dateInput.labelEnds }}</span>
        <calendar-input-date :format="dateInput.format" :inputClass="dateInput.inputClass"
          :timestamp="unixSelectedEndDate" :language="language" @change="onEndDateInputDateChange" />
      </div>
      <div class="vdpr-datepicker__calendar-input-wrapper vdpr-datepicker__calendar-input-wrapper--end">
        <calendar-input-time v-show="isVisibleTimeInput" :step="timeInput.step" :readonly="timeInput.readonly"
          :inputClass="timeInput.inputClass" :timestamp="unixSelectedEndDate" @change="onTimeEndInputChange" />
      </div>
      <button v-show="isVisibleButtonApply" :class="[
        'vdpr-datepicker__button',
        'vdpr-datepicker__button--block',
        'vdpr-datepicker__button-submit',
      ]" @click="onClickButtonApply">
        {{ applyButtonLabel }}
      </button>
      <button :class="[
        'vdpr-datepicker__button',
        'vdpr-datepicker__button--block',
        'vdpr-datepicker__button-reset',
      ]" @click="onClickButtonReset">
        {{ resetButtonLabel }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script lang="ts" setup>
import DateUtil from '@utils/DateUtil';
import Calendar from '../Calendar/Calendar.vue';
import SwitchButton from '../SwitchButton/SwitchButton.vue';
import CalendarInputDate from '../CalendarInputDate/CalendarInputDate.vue';
import CalendarInputTime from '../CalendarInputTime/CalendarInputTime.vue';
import { calendarDialogEmits, calendarDialogProps } from './types';
import { computed, ref, } from 'vue';

const props = defineProps(calendarDialogProps)

const emit = defineEmits(calendarDialogEmits)

const dateUtil = computed(() => new DateUtil(props.language))

const selectedStartDate = ref<Date | undefined>(props.initialDates[0] ?? null)
const selectedEndDate = ref<Date | undefined>(props.initialDates[1] ?? null)

const isAllDay = ref(props.switchButtonInitial || dateUtil.value.isAllDay(props.initialDates[0], props.initialDates[1]))

const helpers = computed(() => {
  if (!props.showHelperButtons) return [];

  if (props.helperButtons.length) return props.helperButtons;

  return getDefaultHelpers();
})

const unixSelectedStartDate = computed(() => {
  if (!selectedStartDate.value) {
    return 0;
  }
  return dateUtil.value.toUnix(selectedStartDate.value);
})

const unixSelectedEndDate = computed(() => {
  if (!selectedEndDate.value) {
    return 0;
  }
  return dateUtil.value.toUnix(selectedEndDate.value);
})

const isVisibleTimeInput = computed(() => {
  return !isAllDay.value;
})

const isVisibleButtonApply = computed(() => {
  return !props.inline;
})

const onCheckChange = (e: Event) => {
  const check = (e.target as HTMLInputElement).checked

  isAllDay.value = check;

  if (!selectedStartDate.value || !selectedEndDate.value) return;

  selectedStartDate.value = dateUtil.value.startOf(
    selectedStartDate.value,
    'd',
  )
  if (check) {
    selectedEndDate.value = dateUtil.value.endOf(selectedEndDate.value, 'd');
  } else {
    selectedEndDate.value = dateUtil.value.startOf(selectedEndDate.value, 'd');
  }
}
const onStartInputDateChange = (value: Date) => {
  applyOrSwapApply(value, selectedEndDate.value);
  emitOnApplyIfInline();
}

const onEndDateInputDateChange = (value: Date) => {
  applyOrSwapApply(selectedStartDate.value, value);
  emitOnApplyIfInline();
}

const onTimeStartInputChange = (value: Date) => {
  applyOrSwapApply(value, selectedEndDate.value);
  emitOnApplyIfInline();
}
const onTimeEndInputChange = (value: Date) => {
  applyOrSwapApply(selectedStartDate.value, value);
  emitOnApplyIfInline();
}

const onHelperClick = (fromDate: Date, toDate: Date) => {
  if (dateUtil.value.isAllDay(fromDate, toDate)) {
    isAllDay.value = true;
  } else {
    isAllDay.value = false;
  }

  applyOrSwapApply(fromDate, toDate);
  emit('select-date', selectedStartDate.value, selectedEndDate.value);
  emitOnApplyIfInline();
}

const onClickButtonApply = () => {
  emit('on-apply', selectedStartDate.value, selectedEndDate.value);
}

const onClickButtonReset = (e: Event) => {
  selectedStartDate.value = null;
  selectedEndDate.value = null;
  isAllDay.value = false;

  emit('on-reset', e);
}

const selectDate = (date: Date) => {
  let startDate = selectedStartDate.value;
  let endDate = selectedEndDate.value;
  if (
    dateUtil.value.isValidDate(startDate)
    && dateUtil.value.isValidDate(endDate)
    && dateUtil.value.isSameDate(startDate, endDate)
  ) {
    endDate = date;
  } else {
    startDate = date;
    endDate = date;
  }

  applyOrSwapApply(startDate, endDate);

  if (isAllDay.value) {
    selectedStartDate.value = dateUtil.value.startOf(
      selectedStartDate.value,
      'd',
    );
    selectedEndDate.value = dateUtil.value.endOf(selectedEndDate.value, 'd');
  }

  emit('select-date', selectedStartDate.value, selectedEndDate.value);
  emitOnApplyIfInline();
}

const selectDisabledDate = (date: Date) => {
  emit('select-disabled-date', date);
}
const applyOrSwapApply = (startDate: Date, endDate: Date) => {
  if (dateUtil.value.isAfter(startDate, endDate)) {
    [selectedStartDate.value, selectedEndDate.value] = [endDate, startDate];
  } else {
    selectedStartDate.value = startDate;
    selectedEndDate.value = endDate;
  }
}

const emitOnApplyIfInline = () => {
  if (props.inline) {
    emit('on-apply', selectedStartDate.value, selectedEndDate.value);
  }
}

const getDefaultHelpers = () => {
  const now = new Date();
  const yesterday = dateUtil.value.subtract(now, 1, 'd');
  const lastWeek = dateUtil.value.subtract(now, 7, 'd');
  const lastMonth = dateUtil.value.subtract(now, 1, 'M');
  const lastYear = dateUtil.value.subtract(now, 1, 'y');
  const todayFrom = dateUtil.value.startOf(now, 'd');
  const todayTo = dateUtil.value.endOf(now, 'd');
  const yesterdayFrom = dateUtil.value.startOf(yesterday, 'd');
  const yesterdayTo = dateUtil.value.endOf(yesterday, 'd');
  const thisWeekFrom = dateUtil.value.startOf(now, 'week');
  const thisWeekTo = dateUtil.value.endOf(now, 'week');
  const lastWeekFrom = dateUtil.value.startOf(lastWeek, 'week');
  const lastWeekTo = dateUtil.value.endOf(lastWeek, 'week');
  const thisMonthFrom = dateUtil.value.startOf(now, 'month');
  const thisMonthTo = dateUtil.value.endOf(now, 'month');
  const lastMonthFrom = dateUtil.value.startOf(lastMonth, 'month');
  const lastMonthTo = dateUtil.value.endOf(lastMonth, 'month');
  const thisYearFrom = dateUtil.value.startOf(now, 'year');
  const thisYearTo = dateUtil.value.endOf(now, 'year');
  const lastYearFrom = dateUtil.value.startOf(lastYear, 'year');
  const lastYearTo = dateUtil.value.endOf(lastYear, 'year');

  return [
    {
      name: 'Today',
      from: todayFrom,
      to: todayTo,
    },
    {
      name: 'Yesterday',
      from: yesterdayFrom,
      to: yesterdayTo,
    },
    {
      name: 'This Week',
      from: thisWeekFrom,
      to: thisWeekTo,
    },
    {
      name: 'Last Week',
      from: lastWeekFrom,
      to: lastWeekTo,
    },
    {
      name: 'This Month',
      from: thisMonthFrom,
      to: thisMonthTo,
    },
    {
      name: 'Last Month',
      from: lastMonthFrom,
      to: lastMonthTo,
    },
    {
      name: 'This Year',
      from: thisYearFrom,
      to: thisYearTo,
    },
    {
      name: 'Last Year',
      from: lastYearFrom,
      to: lastYearTo,
    },
  ];
}

const onPrevCalendar = (e: Event) => {
  emit('on-prev-calendar', e);
}

const onNextCalendar = (e: Event) => {
  emit('on-next-calendar', e);
}
</script>

<style lang="scss">
@import '../../styles/CalendarDialog.scss';
</style>
