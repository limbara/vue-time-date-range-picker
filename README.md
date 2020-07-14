# vue-time-date-range-picker

A Vue Component to pick a ranged datetime in calendar. Built alongside Vue 2.x . 
This datepicker utilize **moment** for translations.

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
npm i vue-time-date-range-picker
```

## Usage

Usage within JS project

```javascript
import DatePicker, { CalendarDialog } from 'vue-time-date-range-picker/dist/vdprDatePicker'

export default {
  //...
  components: {
    DatePicker,
    CalendarDIalog
  }
  //...
}
```
You can use CalendarDialog Component if you want to implement your own input element

Usage from CDN
```html
<div id="app">
  <datepicker></datepicker>
</div>
<script src="https://unpkg.com/vue"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment-with-locales.min.js"></script>
<script src="https://unpkg.com/vue-time-date-range-picker@1.0.2/dist/vdprDatePicker.js"></script>
<script>
const app = new Vue({
  el: '#app',
  components: {
    'datepicker' : vdprDatePicker.default,
    'calendar-dialog' : vdprDatePicker.CalendarDialog
  }
})
</script>
```

## Available props

Below is props that're available in **DatePicker** Component

** date format refer to [moment](https://momentjs.com/) **

| Prop                                  | Type          | Default           | Description                                             |
|---------------------------------------|---------------|-------------------|---------------------------------------------------------|
| initial-dates                         | [Date, Date]  |                   | Initial value for the datepicker                        |
| inline                                | Boolean       | false             | Use datepicker inline style                             |
| language                              | String        | en                | Languange                                               |
| format                                | String        | DD/MM/YYYY HH:mm  | Format for display date input                           |
| [same-date-format](#same-date-format) | Object        | refer below       | Format for display date input if start & end date same  |
| [disabled-dates](#disabled-dates)     | Object        | refer below       | Disable certain dates                                   |
| [date-input](#date-input)             | Object        |                   | Input configuration                                     |
| show-helper-buttons                   | Boolean       |                   | Show helper buttons                                     |
| [helper-buttons](#helper-buttons)     | [ ]Object     |                   | Custom helper button                                    |
| [calendar-date-input](#c-date-input)  | Object        | refer below       | Calendar input date configuration                       |
| [calendar-time-input](#c-time-input)  | Object        | refer below       | Calendar input time configuration                       |
| switch-button-label                   | String        | refer below       | Switch Button label                                     |

Below is props that're available in **Calendar Dialog** Component

| Prop                                  | Type            | Default     | Description                              |
|---------------------------------------|-----------------|-------------|------------------------------------------|
| initial-dates                         | [Date, Date]    |             | Initial value for the datepicker         |
| inline                                | Boolean         | false       | Use datepicker inline style              |
| language                              | String          | en          | Languange                                |
| [disabled-dates](#disabled-dates)     | Object          | refer below | Disable certain dates                    |
| show-helper-buttons                   | Boolean         | true        | Show helper buttons                      |
| [helper-buttons](#helper-buttons)     | [ ]Object       | [ ]         | Custom helper button                     |
| [date-input](#c-date-input)           | Object          |             | Calendar input date configuration        |
| [time-input](#c-time-input)           | Object          |             | Calendar input time configuration        |
| switch-button-label                   | String          | All Days    | Switch Button label                      |

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

#### Helper Buttons
Below is values that're available for props "helper-buttons"

| Key         | Type           | Default      | Description                              |
|-------------|----------------|--------------|------------------------------------------|
| name        | String         |              | button name                              |
| from        | String         |              | format selected start date               |
| to          | String         |              | format selected end date                 |

#### C Date Input
Below is values that're available for props "calendar-date-input" or "date-input" in Calendar Dialog component 

| Key         | Type                  | Default      | Description                              |
|-------------|-----------------------|--------------|------------------------------------------|
| labelStarts | String                | Starts       | start date label                         |
| labelEnds   | String                | Ends         | ends date label                          |
| inputClass  | String\|Array\|Object |              | class for input element                  |
| format      | String                | DD/MM/YYYY   | date format                              |

#### C Time Input
Below is values that're available for props "calendar-time-input" or "time-input" in Calendar Dialog component

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

Below is events that're available in **Calendar Dialog** Component 

| Event                 | Output        | Description                                                 |
|-----------------------|---------------|-------------------------------------------------------------|
| on-apply              | Date, Date    | Dates is applied to date input. Output start & end date     |
| on-prev-calendar      |               | On calendar page previous                                   |
| on-next-calendar      |               | On calendar page next                                       |
| select-date           | Date, Date    | A date is selected in calendar. Output start & end date     |
| select-disabled-date  | Date          | A disabled date is selected in calendar                     |

## Translations

** available languages refer to [moment](https://momentjs.com/) **
