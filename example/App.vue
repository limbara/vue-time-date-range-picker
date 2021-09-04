<template>
  <div class="app">
    <example-initial-dates />
    <br />
    <example-language />
    <br />
    <example-events />
    <br />
    <example-disabled-dates />
    <br />
    <example-available-dates />
    <br />
    <example-helper-buttons />
    <br />
    <example-time-input-config />
    <br />
    <example-date-input-config />
    <br />
    <example-date-format />
    <br />
    <example-initial-dates />
    <br />
    <example-is-monday-first />
    <br />
    <example-inline />
  </div>
</template>

<script>
import ExampleEvents from './ExampleEvents.vue';
import ExampleDisabledDates from './ExampleDisabledDates.vue';
import ExampleAvailableDates from './ExampleAvailableDates.vue';
import ExampleHelperButtons from './ExampleHelperButtons.vue';
import ExampleTimeInputConfig from './ExampleTimeInputConfig.vue';
import ExampleDateInputConfig from './ExampleDateInputConfig.vue';
import ExampleDateFormat from './ExampleDateFormat.vue';
import ExampleInitialDates from './ExampleInitialDates.vue';
import ExampleLanguage from './ExampleLanguage.vue';
import ExampleInline from './ExampleInline.vue';
import ExampleIsMondayFirst from './ExampleIsMondayFirst.vue';

export default {
  components: {
    ExampleEvents,
    ExampleDisabledDates,
    ExampleAvailableDates,
    ExampleHelperButtons,
    ExampleTimeInputConfig,
    ExampleDateInputConfig,
    ExampleDateFormat,
    ExampleInitialDates,
    ExampleLanguage,
    ExampleInline,
    ExampleIsMondayFirst,
  },
};
</script>

<style lang="scss">
.app {
  padding: 40px;
}

h2 {
  margin-left: -20px;
}
</style>
