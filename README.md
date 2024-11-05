[![codecov](https://codecov.io/gh/limbara/vue-time-date-range-picker/branch/master/graph/badge.svg)](https://codecov.io/gh/limbara/vue-time-date-range-picker)

# vue-time-date-range-picker

A Vue Component to pick a ranged datetime in calendar. Built alongside Vue 3.x . 
This datepicker utilize **moment** for translations.

### Version matrix

| Vue.js version | Package version | Branch                                                                       |
| :---           |:---------------:| ---:                                                                         | 
| 2.x            |       1.x       | [version-1](https://github.com/limbara/vue-time-date-range-picker/tree/version-1)  |
| 3.x            |       2.x       | `master`                                                                     |

- [Demo](#demo)
- [Install](#install)
- [Usage](#usage)
- [Props](#available-props)
- [Events](#events)
- [Translations](#translations)

## Demo

codepen demo : https://codepen.io/limbara/pen/ZEQxoZZ 
sandbox demo : https://codesandbox.io/s/example-vue-time-date-range-picker-byw7g

Clone the repo and run 'npm install && npm run serve' for local demo

## Install

```bash
npm i vue-time-date-range-picker moment
```

## Usage

Usage within JS project

```javascript
import DatePicker, { CalendarDialog } from 'vue-time-date-range-picker'
import 'vue-time-date-range-picker/dist/style.css'

export default {
  //...
  components: {
    DatePicker,
    CalendarDialog
  }
  //...
}
```
You can use CalendarDialog Component if you want to implement your own input element

Usage from CDN
```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/vue-time-date-range-picker@2.1.2/dist/style.css">
</head>`
<body>
   <div id="app">
    <button type="button" @click="toggle">Toggle</button>
    <calendardialog v-show="open" @on-apply="onApply" />
  </div>

  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment-with-locales.min.js"></script>
  <script src="https://unpkg.com/vue-time-date-range-picker@2.1.2"></script>
  <script>
    const { createApp, ref } = Vue;

    createApp({
      setup() {
        const open = ref(false);

        const toggle = () => {
          open.value = !open.value
        }

        const onApply = (date1, date2) => {
          console.log(date1, date2)
        }

        return {
          open,
          toggle,
          onApply,
        };
      },
    }).component('datepicker', vdprDatePicker).component('calendardialog', vdprDatePicker.CalendarDialog).mount("#app");
  </script>
</body>
```

## Available props

Below is props that're available in **DatePicker** Component

** date format refer to [moment](https://momentjs.com/) **

| Prop                                  | Type          | Default           | Description                                             |
|---------------------------------------|---------------|-------------------|---------------------------------------------------------|
| v-model                               | [Date,Date] / null|               | v-model binding                                         |
| initial-dates                         | [Date, Date]  |                   | Initial value for the datepicker                        |
| inline                                | Boolean       | false             | Use datepicker inline style                             |
| language                              | String        | en                | Languange                                               |
| format                                | String        | DD/MM/YYYY HH:mm  | Format for display date input                           |
| [same-date-format](#same-date-format) | Object        | refer below       | Format for display date input if start & end date same  |
| [disabled-dates](#disabled-dates)     | Object        | refer below       | Disable certain dates                                   |
| [available-dates](#available-dates)   | Object        | refer below       | Allow only certain dates                                |
| [date-input](#date-input)             | Object        |                   | Input configuration                                     |
| show-helper-buttons                   | Boolean       |                   | Show helper buttons                                     |
| [helper-buttons](#helper-buttons)     | [ ]Object     |                   | Custom helper button                                    |
| [calendar-date-input](#c-date-input)  | Object        | refer below       | Calendar input date configuration                       |
| [calendar-time-input](#c-time-input)  | Object        | refer below       | Calendar input time configuration                       |
| switch-button-label                   | String        |                   | Switch Button label                                     |
| switch-button-initial                 | Boolean       |                   | Switch Button initial value                             |
| apply-button-label                    | String        |                   | Apply Button Label                                      |
| reset-button-label                    | String        |                   | Reset Button Label                                      | 
| is-monday-first                       | Boolean       |                   | Calendar start from Monday instead of Sunday            |

Below is props that're available in **Calendar Dialog** Component

| Prop                                  | Type            | Default     | Description                                 |
|---------------------------------------|-----------------|-------------|---------------------------------------------|
| initial-dates                         | [Date, Date]    |             | Initial value for the datepicker            |
| inline                                | Boolean         | false       | Use datepicker inline style                 |
| language                              | String          | en          | Languange                                   |
| [disabled-dates](#disabled-dates)     | Object          | refer below | Disable certain dates                       |
| [available-dates](#available-dates)   | Object          | refer below | Allow only certain dates                    |
| show-helper-buttons                   | Boolean         | true        | Show helper buttons                         |
| [helper-buttons](#helper-buttons)     | [ ]Object       | [ ]         | Custom helper button                        |
| [date-input](#c-date-input)           | Object          |             | Calendar input date configuration           |
| [time-input](#c-time-input)           | Object          |             | Calendar input time configuration           |
| switch-button-label                   | String          | All Days    | Switch Button label                         |
| switch-button-initial                 | Boolean         | false       | Switch Button initial value                 |
| apply-button-label                    | String          | Apply       | Apply Button Label                          |
| reset-button-label                    | String          | Reset       | Reset Button Label                          |
| is-monday-first                       | Boolean         | false       | Calendar start from Monday (default Sunday) |

#### Same Date Format 
Below is values that're available for props "same-date-format"

| Key         | Type           | Default             | Description                              |
|-------------|----------------|---------------------|------------------------------------------|
| from        | String         | DD/MM/YYYY, HH:mm   | format selected start date               |
| to          | String         | HH:mm               | format selected end date                 |

#### Date Input
Below is values that're available for props "date-input"

| Key         | Type                  | Default             | Description                               |
|-------------|-----------------------|---------------------|-------------------------------------------|
| inputClass  | String\|Array\|Object |                     | class for input element                   |
| refName     | String                |                     | ref name for input element                |
| name        | String                |                     | attribute name                            |
| placeholder | String                |                     | attribute placeholder                     |
| id          | String                |                     | atttibute id                              |
| required    | Boolean               |                     | attirbute required                        |

#### Disabled Dates
Below is values that're available for props "disabled-dates"

| Key         | Type            | Default    | Description                                             |
|-------------|-----------------|------------|---------------------------------------------------------|
| dates       | [ ]Date         |            | disable dates matching array of Date object             | 
| from        | Date            |            | disable dates from this date                            |
| to          | Date            |            | disable dates until this date                           |
| ranges      | Object          |            | disable dates matching object of date "from" & "to"     |
| custom      | Function        |            | disable dates with function                             |

If accidentially both disabled dates and available dates are provided, disabled dates take priority.

#### Available Dates
Below is values that're available for props "available-dates"

| Key         | Type            | Default    | Description                                             |
|-------------|-----------------|------------|---------------------------------------------------------|
| dates       | [ ]Date         |            | allow dates matching array of Date object               | 
| from        | Date            |            | allow dates from this date                              |
| to          | Date            |            | allow dates until this date                             |
| ranges      | Object          |            | allow dates matching object of date "from" & "to"       |
| custom      | Function        |            | allow dates with function                               |

If accidentially both disabled dates and available dates are provided, disabled dates take priority.

#### Helper Buttons
Below is values that're available for props "helper-buttons"

| Key         | Type           | Default      | Description                              |
|-------------|----------------|--------------|------------------------------------------|
| name        | String         |              | button name                              |
| from        | String         |              | format selected start date               |
| to          | String         |              | format selected end date                 |

#### C Date Input
Below is values that're available for props "calendar-date-input" or "date-input" for Calendar Dialog component 

| Key         | Type                  | Default      | Description                              |
|-------------|-----------------------|--------------|------------------------------------------|
| labelStarts | String                | Starts       | start date label                         |
| labelEnds   | String                | Ends         | ends date label                          |
| inputClass  | String\|Array\|Object |              | class for input element                  |
| format      | String                | DD/MM/YYYY   | date format                              |

#### C Time Input
Below is values that're available for props "calendar-time-input" or "time-input" for Calendar Dialog component

| Key         | Type                  | Default      | Description                              |
|-------------|-----------------------|--------------|------------------------------------------|
| inputClass  | String\|Array\|Object |              | class for input element                  |
| readonly    | Boolean               | false        | attribute readonly                       |
| step        | Number                | 60           | step value in minutes                    |

## Events

Below is events that're available in **DatePicker** Component

| Event                 | Output        | Description                                                 |
|-----------------------|---------------|-------------------------------------------------------------|
| date-applied          | Date, Date    | Dates is applied to date input. Output start & end date     |
| on-prev-calendar      |               | On calendar page previous                                   |
| on-next-calendar      |               | On calendar page next                                       |
| datepicker-opened     |               | Datepicker is opened                                        |
| datepicker-closed     |               | Datepicker is closed                                        |
| select-date           | Date, Date    | A date is selected in calendar. Output start & end date     |
| select-disabled-date  | Date          | A disabled date is selected in calendar                     |
| on-reset              |               | On reset when button reset clicked                          |

Below is events that're available in **Calendar Dialog** Component 

| Event                 | Output        | Description                                                 |
|-----------------------|---------------|-------------------------------------------------------------|
| on-apply              | Date, Date    | Dates is applied to date input. Output start & end date     |
| on-prev-calendar      |               | On calendar page previous                                   |
| on-next-calendar      |               | On calendar page next                                       |
| select-date           | Date, Date    | A date is selected in calendar. Output start & end date     |
| select-disabled-date  | Date          | A disabled date is selected in calendar                     |
| on-reset              |               | On reset when button reset clicked                          |

## Translations

** available languages refer to [moment](https://momentjs.com/) **
