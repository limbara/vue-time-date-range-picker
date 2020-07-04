/* eslint-disable import/no-unresolved */
import SwitchButton from '@/Components/SwitchButton.vue';
import { shallowMount } from '@vue/test-utils';
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
