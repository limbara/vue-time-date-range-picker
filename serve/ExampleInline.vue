<template>
  <div>
    <h2>Example Inline</h2>
    <pre>
      {
        inline: true,
      }
    </pre>
    <button @click="toogleInline">Toogle Inline</button>
    <br />
    <br />
    <date-picker :dateInput="dateInput" :inline="inline" :showHelperButtons="true" />
    <p>I'm Below</p>
  </div>
</template>

<script>
import DatePicker from '../src/components/DatePicker.vue';

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      dateInput: {
        placeholder: 'Select Date',
        id: 'my_date_input',
      },
      inline: true,
    };
  },
  methods: {
    toogleInline() {
      this.inline = !this.inline;
    },
  },
};
</script>
