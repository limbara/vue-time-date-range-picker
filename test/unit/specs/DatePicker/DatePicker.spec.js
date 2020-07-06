/* eslint-disable import/no-unresolved */
import DatePicker from '@/Components/DatePicker';
import CalendarDialog from '@/Components/CalendarDialog';
import DateInput from '@/Components/DateInput';
import { mount } from '@vue/test-utils';
import 'regenerator-runtime';
import '@testing-library/jest-dom';

describe('Date Picker', () => {
  const datePickerClass = '.vdpr-datepicker';

  let wrapper; let calendarDialog; let
    dateInput;

  beforeEach(() => {
    wrapper = mount(DatePicker, {
      data() {
        return {
          selectedStartDate: null,
          selectedEndDate: null,
          showCalendarDialog: false,
        };
      },
    });

    calendarDialog = wrapper.findComponent(CalendarDialog);
    dateInput = wrapper.findComponent(DateInput);
  });

  it('should render correct contents', () => {
    expect(wrapper.find(datePickerClass).exists()).toBe(true);
    expect(calendarDialog.exists()).toBe(true);
    expect(dateInput.exists()).toBe(true);
  });

  it('should set date & close calendar dialog when applied', () => {
    const fromDate = new Date('2020 08 01');
    const endDate = new Date('2020 08 02');
    calendarDialog.vm.$emit('on-apply', fromDate, endDate);

    expect(wrapper.vm.selectedStartDate).toEqual(fromDate);
    expect(wrapper.vm.selectedEndDate).toEqual(endDate);
    expect(wrapper.vm.showCalendarDialog).toEqual(false);
  });

  it('toggle calendar dialog', async () => {
    await dateInput.vm.$emit('on-click');
    expect(calendarDialog.element).toBeVisible();

    await dateInput.vm.$emit('on-click');
    expect(calendarDialog.element).not.toBeVisible();
  });

  it('emit date-applied event', () => {
    const fromDate = new Date('2020 08 01');
    const endDate = new Date('2020 08 02');
    calendarDialog.vm.$emit('on-apply', fromDate, endDate);

    expect(wrapper.emitted('date-applied')[0]).toEqual([fromDate, endDate]);
  });

  it('emit datepicker-opened event', () => {
    dateInput.vm.$emit('on-click');
    expect(wrapper.emitted('datepicker-opened')).toBeTruthy();

    dateInput.vm.$emit('on-click');
    expect(wrapper.emitted('datepicker-closed')).toBeTruthy();
  });

  it('emit on-prev-calendar event', () => {
    const e = 'on-prev-calendar';

    calendarDialog.vm.$emit(e);
    expect(wrapper.emitted(e)).toBeTruthy();
  });

  it('emit on-next-calendar event', () => {
    const e = 'on-next-calendar';

    calendarDialog.vm.$emit(e);
    expect(wrapper.emitted(e)).toBeTruthy();
  });

  it('emit select-date event', () => {
    const e = 'select-date';
    const fromDate = new Date('2020 08 01');
    const endDate = new Date('2020 08 03');

    calendarDialog.vm.$emit(e, fromDate, endDate);
    expect(wrapper.emitted(e)[0]).toEqual([fromDate, endDate]);
  });

  it('emit select-disabled-date event', () => {
    const e = 'select-disabled-date';
    const date = new Date('2020 09 01');

    calendarDialog.vm.$emit(e, date);
    expect(wrapper.emitted(e)[0]).toEqual([date]);
  });
});
