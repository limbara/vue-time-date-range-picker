<template>
  <div
    class="vdpr-datepicker__calendar-dialog"
    :class="{
      'vdpr-datepicker__calendar-dialog--inline': inline,
    }"
  >
    <div class="vdpr-datepicker__calendar-button-helper" v-if="helpers.length">
      <button
        v-for="btn in helpers"
        :key="'btn' + btn.name"
        :class="[
          'vdpr-datepicker__button',
          'vdpr-datepicker__button--block',
          'vdpr-datepicker__button-default',
        ]"
        @click="
          () => {
            onHelperClick(btn.from, btn.to);
          }
        "
      >{{ btn.name }}</button>
    </div>
    <calendar
      :language="language"
      :selectedStartDate="selectedStartDate"
      :selectedEndDate="selectedEndDate"
      :disabledDates="disabledDates"
      :isMondayFirst="isMondayFirst"
      @select-date="selectDate"
      @select-disabled-date="selectDisabledDate"
      @on-prev-calendar="onPrevCalendar"
      @on-next-calendar="onNextCalendar"
    />
    <div class="vdpr-datepicker__calendar-actions">
      <div class="vdpr-datepicker__calendar-input-wrapper">
        <span>{{ switchButtonLabel }}</span>
        <switch-button :checked="isAllDay" @on-check-change="onCheckChange" />
      </div>
      <div class="vdpr-datepicker__calendar-input-wrapper">
        <span>{{ dateInput.labelStarts }}</span>
        <calendar-input-date
          :format="dateInput.format"
          :inputClass="dateInput.inputClass"
          :timestamp="unixSelectedStartDate"
          :language="language"
          @on-change="onStartInputDateChange"
        />
      </div>
      <div
        class="vdpr-datepicker__calendar-input-wrapper vdpr-datepicker__calendar-input-wrapper--end"
      >
        <calendar-input-time
          v-show="isVisibleTimeInput"
          :step="timeInput.step"
          :readonly="timeInput.readonly"
          :inputClass="timeInput.inputClass"
          :timestamp="unixSelectedStartDate"
          @on-change="onTimeStartInputChange"
        />
      </div>
      <div class="vdpr-datepicker__calendar-input-wrapper">
        <span>{{ dateInput.labelEnds }}</span>
        <calendar-input-date
          :format="dateInput.format"
          :inputClass="dateInput.inputClass"
          :timestamp="unixSelectedEndDate"
          :language="language"
          @on-change="onEndDateInputDateChange"
        />
      </div>
      <div
        class="vdpr-datepicker__calendar-input-wrapper vdpr-datepicker__calendar-input-wrapper--end"
      >
        <calendar-input-time
          v-show="isVisibleTimeInput"
          :step="timeInput.step"
          :readonly="timeInput.readonly"
          :inputClass="timeInput.inputClass"
          :timestamp="unixSelectedEndDate"
          @on-change="onTimeEndInputChange"
        />
      </div>
      <button
        v-show="isVisibleButtonApply"
        :class="[
          'vdpr-datepicker__button',
          'vdpr-datepicker__button--block',
          'vdpr-datepicker__button-submit',
        ]"
        @click="onClickButtonApply"
      >{{ applyButtonLabel }}</button>
      <button
        :class="[
          'vdpr-datepicker__button',
          'vdpr-datepicker__button--block',
          'vdpr-datepicker__button-reset',
        ]"
        @click="onClickButtonReset"
      >{{ resetButtonLabel }}</button>
    </div>
  </div>
</template>

<script setup>
import PropsValidator from '../Utils/PropsValidator';
import DateUtil from '../Utils/DateUtil';
import Calendar from './Calendar.vue';
import SwitchButton from './SwitchButton.vue';
import CalendarInputDate from './CalendarInputDate.vue';
import CalendarInputTime from './CalendarInputTime.vue';

