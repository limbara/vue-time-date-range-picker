<script setup lang="ts">
import DatePicker from "@components/DatePicker/DatePicker.vue";
import StatefullDatepicker from "./StatefullDatepicker.vue";
import ExampleEvents from "./ExampleEvents.vue";
import ExampleDisabledDates from "./ExampleDisabledDates.vue";
import ExampleAvailableDates from "./ExampleAvailableDates.vue";
import ExampleHelperButtons from "./ExampleHelperButtons.vue";
import ExampleTimeInputConfig from "./ExampleTimeInputConfig.vue";
import ExampleDateInputConfig from "./ExampleDateInputConfig.vue";
import ExampleDateFormat from "./ExampleDateFormat.vue";
import ExampleInitialDates from "./ExampleInitialDates.vue";
import ExampleLanguage from "./ExampleLanguage.vue";
import ExampleInline from "./ExampleInline.vue";
import ExampleIsMondayFirst from "./ExampleIsMondayFirst.vue";
import { ref } from "vue";
import { ModelValue } from "@components/DatePicker/types";

const modelValue = ref<ModelValue>();
</script>

<template>
  <div>
    <div>v-model value is : {{ modelValue?.map(v => v?.toString()) }}</div>
    <date-picker v-model="modelValue" />
    <br /><br />
    <statefull-datepicker />
    <br /><br />
    <example-initial-dates />
    <br /><br />
    <example-language />
    <br /><br />
    <example-events />
    <br /><br />
    <example-disabled-dates />
    <br /><br />
    <example-available-dates />
    <br /><br />
    <example-helper-buttons />
    <br /><br />
    <example-time-input-config />
    <br /><br />
    <example-date-input-config />
    <br /><br />
    <example-date-format />
    <br /><br />
    <example-initial-dates />
    <br /><br />
    <example-is-monday-first />
    <br /><br />
    <example-inline />
  </div>
</template>
