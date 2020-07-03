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
    sameDateFormat: Object,
    language: String,
    selectedStartDate: Date,
    selectedEndDate: Date,
  },
  data() {
    return {
      dateUtil: new DateUtil(this.language),
    };
  },
  computed: {
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
