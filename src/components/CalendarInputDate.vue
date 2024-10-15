<template>
  <div class="vdpr-datepicker__calendar-input-date">
    <input
      class="vdpr-datepicker__calendar-input-date-elem"
      type="text"
      :class="inputClass"
      :value="formattedValue"
      @change="onChange"
    />
  </div>
</template>

<script>
import DateUtil from '@utils/DateUtil';

export default {
  props: {
    inputClass: [String, Object, Array],
    timestamp: Number,
    format: String,
    language: String,
  },
  data() {
    return {
      copyTimestamp: this.timestamp,
    };
  },
  emits: [
    'on-change',
  ],
  watch: {
    timestamp(value) {
      this.copyTimestamp = value;
    },
  },
  computed: {
    dateUtil() {
      return new DateUtil(this.language);
    },
    formattedValue() {
      if (this.copyTimestamp === 0) return '';

      const date = this.dateUtil.fromUnix(this.copyTimestamp);

      return this.dateUtil.formatDate(date, this.format);
    },
  },
  methods: {
    onChange(e) {
      const lastDate = this.dateUtil.fromUnix(this.copyTimestamp);
      const lastTime = this.dateUtil.formatDate(lastDate, 'HH:mm:ss');
      const date = this.dateUtil.createDate(`${e.target.value} ${lastTime}`, `${this.format} HH:mm:ss`);

      if (!this.dateUtil.isValidDate(date)) {
        return false;
      }

      return this.$emit('on-change', date);
    },
  },
};
</script>
