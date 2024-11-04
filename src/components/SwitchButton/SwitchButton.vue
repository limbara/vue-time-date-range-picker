<template>
  <label class="vdpr-datepicker__switch">
    <input
      type="checkbox"
      :checked="checked"
      @change="(e) => emit('change', e)"
    />
    <span class="vdpr-datepicker__switch-slider"></span>
  </label>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { switchButtonEmits, switchButtonProps } from "./types";

defineProps(switchButtonProps);

const emit = defineEmits(switchButtonEmits);
</script>
