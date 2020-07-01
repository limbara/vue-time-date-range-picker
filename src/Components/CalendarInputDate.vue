<template>
  <div class="vdpr-datepicker__calendar-input-date">
    <input
      class="vdpr-datepicker__calendar-input-date-elem"
      type="text"
      :id="id"
      :name="name"
      :class="inputClass"
      :value="formattedValue"
      @keyup.enter="onSubmit"
    />
  </div>
</template>

<script>
import DateUtil from '../Utils/DateUtil';

export default {
  props: {
    id: String,
    name: String,
    inputClass: [String, Object, Array],
    timestamp: Number,
    format: String,
    language: String,
  },
  data() {
    return {
      copyTimestamp: this.timestamp,
      dateUtil: new DateUtil(this.language),
    };
  },
  watch: {
    timestamp(value) {
      this.copyTimestamp = value;
    },
  },
  computed: {
    formattedValue() {
      if (this.copyTimestamp === 0) return '';

      const date = this.dateUtil.fromUnix(this.copyTimestamp);

      return this.dateUtil.formatDate(date, this.format);
    },
  },
  methods: {
    onSubmit(e) {
      const date = this.dateUtil.createDate(e.target.value, this.format);

      if (!this.dateUtil.isValidDate(date)) {
        return false;
      }

      return this.$emit('onChange', date);
    },
  },
};
</script>
