<template>
  <div>
    <h2>Example Available Dates</h2>
    <h4>Available date with "to" and "from"</h4>
    <pre>
      {
        from: new Date('2024 06 30'),
        to: new Date('2024 09 01')
      }
    </pre>
    <date-picker :dateInput="dateInput" :availableDates="availableDates1" />
    <br />
    <h4>Available date with "ranges"</h4>
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
    <date-picker :dateInput="dateInput" :availableDates="availableDates2" />
    <br />
    <h4>Available date with "dates"</h4>
    <pre>
      {
        dates: [
          new Date('2024 09 01'),
          new Date('2024 07 26'),
          new Date('2024 09 05'),
        ]
      }
    </pre>
    <date-picker :dateInput="dateInput" :availableDates="availableDates3" />
    <br />
    <h4>Available date with "custom" function</h4>
    <pre>
      {
        custom: function(date) {
          return date.getDay() == 1;
        }
      }
    </pre>
    <date-picker :dateInput="dateInput" :availableDates="availableDates4" />
  </div>
</template>

<script lang="ts" setup>
import DatePicker from "./StatefullDatepicker.vue";

const dateInput = {
  placeholder: "Select Date",
};

const availableDates1 = {
  from: new Date("2024 06 30"),
  to: new Date("2024 09 01"),
};

const availableDates2 = {
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

const availableDates3 = {
  dates: [
    new Date("2024 09 01"),
    new Date("2024 07 26"),
    new Date("2024 09 05"),
  ],
};

const availableDates4 = {
  custom(date: Date) {
    return date.getDay() === 1;
  },
};
</script>
