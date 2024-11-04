<template>
  <div>
    <h2>Example Inline</h2>
    <pre>
      {
        inline: true,
      }
    </pre>
    <div>Value {{ value }}</div>
    <br /><br />
    <button @click="toggleInline">Toogle Inline</button>
    <br />
    <br />
    <date-picker
      :dateInput="dateInput"
      :inline="inline"
      :showHelperButtons="true"
      @select-date="(...params) => (initialDates = params)"
      @date-applied="(...params) => (initialDates = params)"
      @on-reset="() => (initialDates = [null, null])"
    />
    <p>I'm Below</p>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import DatePicker from "./StatefullDatepicker.vue";
import { InitialDate } from "@composables/useSelectedDates";

const dateInput = {
  placeholder: "Select Date",
  id: "my_date_input",
};

const inline = ref(true);

const initialDates = ref<InitialDate>([null, null]);

const value = computed(() => initialDates.value?.map(x => x?.toString()))

const toggleInline = () => {
  inline.value = !inline.value;
};
</script>
