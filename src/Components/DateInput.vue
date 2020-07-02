<template>
  <div>
    <input
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :value="formattedValue"
      :class="inputClass"
      @click="onClick"
      type="text"
      ref="dateinput"
      readonly
    />
  </div>
</template>

<script>
import DateUtil from '../Utils/DateUtil';

export default {
  props: {
    inputClass: [String, Object, Array],
    name: String,
    placeholder: String,
    id: String,
    required: Boolean,
    format: String,
    language: String,
    selectedStartDate: Date,
    selectedEndDate: Date,
  },
  data() {
    return {
      inputElem: null,
      dateUtil: new DateUtil(this.language),
    };
  },
  computed: {
    formattedValue() {
      const {
        selectedStartDate, selectedEndDate, format, dateUtil,
      } = this;

      if (!selectedStartDate || !selectedEndDate) return '';

      if (dateUtil.isSameDate(selectedStartDate, selectedEndDate)) {
        return dateUtil.formatDate(selectedStartDate, format);
      }

      const date1 = dateUtil.formatDate(selectedStartDate, format);
      const date2 = dateUtil.formatDate(selectedEndDate, format);

      return `${date1} - ${date2}`;
    },
  },
  methods: {
    onClick() {
      this.$emit('onClick', true);
    },
  },
  mounted() {
    this.inputElem = this.$refs.dateinput;
  },
};
</script>
