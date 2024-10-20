
import { mount } from '@vue/test-utils';
import DatePicker from '@/components/DatePicker/DatePicker.vue';
import CalendarDialog from '@/components/CalendarDialog/CalendarDialog.vue';
import DateInput from '@/components/DateInput/DateInput.vue';
import 'regenerator-runtime';
import '@testing-library/jest-dom';

describe('Date Picker', () => {
  const datePickerClass = '.vdpr-datepicker';

  let wrapper;
  let calendarDialog;
  let dateInput;

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

  it('should reset selected dates and date input value', () => {
    calendarDialog.vm.$emit('on-reset');

    expect(wrapper.vm.selectedStartDate).toBeNull();
    expect(wrapper.vm.selectedEndDate).toBeNull();
    expect(dateInput.find('input').element.value).toBe('');
  });

  it('toggle calendar dialog', async () => {
    dateInput.vm.$emit('click');
    await wrapper.vm.$nextTick();

    expect(calendarDialog.isVisible()).toBe(true);

    dateInput.vm.$emit('click');
    await wrapper.vm.$nextTick();

    expect(calendarDialog.isVisible()).toBe(false);
  });

  it('emit date-applied event', () => {
    const fromDate = new Date('2020 08 01');
    const endDate = new Date('2020 08 02');
    calendarDialog.vm.$emit('on-apply', fromDate, endDate);

    expect(wrapper.emitted('date-applied')[0]).toEqual([fromDate, endDate]);
  });

  it('emit datepicker-opened event', () => {
    dateInput.vm.$emit('click');
    expect(wrapper.emitted('datepicker-opened')).toBeTruthy();

    dateInput.vm.$emit('click');
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

  it('emit on-reset', () => {
    const e = 'on-reset';

    calendarDialog.vm.$emit(e);
    expect(wrapper.emitted(e)).toBeTruthy();
  })
});
