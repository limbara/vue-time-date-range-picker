/* eslint-disable import/no-unresolved */
import { shallowMount } from '@vue/test-utils';
import moment from 'moment';
import Calendar from '@/Components/Calendar.vue';
import 'regenerator-runtime';

describe('Calendar : Changing Page', () => {
  const now = new Date();

  const startDate = new Date('2020 08 01');
  const endDate = new Date('2020 08 05');

  let wrapper; let
    vm;

  beforeEach(() => {
    wrapper = shallowMount(Calendar);

    vm = wrapper.vm;
  });

  it('should show prev calendar page', () => {
    vm.onPrevClick();

    const monthYear = moment(now)
      .subtract(1, 'M')
      .format('MMM YYYY');

    expect(vm.monthYear === monthYear).toBe(true);
  });

  it('should show next calendar page', () => {
    vm.onNextClick();

    const monthYear = moment(now)
      .add(1, 'M')
      .format('MMM YYYY');

    expect(vm.monthYear === monthYear).toBe(true);
  });

  it('should show prev calendar page with initialized dates', () => {
    wrapper = shallowMount(Calendar, {
      propsData: {
        selectedStartDate: startDate,
        selectedEndDate: endDate,
      },
    });

    const monthYear = moment(startDate)
      .subtract(1, 'M')
      .format('MMM YYYY');

    wrapper.vm.onPrevClick();

    expect(wrapper.vm.monthYear === monthYear).toBe(true);
  });

  it('should show next calendar page with initialized dates', () => {
    wrapper = shallowMount(Calendar, {
      propsData: {
        selectedStartDate: startDate,
        selectedEndDate: endDate,
      },
    });

    const monthYear = moment(startDate)
      .add(1, 'M')
      .format('MMM YYYY');

    wrapper.vm.onNextClick();

    expect(wrapper.vm.monthYear === monthYear).toBe(true);
  });
});
