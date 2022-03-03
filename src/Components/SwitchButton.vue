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
  emits: [
    'on-check-change',
  ],
  methods: {
    onClick() {
      this.$emit('on-check-change', !this.checked);
    },
  },
};
</script>
