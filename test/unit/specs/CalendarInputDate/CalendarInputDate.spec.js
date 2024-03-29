/* eslint-disable import/no-unresolved */
import { shallowMount } from '@vue/test-utils';
import CalendarInputDate from '@/Components/CalendarInputDate.vue';
import 'regenerator-runtime';

describe('Calendar Input Date', () => {
  let wrapper; let
    vm;

  const date = '2020 08 10';

  beforeEach(() => {
    wrapper = shallowMount(CalendarInputDate, {
      props: {
        inputClass: 'date_input_class',
        timestamp: new Date(date).getTime() / 1000,
        format: 'DD/MM/YYYY',
      },
    });

    vm = wrapper.vm;
  });

  it('should render correct contents', () => {
    expect(wrapper.findAll('input')).toHaveLength(1);

    const attrs = wrapper.find('input').attributes();

    expect(attrs.class).toContain('date_input_class');
  });

  it('format date', () => {
    expect(vm.formattedValue).toEqual('10/08/2020');
  });

  it("doesn't format date if timestamp is zero", () => {
    wrapper = shallowMount(CalendarInputDate, {
      props: {
        timestamp: 0,
      },
    });

    expect(wrapper.vm.formattedValue).toEqual('');
  });

  it('change language', async () => {
    await wrapper.setProps({
      language: 'id',
      format: 'MMMM',
    });

    expect(vm.formattedValue).toEqual('Agustus');

    await wrapper.setProps({
      language: 'ms-my',
      format: 'MMMM',
    });

    expect(vm.formattedValue).toEqual('Ogos');
  });

  it('emit on-change when input change', async () => {
    wrapper.find('input').element.value = '24/10/2020';

    await wrapper.find('input').trigger('change');

    expect(wrapper.emitted('on-change')[0]).toEqual([new Date('2020 10 24')]);
  });

  it("doesn't emit on-change if input invalid", async () => {
    wrapper.find('input').element.value = 'ww/08/2020';

    await wrapper.find('input').trigger('change');

    expect(wrapper.emitted('on-change')).toBeFalsy();
  });
});
