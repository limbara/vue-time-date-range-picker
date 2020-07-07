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

<script>
import DateUtil from '../Utils/DateUtil';

export default {
  props: {
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
  },
  computed: {
    dateUtil() {
      return new DateUtil(this.language);
    },
    formattedValue() {
      if (!this.selectedStartDate || !this.selectedEndDate) return '';

      if (
        this.dateUtil.isSameDate(this.selectedStartDate, this.selectedEndDate)
      ) {
        const date1 = this.dateUtil.formatDate(
          this.selectedStartDate,
          this.sameDateFormat.from,
        );

        const date2 = this.dateUtil.formatDate(
          this.selectedEndDate,
          this.sameDateFormat.to,
        );

        return `${date1} - ${date2}`;
      }

      const date1 = this.dateUtil.formatDate(
        this.selectedStartDate,
        this.format,
      );

      const date2 = this.dateUtil.formatDate(this.selectedEndDate, this.format);

      return `${date1} - ${date2}`;
    },
  },
  methods: {
    onClick() {
      this.$emit('on-click', true);
    },
  },
  mounted() {
  },
};
</script>
