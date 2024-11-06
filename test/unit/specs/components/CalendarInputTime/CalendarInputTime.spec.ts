
import { shallowMount } from '@vue/test-utils';
import CalendarInputTime from '@components/CalendarInputTime/CalendarInputTime.vue';
import 'regenerator-runtime';

describe('Calendar Input Time', () => {
  const upButtonClass = '.vdpr-datepicker__calendar-input-time-control-up';
  const downButtonClass = '.vdpr-datepicker__calendar-input-time-control-down';

  let wrapper: ReturnType<typeof shallowMount<typeof CalendarInputTime>>; 

  beforeEach(() => {
    wrapper = shallowMount(CalendarInputTime, {
      props: {
        inputClass: 'time_input_class',
        timestamp: new Date('2020 08 10 15:00:00').getTime() / 1000,
        step: 60,
      },
    });
  });

  it('should render correct contents', () => {
    expect(wrapper.find('input').exists()).toBe(true);

    expect(wrapper.find(upButtonClass).exists()).toBe(true);

    expect(wrapper.find(downButtonClass).exists()).toBe(true);

    const attrs = wrapper.find('input').attributes();

    expect(attrs.class).toContain('time_input_class');
  });

  it('format time', () => {
    expect(wrapper.find('input').element.value).toEqual('15:00');
  });

  it("doesn't format time if timestamp is zero", () => {
    wrapper = shallowMount(CalendarInputTime, {
      props: {
        timestamp: 0,
      },
    });

    expect(wrapper.find('input').element.value).toEqual('');
  });

  it('emit change button up', async () => {
    await wrapper.find(upButtonClass).trigger('click');

    expect(wrapper.emitted('change')?.[0]).toEqual([new Date('2020 08 10 16:00:00')]);
  });

  it('emit change button-down', async () => {
    await wrapper.find(downButtonClass).trigger('click');

    expect(wrapper.emitted('change')?.[0]).toEqual([new Date('2020 08 10 14:00:00')]);
  });

  it('emit change when input change', async () => {
    const input = wrapper.find('input');

    input.element.value = '20:00';

    await input.trigger('change');

    expect(wrapper.emitted('change')?.[0]).toEqual([new Date('2020 08 10 20:00:00')]);
  });

  it("doesn't emit change if input invalid", async () => {
    const input = wrapper.find('input');

    input.element.value = 'ww:00';

    await input.trigger('change');

    expect(wrapper.emitted('on-change')).toBeFalsy();
  });
});
