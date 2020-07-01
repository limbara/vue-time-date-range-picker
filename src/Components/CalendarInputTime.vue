<template>
  <div class="vdpr-datepicker__calendar-input-time">
    <input
      class="vdpr-datepicker__calendar-input-time-elem"
      type="text"
      :id="id"
      :name="name"
      :class="inputClass"
      :value="formattedValue"
    />
    <div class="vdpr-datepicker__calendar-input-time-control">
      <span
        class="vdpr-datepicker__calendar-input-time-control-up"
        @click="onClickUp">
        &#9652;
      </span>
      <span
        class="vdpr-datepicker__calendar-input-time-control-down"
        @click="onClickDown">
        &#9662;
      </span>
    </div>
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
    language: String,
  },
  data() {
    return {
      copyTimestamp: this.timestamp,
      dateUtil: new DateUtil(this.language),
    };
  },
  computed: {
    formattedValue() {
      if (this.copyTimestamp === 0) return '';

      return this.dateUtil.formatDate(this.dateUtil.fromUnix(this.copyTimestamp), 'HH:mm');
    },
  },
  watch: {
    timestamp(value) {
      this.copyTimestamp = value;
    },
  },
  methods: {
    onClickUp() {
      this.copyTimestamp += 3600;
    },
    onClickDown() {
      this.copyTimestamp -= 3600;
    },
  },
  mounted() {
  },
};
</script>
