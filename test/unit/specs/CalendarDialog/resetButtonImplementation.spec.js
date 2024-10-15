
import { mount } from '@vue/test-utils';
import CalendarDialog from '@/components/CalendarDialog.vue';
import CalendarInputDate from '@/components/CalendarInputDate.vue';
import CalendarInputTime from '@/components/CalendarInputTime.vue';
import Calendar from '@/components/Calendar.vue';
import 'regenerator-runtime';

describe('Calendar Dialog : Reset Button Implementation', () => {
  const datePickerButtonReset = '.vdpr-datepicker__button-reset';
  const startDate = new Date('2021 06 01');
  const endDate = new Date('2021 06 30');
  let wrapper; let
    resetButton;

  beforeEach(() => {
    wrapper = mount(CalendarDialog, {
      data() {
        return {
          selectedStartDate: startDate,
          selectedEndDate: endDate,
          isAllDay: true,
        };
      },
    });

    resetButton = wrapper.find(datePickerButtonReset);
  });

  it('reset calendar dialog data', async () => {
    await resetButton.trigger('click');

    expect(wrapper.vm.selectedStartDate).toBeNull();
    expect(wrapper.vm.selectedEndDate).toBeNull();
    expect(wrapper.vm.isAllDay).toBe(false);
  });

  it('emit on-reset event', async () => {
    await resetButton.trigger('click');

    expect(wrapper.emitted('on-reset')).toBeTruthy();
  });

  it('reset input date value', async () => {
    const inputDates = wrapper.findAllComponents(CalendarInputDate);
    const inputStartDate = inputDates.at(0);
    const inputEndDate = inputDates.at(1);

    await resetButton.trigger('click');

    expect(inputStartDate.find('.vdpr-datepicker__calendar-input-date-elem').element.value).toBe('');
    expect(inputEndDate.find('.vdpr-datepicker__calendar-input-date-elem').element.value).toBe('');
  });

  it('reset input time value', async () => {
    const inputTimes = wrapper.findAllComponents(CalendarInputTime);
    const inputStartTime = inputTimes.at(0);
    const inputEndTime = inputTimes.at(1);

    await resetButton.trigger('click');

    expect(inputStartTime.find('.vdpr-datepicker__calendar-input-time-elem').element.value).toBe('');
    expect(inputEndTime.find('.vdpr-datepicker__calendar-input-time-elem').element.value).toBe('');
  });

  it('reset calendar highlighted day', async () => {
    const calendar = wrapper.findComponent(Calendar);

    await resetButton.trigger('click');

    expect(calendar.findAll('.highlighted').length).toBe(0);
  });
});
