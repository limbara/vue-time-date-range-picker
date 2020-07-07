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
    <example-inline />
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
import ExampleInline from './ExampleInline.vue';

export default {
  components: {
    ExampleEvents,
    ExampleDisabledDates,
    ExampleHelperButtons,
    ExampleTimeInputConfig,
    ExampleDateFormat,
    ExampleInitialDates,
    ExampleLanguage,
    ExampleInline,
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
