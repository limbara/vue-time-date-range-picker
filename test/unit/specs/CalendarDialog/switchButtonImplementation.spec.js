/* eslint-disable import/no-unresolved */
import { mount } from '@vue/test-utils';
import moment from 'moment';
import CalendarDialog from '@/Components/CalendarDialog.vue';
import SwitchButton from '@/Components/SwitchButton.vue';

describe('Calendar Dialog : Switch Button Implementation', () => {
  const startDate = new Date('2020 07 01');
  const endDate = new Date('2020 07 15');
  let wrapper;

  it('change date to start of day & end of day if check true', () => {
    wrapper = mount(CalendarDialog, {
      data() {
        return {
          selectedStartDate: startDate,
          selectedEndDate: endDate,
          isAllDay: false,
        };
      },
    });

    const switchButton = wrapper.findComponent(SwitchButton);
    switchButton.vm.$emit('on-check-change', true);

    expect(wrapper.vm.isAllDay).toEqual(true);
    expect(wrapper.vm.selectedStartDate).toEqual(
      moment(startDate).startOf('day').toDate(),
    );
    expect(wrapper.vm.selectedEndDate).toEqual(
      moment(endDate).endOf('day').toDate(),
    );
  });

  it('change date to start of day & start of day if check false', () => {
    wrapper = mount(CalendarDialog, {
      data() {
        return {
          selectedStartDate: startDate,
          selectedEndDate: endDate,
          isAllDay: true,
        };
      },
    });

    const switchButton = wrapper.findComponent(SwitchButton);
    switchButton.vm.$emit('on-check-change', false);

    expect(wrapper.vm.isAllDay).toEqual(false);
    expect(wrapper.vm.selectedStartDate).toEqual(
      moment(startDate).startOf('day').toDate(),
    );
    expect(wrapper.vm.selectedEndDate).toEqual(
      moment(endDate).startOf('day').toDate(),
    );
  });
});
