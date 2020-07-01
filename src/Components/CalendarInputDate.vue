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
      input: this.inputValue,
      dateUtil: new DateUtil(this.language),
    };
  },
  computed: {
    formattedValue() {
      if (!this.timestamp) return '';

      const date = this.dateUtil.fromUnix(this.timestamp);

      return this.dateUtil.formatDate(date, this.format);
    },
  },
  methods: {
    onSubmit(e) {
      this.$emit('onSubmit', e.target.value);
    },
  },
};
</script>
