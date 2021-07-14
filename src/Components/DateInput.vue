<template>
  <div>
    <input
      :id="id"
      :type="type"
      :ref="refName"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :value="formattedValue"
      :class="inputClass"
      @click="onClick"
      readonly
    />
  </div>
</template>

<script setup>
  import { computed } from 'vue';

  import DateUtil from '../Utils/DateUtil';

  const props = defineProps({
    inputClass: [String, Object, Array],
    refName: String,
    name: String,
    type: String,
    placeholder: String,
    id: String,
    required: Boolean,
    format: String,
    sameDateFormat: Object,
    language: String,
    selectedStartDate: Date,
    selectedEndDate: Date,
  });

  const emit = defineEmit(['on-click']);

  const dateUtil = computed(() => {
    return new DateUtil(props.language);
  });

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
  });

  const onClick = () => emit('on-click', true);
</script>
