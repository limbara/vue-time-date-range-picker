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

<script setup>
  const props = defineProps({
    checked: Boolean,
  });

  const emit = defineEmit(['on-check-change']);

  const onClick = () => emit('on-check-change', !props.checked);
</script>
