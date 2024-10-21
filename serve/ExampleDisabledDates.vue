<template>
  <div>
    <h2>Example Disabled Dates</h2>
    <h4>Disabled date with "from" and "to"</h4>
    <pre>
      {
        from : new Date("2022 09 01"),
        to : new Date("2022 06 30"),
      }
    </pre>
    <date-picker :dateInput="dateInput" :disabledDates="disabledDates1" />
    <br />
    <h4>Disabled date with "ranges"</h4>
    <pre>
      {
        ranges: [
          {
            from: new Date("2022 05 01"),
            to: new Date("2022 05 31")
          },
          {
            from: new Date("2022 09 01"),
            to: new Date("2022 09 31")
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
          new Date("2022 09 01"),
          new Date("2022 07 26"),
          new Date("2022 09 05")
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

<script>
import DatePicker from '@components/DatePicker/DatePicker.vue';

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      dateInput: {
        placeholder: 'Select Date',
      },
      disabledDates1: {
        from: new Date('2022 09 01'),
        to: new Date('2022 06 30'),
      },
      disabledDates2: {
        ranges: [
          {
            from: new Date('2022 05 01'),
            to: new Date('2022 05 31'),
          },
          {
            from: new Date('2022 09 01'),
            to: new Date('2022 09 31'),
          },
        ],
      },
      disabledDates3: {
        dates: [
          new Date('2022 09 01'),
          new Date('2022 07 26'),
          new Date('2022 09 05'),
        ],
      },
      disabledDates4: {
        custom(date) {
          return date.getDay() === 1;
        },
      },
    };
  },
};
</script>
