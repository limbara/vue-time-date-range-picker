<template>
  <div>
    <input :id="id" :type="type" :ref="refName" :name="name" :placeholder="placeholder" :required="required"
      :value="formattedValue" :class="inputClass" @click="onClick" readonly />
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: true,
}
</script>

<script lang="ts" setup>
import DateUtil from '@utils/DateUtil';
import { dateInputEmits, dateInputProps } from './types';
import { computed } from 'vue';

const props = defineProps(dateInputProps)
const emit = defineEmits(dateInputEmits)

const dateUtil = computed(() => new DateUtil(props.language))
const formattedValue = computed(() => {
  if (!props.selectedStartDate || !props.selectedEndDate) return '';

  if (
    dateUtil.value.isSameDate(props.selectedStartDate, props.selectedEndDate)
  ) {
    const date1 = dateUtil.value.formatDate(
      props.selectedStartDate,
      props.sameDateFormat.from,
    );

    const date2 = dateUtil.value.formatDate(
      props.selectedEndDate,
      props.sameDateFormat.to,
    );

    return `${date1} - ${date2}`;
  }

  const date1 = dateUtil.value.formatDate(
    props.selectedStartDate,
    props.format,
  );

  const date2 = dateUtil.value.formatDate(props.selectedEndDate, props.format);

  return `${date1} - ${date2}`;
})

const onClick = (e: Event) => {
  emit('click', e)
}
</script>
