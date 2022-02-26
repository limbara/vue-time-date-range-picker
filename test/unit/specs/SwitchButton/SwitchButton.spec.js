/* eslint-disable import/no-unresolved */
import { shallowMount } from '@vue/test-utils';
import SwitchButton from '@/Components/SwitchButton.vue';
import 'regenerator-runtime';

describe('Switch Button', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SwitchButton, {
      propsData: {
        checked: false,
      },
    });
  });

  it('emits on check change', async () => {
    await wrapper.trigger('click');

    expect(wrapper.emitted('on-check-change')).toBeTruthy();
  });
});