import { computed, ref } from 'vue';

  const props = defineProps({
    inline: {
      type: Boolean,
      default: false,
    },
    initialDates: {
      type: Array,
      validator: PropsValidator.isValidInitialDate,
      default() {
        return [];
      },
    },
    language: {
      type: String,
      default: 'en',
    },
    disabledDates: {
      type: Object,
      validator: PropsValidator.isValidDisabledDates,
      default() {
        return {};
      },
    },
    showHelperButtons: {
      type: Boolean,
      default: true,
    },
    helperButtons: {
      type: Array,
      validator: PropsValidator.isValidHelperButtons,
      default() {
        return [];
      },
    },
    timeInput: {
      type: Object,
      default() {
        return {
          inputClass: null,
          readonly: false,
          step: 60, // in minutes
        };
      },
    },
    dateInput: {
      type: Object,
      default() {
        return {
          labelStarts: 'Starts',
          labelEnds: 'Ends',
          inputClass: null,
          format: 'DD/MM/YYYY',
          readonly: false,
        };
      },
    },
    switchButtonLabel: {
      type: String,
      default: 'All Days',
    },
    switchButtonInitial: {
      type: Boolean,
      default: false,
    },
    applyButtonLabel: {
      type: String,
      default: 'Apply',
    },
    resetButtonLabel: {
      type: String,
      default: 'Reset',
    },
    isMondayFirst: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmit([
    'select-date',
    'select-disabled-date',
    'on-apply',
    'on-reset',
    'on-prev-calendar',
    'on-next-calendar'
  ]);

  const dateUtil = computed(() => {
    return new DateUtil(props.language);
  });

  const [from, to] = props.initialDates;

  const isAllDay = ref(props.switchButtonInitial);

  if (from && to) {
    if (dateUtil.value.isAllDay(from, to)) {
      isAllDay.value = true;
    } else {
      isAllDay.value = false;
    }
  }

  const selectedStartDate = ref(from ?? null);
  const selectedEndDate = ref(to ?? null);

  const helpers = computed(() => {
    if (!props.showHelperButtons) return [];

    if (props.helperButtons.length) return props.helperButtons;

    return getDefaultHelpers();
  });

  const unixSelectedStartDate = computed(() => {
    if (!selectedStartDate.value) {
      return 0;
    }
    return dateUtil.value.toUnix(selectedStartDate.value);
  })

  const unixSelectedEndDate = computed(() => {
    if (!selectedEndDate) {
      return 0;
    }
    return dateUtil.value.toUnix(selectedEndDate);
  });

  const isVisibleTimeInput = computed(() => {
    return !isAllDay.value;
  });

  const isVisibleButtonApply = computed(() => {
    return !props.inline;
  });


  // Methods


  const onCheckChange = (check) => {
    isAllDay.value = check;
    if (!selectedStartDate.value || !selectedEndDate.value) return;

    selectedStartDate.value = dateUtil.value.startOf(
      selectedStartDate.value,
      'd',
    );
    if (check) {
      selectedEndDate.value = dateUtil.value.endOf(selectedEndDate.value, 'd');
    } else {
      selectedEndDate.value = dateUtil.value.startOf(selectedEndDate.value, 'd');
    }
  }
  const onStartInputDateChange = (value) => {
    applyOrSwapApply(value, selectedEndDate.value);
    emitOnApplyIfInline();
  }
  const onEndDateInputDateChange = (value) => {
    applyOrSwapApply(selectedStartDate.value, value);
    emitOnApplyIfInline();
  }
  const onTimeStartInputChange = (value) => {
    applyOrSwapApply(value, selectedEndDate.value);
    emitOnApplyIfInline();
  }
  const onTimeEndInputChange = (value) => {
    applyOrSwapApply(selectedStartDate.value, value);
    emitOnApplyIfInline();
  }
  const onHelperClick = (fromDate, toDate) => {
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

  const onClickButtonReset = () => {
    selectedStartDate.value = null;
    selectedEndDate.value = null;
    isAllDay.value = false;

    emit('on-reset');
  }

  const selectDate = (date) => {
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
      selectedEndDate = dateUtil.value.endOf(selectedEndDate.value, 'd');
    }

    emit('select-date', selectedStartDate.value, selectedEndDate.value);
    emitOnApplyIfInline();
  }

  const selectDisabledDate = (date) => {
    emit('select-disabled-date', date);
  }

  const applyOrSwapApply = (startDate, endDate) => {
    if (dateUtil.value.isAfter(startDate, endDate)) {
      selectedStartDate.value = endDate;
      selectedEndDate.value = startDate;
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

  const onPrevCalendar = () => emit('on-prev-calendar');
  const onNextCalendar = () => emit('on-next-calendar');
</script>

<style lang="scss">
@import "../Styles/CalendarDialog.scss";
</style>
