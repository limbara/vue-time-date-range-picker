<template>
  <div class="vdpr-datepicker__calendar-input-date">
    <input
      ref="inputDateRef"
      class="vdpr-datepicker__calendar-input-date-elem"
      type="text"
      :class="inputClass"
      :value="formattedValue"
      @change="onChange"
    />
  </div>
</template>

<script lang="ts">
export default {};
</script>

<script lang="ts" setup>
import DateUtil from "@utils/DateUtil";
import { calendarInputDateEmits, calendarInputDateProps } from "./types";
import { computed } from "vue";

const props = defineProps(calendarInputDateProps);
const emit = defineEmits(calendarInputDateEmits);

const dateUtil = computed(() => {
  return new DateUtil(props.language);
});

const formattedValue = computed(() => {
  if (props.timestamp === 0) return;

  const date = dateUtil.value.fromUnix(props.timestamp);
  return dateUtil.value.formatDate(date, props.format);
});

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement;

  let lastTime = "00:00:00";

  if (props.timestamp !== 0) {
    const lastDateTime = dateUtil.value.fromUnix(props.timestamp);

    lastTime = dateUtil.value.formatDate(lastDateTime, "HH:mm:ss");
  }

  const date = dateUtil.value.createDate(
    `${target.value} ${lastTime}`,
    `${props.format} HH:mm:ss`
  );

  if (!dateUtil.value.isValidDate(date)) {
    return;
  }

  return emit("change", date);
};
</script>
