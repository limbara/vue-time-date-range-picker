<template>
  <label class="vdpr-datepicker__switch">
    <input type="checkbox" :checked="checked" @click="onClick" />
    <span class="vdpr-datepicker__switch-slider"></span>
  </label>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script lang="ts" setup>


const props = defineProps
</script>
