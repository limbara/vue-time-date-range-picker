<template>
  <div class="vdpr-datepicker__calendar-input-date">
    {{ formattedValue }}
    {{ props.timestamp }}
    <input class="vdpr-datepicker__calendar-input-date-elem" type="text" :class="inputClass" :value="formattedValue"
      @change="onChange" />
  </div>
</template>

<script lang="ts" setup>
import DateUtil from '@utils/DateUtil';
import { calendarInputDateEmits, calendarInputDateProps } from './types';
import { computed, toRef } from 'vue';

const props = defineProps(calendarInputDateProps)
const emit = defineEmits(calendarInputDateEmits)

const localTimestamp = toRef(props, 'timestamp', 0)

const dateUtil = computed(() => {
  return new DateUtil(props.language)
})

const formattedValue = computed(() => {
  if (localTimestamp.value === 0) return ''

  const date = (dateUtil.value as any).fromUnix(localTimestamp.value)
  return (dateUtil.value as any).formatDate(date, props.format)
})

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const lastDate = (dateUtil.value as any).fromUnix(localTimestamp)
  const lastTime = (dateUtil.value as any).formatDate(lastDate, "HH:mm:ss")
  const date = (dateUtil.value as any).createDate(`${target.value} ${lastTime}`, `${props.format} HH:mm:ss`)

  if (!(dateUtil.value as any).isValidDate(date)) {
    return false
  }

  emit('change', date)
}
</script>
