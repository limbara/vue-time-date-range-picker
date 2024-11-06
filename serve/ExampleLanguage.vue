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

<script lang="ts" setup>
import { computed, ref } from "vue";
import DatePicker from "./StatefullDatepicker.vue";

const language = ref("id");

const dateInput = {
  placeholder: "Select Date",
};

const displayLang = computed(() => `Current Language ${language.value}`);

const changeLanguage = (lang: string) => {
  language.value = lang;
};
</script>
