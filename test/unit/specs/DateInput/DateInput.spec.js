/* eslint-disable import/no-unresolved */
import { shallowMount } from '@vue/test-utils';
import DateInput from '@/Components/DateInput.vue';
import 'regenerator-runtime';

describe('Date Input', () => {
  let wrapper; let
    vm;

  beforeEach(() => {
    wrapper = shallowMount(DateInput, {
      props: {
        placeholder: 'Select A Date',
        id: 'input_date',
        name: 'input_date',
        inputClass: 'input_class',
        required: true,
      },
    });

    vm = wrapper.vm;
  });

  it('should render correct contents', () => {
    expect(wrapper.findAll('input')).toHaveLength(1);

    const attrs = wrapper.find('input').attributes();

    expect(attrs.placeholder).toBe('Select A Date');
    expect(attrs.id).toBe('input_date');
    expect(attrs.name).toBe('input_date');
    expect(attrs.class).toContain('input_class');
    expect(attrs.required).toBe('');
  });

  it('format dates', async () => {
    await wrapper.setProps({
      format: 'DD/MM/YYYY HH:mm',
      sameDateFormat: {
        from: 'DD/MM/YYYY, HH:mm',
        to: 'HH:mm',
      },
      selectedStartDate: new Date('2020 08 01 00:00'),
      selectedEndDate: new Date('2020 08 15 23:59'),
    });

    expect(vm.formattedValue).toEqual('01/08/2020 00:00 - 15/08/2020 23:59');

    await wrapper.setProps({
      selectedStartDate: new Date('2020 08 02 00:00'),
      selectedEndDate: new Date('2020 08 02 23:59'),
    });

    expect(vm.formattedValue).toEqual('02/08/2020, 00:00 - 23:59');
  });

  it('emits on click', async () => {
    await wrapper.find('input').trigger('click');

    expect(wrapper.emitted('on-click')).toBeTruthy();
  });

  it('change language', async () => {
    await wrapper.setProps({
      format: 'MMMM',
      language: 'id',
      selectedStartDate: new Date('2020 07 01 00:00'),
      selectedEndDate: new Date('2020 08 15 23:59'),
    });

    expect(vm.formattedValue).toContain('Juli');
    expect(vm.formattedValue).toContain('Agustus');

    await wrapper.setProps({
      format: 'MMMM',
      language: 'ms-my',
      selectedStartDate: new Date('2020 07 01 00:00'),
      selectedEndDate: new Date('2020 08 15 23:59'),
    });

    expect(vm.formattedValue).toContain('Julai');
    expect(vm.formattedValue).toContain('Ogos');
  });
});
