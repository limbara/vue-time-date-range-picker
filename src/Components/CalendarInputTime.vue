<template>
  <div class="vdpr-datepicker__calendar-input-time">
    <input
      class="vdpr-datepicker__calendar-input-time-elem"
      type="text"
      :class="inputClass"
      :value="formattedValue"
      :readonly="readonly"
      @change="onChange"
    />
    <div class="vdpr-datepicker__calendar-input-time-control">
      <span
        class="vdpr-datepicker__calendar-input-time-control-up"
        @click="onClickUp">
      &#9650;
      </span>
      <span
        class="vdpr-datepicker__calendar-input-time-control-down"
        @click="onClickDown">
        &#9660;
      </span>
    </div>
  </div>
</template>

<script setup>
  import DateUtil from '../Utils/DateUtil';
  import { computed, toRefs, ref, watch } from 'vue';

  const props = defineProps({
    inputClass: [String, Object, Array],
    readonly: Boolean,
    timestamp: Number,
    language: String,
    step: Number,
  });

  const emit = defineEmit(['on-change']);

  const { timestamp } = toRefs(props);

  const format = 'HH:mm';

  const dateUtil = computed(() => {
    return new DateUtil(props.language);
  });

  const formattedValue = computed(() => {
    if (timestamp.value === 0) return '';

    return dateUtil.value.formatDate(
      dateUtil.value.fromUnix(timestamp.value),
      format,
    );
  });

  const onClickUp = () => {
    if (timestamp.value === 0) return false;

    timestamp.value += props.step * 60;

    return emit(
      'on-change',
      dateUtil.value.fromUnix(timestamp.value),
    );
  };

  const onClickDown = () => {
    if (timestamp.value === 0) return false;

    timestamp.value -= props.step * 60;

    return emit(
      'on-change',
      dateUtil.value.fromUnix(timestamp.value),
    );
  };

  const onChange = (e) => {
    let [hours, minutes] = e.target.value.trim().split(':');
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(hours) || isNaN(minutes)) {
      return false;
    }

    const totalMinutes = hours * 60 + minutes;
    const startOfDate = dateUtil.value.startOf(
      dateUtil.value.fromUnix(timestamp.value),
      'd',
    );
    const date = dateUtil.value.add(startOfDate, totalMinutes, 'm');

    return emit('on-change', date);
  };
</script>
