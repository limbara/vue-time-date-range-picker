/* eslint-disable import/no-unresolved */
import { shallowMount } from '@vue/test-utils';
import CalendarInputTime from '@/Components/CalendarInputTime.vue';
import 'regenerator-runtime';

describe('Calendar Input Time', () => {
  const inputElemClass = '.vdpr-datepicker__calendar-input-time-elem';
  const upButtonClass = '.vdpr-datepicker__calendar-input-time-control-up';
  const downButtonClass = '.vdpr-datepicker__calendar-input-time-control-down';

  let wrapper; let
    vm;

  beforeEach(() => {
    wrapper = shallowMount(CalendarInputTime, {
      props: {
        inputClass: 'time_input_class',
        timestamp: new Date('2020 08 10 15:00:00').getTime() / 1000,
        step: 60,
      },
    });

    vm = wrapper.vm;
  });

  it('should render correct contents', () => {
    expect(wrapper.find(inputElemClass).exists()).toBe(true);

    expect(wrapper.find(upButtonClass).exists()).toBe(true);

    expect(wrapper.find(downButtonClass).exists()).toBe(true);

    const attrs = wrapper.find(inputElemClass).attributes();

    expect(attrs.class).toContain('time_input_class');
  });

  it('format time', () => {
    expect(vm.formattedValue).toEqual('15:00');
  });

  it("doesn't format time if timestamp is zero", () => {
    wrapper = shallowMount(CalendarInputTime, {
      props: {
        timestamp: 0,
      },
    });

    expect(wrapper.vm.formattedValue).toEqual('');
  });

  it('emit on-change button up', async () => {
    await wrapper.find(upButtonClass).trigger('click');

    expect(wrapper.emitted('on-change')[0]).toEqual([new Date('2020 08 10 16:00:00')]);
  });

  it('emit on-change button-down', async () => {
    await wrapper.find(downButtonClass).trigger('click');

    expect(wrapper.emitted('on-change')[0]).toEqual([new Date('2020 08 10 14:00:00')]);
  });

  it('emit on-change when input change', async () => {
    const input = wrapper.find(inputElemClass);

    input.element.value = '20:00';

    await input.trigger('change');

    expect(wrapper.emitted('on-change')[0]).toEqual([new Date('2020 08 10 20:00:00')]);
  });

  it("doesn't emit on-change if input invalid", async () => {
    const input = wrapper.find(inputElemClass);

    input.element.value = 'ww:00';

    await input.trigger('change');

    expect(wrapper.emitted('on-change')).toBeFalsy();
  });
});
