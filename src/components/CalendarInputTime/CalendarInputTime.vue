<template>
  <div class="vdpr-datepicker__calendar-input-time">
    <input class="vdpr-datepicker__calendar-input-time-elem" type="text" :class="inputClass" :value="formattedValue"
      :readonly="readonly" @change="onChange" />
    <div class="vdpr-datepicker__calendar-input-time-control">
      <span class="vdpr-datepicker__calendar-input-time-control-up" @click="onClickUp">
        &#9650;
      </span>
      <span class="vdpr-datepicker__calendar-input-time-control-down" @click="onClickDown">
        &#9660;
      </span>
    </div>
  </div>
</template>

<script lang="ts">
export default {

}
</script>

<script lang="ts" setup>
import DateUtil from '@utils/DateUtil';
import { calendarInputTimeEmits, calendarInputTimeProps } from './types';
import { computed } from 'vue';

const props = defineProps(calendarInputTimeProps)
const emit = defineEmits(calendarInputTimeEmits)

const dateUtil = computed(() => {
  return new DateUtil(props.language)
})

const formattedValue = computed(() => {
  if (props.timestamp === 0) return ''

  const date = (dateUtil.value as any).fromUnix(props.timestamp)
  return (dateUtil.value as any).formatDate(date, "HH:mm")
})

const onClickUp = () => {
  if (props.timestamp === 0) return

  const date = (dateUtil.value as any).fromUnix(props.timestamp + props.step * 60)

  emit('change', date)
}

const onClickDown = () => {
  if (props.timestamp === 0) return

  const date = (dateUtil.value as any).fromUnix(props.timestamp - props.step * 60)

  emit('change', date)
}

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const [hourString, minuteString] = target.value.trim().split(':');

  const hours = parseInt(hourString, 10);
  const minutes = parseInt(minuteString, 10);

  if (isNaN(hours) || isNaN(minutes)) {
    return false;
  }

  const totalMinutes = hours * 60 + minutes;
  const startOfDate = (dateUtil.value as any).startOf(
    (dateUtil.value as any).fromUnix(props.timestamp),
    'd',
  );
  const date = (dateUtil.value as any).add(startOfDate, totalMinutes, 'm');

  emit('change', date)
}
</script>
