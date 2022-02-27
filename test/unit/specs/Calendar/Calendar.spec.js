/* eslint-disable import/no-unresolved */
import { shallowMount } from '@vue/test-utils';
import moment from 'moment';
import Calendar from '@/Components/Calendar.vue';
import 'regenerator-runtime';

describe('Calendar', () => {
  const calendarClass = '.vdpr-datepicker__calendar';
  const calendarPrevButtonClass = '.vdpr-datepicker__calendar-control-prev';
  const calendarNextButtonClass = '.vdpr-datepicker__calendar-control-next';
  const calendarTableClass = '.vdpr-datepicker__calendar-table';

  const now = new Date();

  let wrapper; let
    vm;

  beforeEach(() => {
    wrapper = shallowMount(Calendar);

    vm = wrapper.vm;
  });

  it('should have correct default data', () => {
    const d = new Date(wrapper.vm.pageTimestamp * 1000);

    expect(d.getFullYear()).toEqual(now.getFullYear());
    expect(d.getMonth()).toEqual(now.getMonth());
    expect(d.getDate()).toEqual(1);
  });

  it('should render correct contents', () => {
    expect(wrapper.find(calendarClass).exists()).toBe(true);
    expect(wrapper.find(calendarPrevButtonClass).exists()).toBe(true);
    expect(wrapper.find(calendarNextButtonClass).exists()).toBe(true);
    expect(wrapper.find(calendarTableClass).exists()).toBe(true);
  });

  it('should show current calendar page', () => {
    const index = vm.days.find((day) => (
      day.date.getFullYear() === now.getFullYear()
      && day.date.getMonth() === now.getMonth()
      && day.date.getDate() === now.getDate()
    ));

    expect(index !== -1).toBe(true);
  });

  it('should show current month year', () => {
    const currentMonthYear = moment(now).format('MMM YYYY');

    expect(vm.monthYear === currentMonthYear).toBe(true);
  });

  it('changing language', async () => {
    await wrapper.setProps({
      language: 'id',
    });

    const idMonth = moment(now)
      .locale('id')
      .format('MMM');

    expect(vm.monthYear).toContain(idMonth);

    await wrapper.setProps({
      language: 'ms-my',
    });

    const myMonth = moment(now)
      .locale('ms-my')
      .format('MMM');

    expect(vm.monthYear).toContain(myMonth);
  });

  it('should render Monday first', async () => {
    expect(vm.dayNames[0]).toBe('Sun');

    await wrapper.setProps({
      isMondayFirst: true,
    });

    expect(vm.dayNames[0]).toBe('Mon');
  });

  it('emit an event select-date when selected', () => {
    vm.selectDate({ isDisabled: false });
    expect(wrapper.emitted('select-date')).toBeTruthy();
  });

  it('emit an event on-prev-calendar when prev clicked', async () => {
    await wrapper.find(calendarPrevButtonClass).trigger('click');

    expect(wrapper.emitted('on-prev-calendar')).toBeTruthy();
  });

  it('emit an event on-next-calendar when next clicked', async () => {
    await wrapper.find(calendarNextButtonClass).trigger('click');

    expect(wrapper.emitted('on-next-calendar')).toBeTruthy();
  });
});
