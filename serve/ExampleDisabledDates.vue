<template>
  <div>
    <h2>Example Disabled Dates</h2>
    <h4>Disabled date with "from" and "to"</h4>
    <pre>
      {
        from : new Date("2024 09 01"),
        to : new Date("2024 06 30"),
      }
    </pre>
    <date-picker :dateInput="dateInput" :disabledDates="disabledDates1" />
    <br />
    <h4>Disabled date with "ranges"</h4>
    <pre>
      {
        ranges: [
          {
            from: new Date("2024 05 01"),
            to: new Date("2024 05 31")
          },
          {
            from: new Date("2024 09 01"),
            to: new Date("2024 09 31")
          }
        ]
      }
    </pre>
    <date-picker :dateInput="dateInput" :disabledDates="disabledDates2" />
    <br />
    <h4>Disabled date with "dates"</h4>
    <pre>
      {
        dates: [
          new Date("2024 09 01"),
          new Date("2024 07 26"),
          new Date("2024 09 05")
        ]
      }
    </pre>
    <date-picker :dateInput="dateInput" :disabledDates="disabledDates3" />
    <br />
    <h4>Disabled date with "custom" function</h4>
    <pre>
      {
        custom: function(date) {
          return date.getDay() == 1;
        }
      }
    </pre>
    <date-picker :dateInput="dateInput" :disabledDates="disabledDates4" />
  </div>
</template>

<script lang="ts" setup>
import DatePicker from "./StatefullDatepicker.vue";

const dateInput = {
  placeholder: "Select Date",
};
const disabledDates1 = {
  from: new Date("2024 09 01"),
  to: new Date("2024 06 30"),
};
const disabledDates2 = {
  ranges: [
    {
      from: new Date("2024 05 01"),
      to: new Date("2024 05 31"),
    },
    {
      from: new Date("2024 09 01"),
      to: new Date("2024 09 31"),
    },
  ],
};
const disabledDates3 = {
  dates: [
    new Date("2024 09 01"),
    new Date("2024 07 26"),
    new Date("2024 09 05"),
  ],
};
const disabledDates4 = {
  custom(date: Date) {
    return date.getDay() === 1;
  },
};
</script>
