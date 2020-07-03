/* eslint-disable import/no-unresolved */
import DateInput from '@/Components/DateInput.vue';
import { shallowMount } from '@vue/test-utils';

describe('Date Input', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(DateInput, {
      propsData: {
        placeholder: 'Select A Date',
        selectedStartDate: new Date('2020 08 01 00:00'),
        selectedEndDate: new Date('2020 08 15 23:59'),
      },
    });
  });

  it('should render correct contents', () => {
    expect(wrapper.findAll('input')).toHaveLength(1);
  });
});
