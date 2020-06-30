<template>
  <label class="vdpr-datepicker__switch">
    <input
      type="checkbox"
      :checked="checked"
      @click="onClick"
      />
    <span class="vdpr-datepicker__switch-slider"></span>
  </label>
</template>

<script>
export default {
  props: {
    checked: Boolean,
  },
  methods: {
    onClick() {
      this.$emit('onCheckChange', !this.checked);
    },
  },
};
</script>
