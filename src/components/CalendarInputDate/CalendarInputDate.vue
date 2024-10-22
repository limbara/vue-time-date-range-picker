<template>
  <div class="vdpr-datepicker__calendar-input-date">
    <input ref="inputDateRef" class="vdpr-datepicker__calendar-input-date-elem" type="text" :class="inputClass"
      :value="formattedValue" @change="onChange" />
  </div>
</template>

<script lang="ts">
export default {
  
}
</script>

<script lang="ts" setup>
import DateUtil from '@utils/DateUtil';
import { calendarInputDateEmits, calendarInputDateProps } from './types';
import { computed } from 'vue';

const props = defineProps(calendarInputDateProps)
const emit = defineEmits(calendarInputDateEmits)

const dateUtil = computed(() => {
  return new DateUtil(props.language)
})

const formattedValue = computed(() => {
  if (props.timestamp === 0) return

  const date = (dateUtil.value as any).fromUnix(props.timestamp)
  return (dateUtil.value as any).formatDate(date, props.format)
})

const onChange = (e: Event) => {
  if (props.timestamp === 0) return

  const target = e.target as HTMLInputElement
  const lastDate = (dateUtil.value as any).fromUnix(props.timestamp)
  const lastTime = (dateUtil.value as any).formatDate(lastDate, "HH:mm:ss")
  const date = (dateUtil.value as any).createDate(`${target.value} ${lastTime}`, `${props.format} HH:mm:ss`)

  if (!(dateUtil.value as any).isValidDate(date)) {
    return
  }

  return emit('change', date)
}
</script>
