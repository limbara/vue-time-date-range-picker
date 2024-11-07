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
      >
        {{ btn.name }}
      </button>
    </div>
    <calendar
      :language="language"
      :days="computedDays"
      :day-names="dayNames"
      :page-date="pageDate"
      :is-next-page-disabled="isNextPageDisabled"
      :is-prev-page-disabled="isPrevPageDisabled"
      @select-date="selectDate"
      @select-disabled-date="selectDisabledDate"
      @on-prev-calendar="onPrevCalendar"
      @on-next-calendar="onNextCalendar"
    />
    <div class="vdpr-datepicker__calendar-actions">
      <div class="vdpr-datepicker__calendar-input-wrapper">
        <span>{{ switchButtonLabel }}</span>
        <switch-button :checked="isAllDayChecked" @change="onCheckChange" />
      </div>
      <div class="vdpr-datepicker__calendar-input-wrapper">
        <span>{{ dateInput.labelStarts }}</span>
        <calendar-input-date
          :format="dateInput.format"
          :inputClass="dateInput.inputClass"
          :timestamp="unixSelectedStartDate"
          :language="language"
          @change="onStartInputDateChange"
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
          @change="onTimeStartInputChange"
        />
      </div>
      <div class="vdpr-datepicker__calendar-input-wrapper">
        <span>{{ dateInput.labelEnds }}</span>
        <calendar-input-date
          :format="dateInput.format"
          :inputClass="dateInput.inputClass"
          :timestamp="unixSelectedEndDate"
          :language="language"
          @change="onEndDateInputDateChange"
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
          @change="onTimeEndInputChange"
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
      >
        {{ applyButtonLabel }}
      </button>
      <button
        :class="[
          'vdpr-datepicker__button',
          'vdpr-datepicker__button--block',
          'vdpr-datepicker__button-reset',
        ]"
        @click="onClickButtonReset"
      >
        {{ resetButtonLabel }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import DateUtil from "@utils/DateUtil";
import Calendar from "../Calendar/Calendar.vue";
import SwitchButton from "../SwitchButton/SwitchButton.vue";
import CalendarInputDate from "../CalendarInputDate/CalendarInputDate.vue";
import CalendarInputTime from "../CalendarInputTime/CalendarInputTime.vue";
import { calendarDialogEmits, calendarDialogProps } from "./types";
import { computed, toRef } from "vue";
import { isObjectDate, Nullable } from "@utils/helpers";
import { InitialDate, useSelectedDates } from "@composables/useSelectedDates";
import { useCalendar } from "@composables/useCalendarDateUtil";
import { ref } from "vue";
import { ComputedDay } from "@components/Calendar/types";

const props = defineProps(calendarDialogProps);
const emit = defineEmits(calendarDialogEmits);

const dateUtil = computed(() => new DateUtil(props.language));

const {
  selectedStartDate,
  selectedEndDate,
  isAllDay,
  isDateHighlighted,
  setDates,
} = useSelectedDates({
  initialDates: toRef(props, "initialDates"),
  language: toRef(props, "language"),
});

const initialPageDate = ref(
  selectedStartDate.value ?? selectedEndDate.value ?? dateUtil.value.now()
);

const {
  pageDate,
  dayNames,
  days,
  isPrevPageDisabled,
  isNextPageDisabled,
  nextPage,
  prevPage,
  isDisabledDate,
} = useCalendar({
  isMondayFirst: toRef(props, "isMondayFirst"),
  language: toRef(props, "language"),
  availableDates: toRef(props, "availableDates"),
  disabledDates: toRef(props, "disabledDates"),
  pageDate: initialPageDate,
});

const computedDays = computed(() =>
  days.value.map<ComputedDay>((d) => {
    return {
      ...d,
      isDisabled: isDisabledDate.value(d.date),
      isHighlighted: isDateHighlighted.value(d.date),
    };
  })
);

const isAllDayChecked = ref(props.switchButtonInitial || isAllDay.value);

const helpers = computed(() => {
  if (!props.showHelperButtons) return [];

  if (props.helperButtons.length !== 0) return props.helperButtons;

  return getDefaultHelpers();
});

const unixSelectedStartDate = computed(() => {
  if (!selectedStartDate.value) {
    return 0;
  }
  return dateUtil.value.toUnix(selectedStartDate.value);
});

const unixSelectedEndDate = computed(() => {
  if (!selectedEndDate.value) {
    return 0;
  }
  return dateUtil.value.toUnix(selectedEndDate.value);
});

const isVisibleTimeInput = computed(() => {
  return !isAllDayChecked.value;
});

const isVisibleButtonApply = computed(() => {
  return !props.inline;
});

const onCheckChange = (e: Event) => {
  const check = (e.target as HTMLInputElement).checked;

  isAllDayChecked.value = check;

  if (!selectedStartDate.value || !selectedEndDate.value) return;

  const startDate = dateUtil.value.startOf(selectedStartDate.value, "d");

  if (check) {
    selectAndApplyIfInline(
      startDate,
      dateUtil.value.endOf(selectedEndDate.value, "d")
    );
  } else {
    selectAndApplyIfInline(
      startDate,
      dateUtil.value.startOf(selectedEndDate.value, "d")
    );
  }
};
const onStartInputDateChange = (value: Date) => {
  if (isDisabledDate.value(value)) {
    return emit("select-disabled-date", value);
  }

  selectAndApplyIfInline(value, selectedEndDate.value);
};

const onEndDateInputDateChange = (value: Date) => {
  if (isDisabledDate.value(value)) {
    return emit("select-disabled-date", value);
  }

  selectAndApplyIfInline(selectedStartDate.value, value);
};

const onTimeStartInputChange = (value: Date) => {
  if (isDisabledDate.value(value)) {
    return emit("select-disabled-date", value);
  }

  selectAndApplyIfInline(value, selectedEndDate.value);
};

const onTimeEndInputChange = (value: Date) => {
  if (isDisabledDate.value(value)) {
    return emit("select-disabled-date", value);
  }

  selectAndApplyIfInline(selectedStartDate.value, value);
};

const onHelperClick = (fromDate: Date, toDate: Date) => {
  if (isDisabledDate.value(fromDate)) {
    return emit("select-disabled-date", fromDate);
  }

  if (isDisabledDate.value(toDate)) {
    return emit("select-disabled-date", toDate);
  }

  selectAndApplyIfInline(fromDate, toDate);
};

const onClickButtonApply = () => {
  if (selectedStartDate.value && selectedEndDate.value) {
    emit("on-apply", selectedStartDate.value, selectedEndDate.value);
  }
};

const onClickButtonReset = (e: Event) => {
  setDates(null, null);
  emit("on-reset", e);
};

const selectDate = (date: Date) => {
  let [startDate, endDate]: InitialDate = [
    selectedStartDate.value,
    selectedEndDate.value,
  ];

  if (isObjectDate(startDate) && isObjectDate(endDate)) {
    if (dateUtil.value.isSameDate(startDate, endDate)) {
      if (dateUtil.value.isAfter(date, startDate)) {
        endDate = date;
      } else {
        startDate = date;
      }
    } else {
      startDate = date;
      endDate = date;
    }
  } else {
    [startDate, endDate] = [startDate ?? date, endDate ?? date];
  }

  if (isAllDayChecked.value) {
    startDate = dateUtil.value.startOf(startDate, "d");
    endDate = dateUtil.value.endOf(endDate, "d");
  }

  selectAndApplyIfInline(startDate, endDate);
};

const selectDisabledDate = (date: Date) => {
  emit("select-disabled-date", date);
};

const selectAndApplyIfInline = (
  startDate: Nullable<Date>,
  endDate: Nullable<Date>
) => {
  const selected = setDates(startDate, endDate);

  emit("select-date", selected.startDate, selected.endDate);

  if (props.inline && selected.startDate && selected.endDate) {
    emit("on-apply", selected.startDate, selected.endDate);
  }
};

const getDefaultHelpers = () => {
  const now = new Date();
  const yesterday = dateUtil.value.subtract(now, 1, "d");
  const lastWeek = dateUtil.value.subtract(now, 7, "d");
  const lastMonth = dateUtil.value.subtract(now, 1, "M");
  const lastYear = dateUtil.value.subtract(now, 1, "y");
  const todayFrom = dateUtil.value.startOf(now, "d");
  const todayTo = dateUtil.value.endOf(now, "d");
  const yesterdayFrom = dateUtil.value.startOf(yesterday, "d");
  const yesterdayTo = dateUtil.value.endOf(yesterday, "d");
  const thisWeekFrom = dateUtil.value.startOf(now, "week");
  const thisWeekTo = dateUtil.value.endOf(now, "week");
  const lastWeekFrom = dateUtil.value.startOf(lastWeek, "week");
  const lastWeekTo = dateUtil.value.endOf(lastWeek, "week");
  const thisMonthFrom = dateUtil.value.startOf(now, "month");
  const thisMonthTo = dateUtil.value.endOf(now, "month");
  const lastMonthFrom = dateUtil.value.startOf(lastMonth, "month");
  const lastMonthTo = dateUtil.value.endOf(lastMonth, "month");
  const thisYearFrom = dateUtil.value.startOf(now, "year");
  const thisYearTo = dateUtil.value.endOf(now, "year");
  const lastYearFrom = dateUtil.value.startOf(lastYear, "year");
  const lastYearTo = dateUtil.value.endOf(lastYear, "year");

  return [
    {
      name: "Today",
      from: todayFrom,
      to: todayTo,
    },
    {
      name: "Yesterday",
      from: yesterdayFrom,
      to: yesterdayTo,
    },
    {
      name: "This Week",
      from: thisWeekFrom,
      to: thisWeekTo,
    },
    {
      name: "Last Week",
      from: lastWeekFrom,
      to: lastWeekTo,
    },
    {
      name: "This Month",
      from: thisMonthFrom,
      to: thisMonthTo,
    },
    {
      name: "Last Month",
      from: lastMonthFrom,
      to: lastMonthTo,
    },
    {
      name: "This Year",
      from: thisYearFrom,
      to: thisYearTo,
    },
    {
      name: "Last Year",
      from: lastYearFrom,
      to: lastYearTo,
    },
  ];
};

const onPrevCalendar = (e: Event) => {
  if (prevPage()) {
    emit("on-prev-calendar", e);
  }
};

const onNextCalendar = (e: Event) => {
  if (nextPage()) {
    emit("on-next-calendar", e);
  }
};

defineExpose({
  selectedStartDate,
  selectedEndDate,
  isAllDayChecked,
  dayNames,
  days,
  isPrevPageDisabled,
  isNextPageDisabled,
  setDates,
  selectDate,
  nextPage,
  prevPage,
  getDefaultHelpers,
});
</script>

<style lang="scss">
@import "../../styles/CalendarDialog.scss";
</style>
