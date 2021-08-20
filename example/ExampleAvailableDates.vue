<template>
  <div>
    <h2>Example Available Dates</h2>
    <h4>Available date with "to"</h4>
    <pre>
      {
        to : new Date("2020 06 30"),
      }
    </pre>
    <date-picker :dateInput="dateInput" :availableDates="availableDates1a"/>
    <br />
    <h4>Available date with "from"</h4>
    <pre>
      {
        from : new Date("2020 08 01"),
      }
    </pre>
    <date-picker :dateInput="dateInput" :availableDates="availableDates1b"/>
    <br />
    <h4>Available date with "ranges"</h4>
    <pre>
      {
        ranges: [
          {
            from: new Date("2020 05 01"),
            to: new Date("2020 05 31")
          },
          {
            from: new Date("2020 08 01"),
            to: new Date("2020 08 31")
          }
        ]
      }
    </pre>
    <date-picker :dateInput="dateInput" :availableDates="availableDates2"/>
    <br />
    <h4>Available date with "dates"</h4>
    <pre>
      {
        dates: [
          new Date('2021 08 01'),
          new Date('2021 07 26'),
          new Date('2021 08 05'),
        ]
      }
    </pre>
    <date-picker :dateInput="dateInput" :availableDates="availableDates3"/>
    <br />
    <h4>Available date with "custom" function</h4>
    <pre>
      {
        custom: function(date) {
          return date.getDay() == 1;
        }
      }
    </pre>
    <date-picker :dateInput="dateInput" :availableDates="availableDates4"/>
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
      availableDates1a: {
        to: new Date('2020 06 30'),
      },
      availableDates1b: {
        from: new Date('2020 08 01'),
      },
      availableDates2: {
        ranges: [
          {
            from: new Date('2020 05 01'),
            to: new Date('2020 05 31'),
          },
          {
            from: new Date('2020 08 01'),
            to: new Date('2020 08 31'),
          },
        ],
      },
      availableDates3: {
        dates: [
          new Date('2021 08 01'),
          new Date('2021 07 26'),
          new Date('2021 08 05'),
        ],
      },
      availableDates4: {
        custom(date) {
          return date.getDay() === 1;
        },
      },
    };
  },
};
</script>
