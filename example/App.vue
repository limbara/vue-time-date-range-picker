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
    <example-helper-buttons />
    <br />
    <example-time-input-config />
    <br />
    <example-date-format />
    <br />
    <example-initial-dates />
    <br />
  </div>
</template>

<script>
import ExampleEvents from './ExampleEvents.vue';
import ExampleDisabledDates from './ExampleDisabledDates.vue';
import ExampleHelperButtons from './ExampleHelperButtons.vue';
import ExampleTimeInputConfig from './ExampleTimeInputConfig.vue';
import ExampleDateFormat from './ExampleDateFormat.vue';
import ExampleInitialDates from './ExampleInitialDates.vue';
import ExampleLanguage from './ExampleLanguage.vue';

export default {
  components: {
    ExampleEvents,
    ExampleDisabledDates,
    ExampleHelperButtons,
    ExampleTimeInputConfig,
    ExampleDateFormat,
    ExampleInitialDates,
    ExampleLanguage,
  },
};
</script>

<style lang="scss">
.app {
  width: 80%;
  margin: 0 auto;
}

h2 {
  margin-left: -20px;
}
</style>
