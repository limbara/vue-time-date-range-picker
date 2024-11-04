import DateUtil from "@utils/DateUtil";
import { isObjectDate, Nullable } from "@utils/helpers";
import { ToRefs } from "vue";
import { computed, ref } from "vue";

export type InitialDate = [Nullable<Date>, Nullable<Date>];

type UseDatePickerProps = ToRefs<{
  language: string;
  initialDates: InitialDate;
}>;

export const useSelectedDates = (props: UseDatePickerProps) => {
  const dateUtil = computed(() => {
    return new DateUtil(props.language.value);
  });

  const selectedStartDate = ref<Nullable<Date>>(
    props.initialDates.value?.[0] ?? null
  );
  const selectedEndDate = ref<Nullable<Date>>(
    props.initialDates.value?.[1] ?? null
  );

  const isAllDay = computed(() => {
    if (selectedStartDate.value && selectedEndDate.value) {
      return dateUtil.value.isAllDay(
        selectedStartDate.value,
        selectedEndDate.value
      );
    }

    return false;
  });

  const isDateHighlighted = computed(() => (date: Date) => {
    const hasStartDate = isObjectDate(selectedStartDate.value);
    const hasEndDate = isObjectDate(selectedEndDate.value);

    if (hasStartDate && hasEndDate)
      return dateUtil.value.isSameOrBetween(
        date,
        dateUtil.value.startOf(selectedStartDate.value!, "d"),
        dateUtil.value.startOf(selectedEndDate.value!, "d")
      );

    if (hasStartDate)
      return dateUtil.value.isSameDate(date, selectedStartDate.value!);

    if (hasEndDate)
      return dateUtil.value.isSameDate(date, selectedEndDate.value!);

    return false;
  });

  const setDates = (
    startDate: Nullable<Date>,
    endDate: Nullable<Date>
  ): { startDate: Nullable<Date>; endDate: Nullable<Date> } => {
    const selected = [
      dateUtil.value.isValidDate(startDate) ? startDate : null,
      dateUtil.value.isValidDate(endDate) ? endDate : null,
    ];

    if (
      selected[0] &&
      selected[1] &&
      dateUtil.value.isAfter(selected[0], selected[1])
    ) {
      [selected[0], selected[1]] = [selected[1], selected[0]];
    }

    [selectedStartDate.value, selectedEndDate.value] = selected;

    return {
      startDate: selectedStartDate.value,
      endDate: selectedEndDate.value,
    };
  };

  return {
    selectedStartDate,
    selectedEndDate,
    isAllDay,
    isDateHighlighted,
    setDates,
  };
};
