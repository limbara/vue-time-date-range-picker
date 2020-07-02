<template>
  <div>
    <h2>Example Languange</h2>
    <pre>
      {
        language: 'fr'
      }
    </pre>
    <date-picker :dateInput="dateInput" language="fr" />
    <br />
    <pre>
      {
        language: 'id'
      }
    </pre>
    <date-picker :dateInput="dateInput" language="id" />
  </div>
</template>

<script>
import DatePicker from '../src/Components/DatePicker.vue';

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      dateInput: {
        placeholder: 'Select Date',
      },
    };
  },
};
</script>
