<template>
  <div class="vdpr-datepicker__calendar-input-time">
    <input
      class="vdpr-datepicker__calendar-input-time-elem"
      type="text"
      :class="inputClass"
      :value="formattedValue"
      :readonly="readonly"
      @keyup.enter="onSubmit"
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

<script>
import DateUtil from '../Utils/DateUtil';

export default {
  props: {
    inputClass: [String, Object, Array],
    readonly: Boolean,
    timestamp: Number,
    language: String,
    step: Number,
  },
  data() {
    return {
      copyTimestamp: this.timestamp,
      format: 'HH:mm',
    };
  },
  computed: {
    dateUtil() {
      return new DateUtil(this.language);
    },
    formattedValue() {
      if (this.copyTimestamp === 0) return '';

      return this.dateUtil.formatDate(
        this.dateUtil.fromUnix(this.copyTimestamp),
        this.format,
      );
    },
  },
  watch: {
    timestamp(value) {
      this.copyTimestamp = value;
    },
  },
  methods: {
    onClickUp() {
      if (this.copyTimestamp === 0) return false;

      this.copyTimestamp += this.step * 60;

      return this.$emit(
        'on-change',
        this.dateUtil.fromUnix(this.copyTimestamp),
      );
    },
    onClickDown() {
      if (this.copyTimestamp === 0) return false;

      this.copyTimestamp -= this.step * 60;

      return this.$emit(
        'on-change',
        this.dateUtil.fromUnix(this.copyTimestamp),
      );
    },
    onSubmit(e) {
      let [hours, minutes] = e.target.value.trim().split(':');
      hours = parseInt(hours, 10);
      minutes = parseInt(minutes, 10);

      // eslint-disable-next-line no-restricted-globals
      if (isNaN(hours) || isNaN(minutes)) {
        return false;
      }

      const totalMinutes = hours * 60 + minutes;
      const startOfDate = this.dateUtil.startOf(
        this.dateUtil.fromUnix(this.copyTimestamp),
        'd',
      );
      const date = this.dateUtil.add(startOfDate, totalMinutes, 'm');

      return this.$emit('on-submit', date);
    },
  },
};
</script>
