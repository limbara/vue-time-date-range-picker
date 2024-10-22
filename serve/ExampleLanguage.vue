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
    <br />
    <h4>changing language</h4>
    <p>{{ displayLang }}</p>
    <ul>
      <li @click="changeLanguage('en')">
        <button>en</button>
      </li>
      <li @click="changeLanguage('id')">
        <button>id</button>
      </li>
      <li @click="changeLanguage('fr')">
        <button>fr</button>
      </li>
    </ul>
    <date-picker :language="language" :dateInput="dateInput" />
  </div>
</template>

<script>
import DatePicker from '@components/DatePicker/DatePicker.vue';

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      language: 'id',
      dateInput: {
        placeholder: 'Select Date',
      },
    };
  },
  computed: {
    displayLang() {
      return `Current Language ${this.language}`;
    },
  },
  methods: {
    changeLanguage(lang) {
      this.language = lang;
    },
  },
};
</script>
