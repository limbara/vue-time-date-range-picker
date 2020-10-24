/* eslint-disable import/no-unresolved */
import CalendarDialog from '@/Components/CalendarDialog';
import CalendarInputTime from '@/Components/CalendarInputTime.vue';
import { mount } from '@vue/test-utils';

describe('Calendar Dialog : Calendar Input Time Implementation', () => {
  const startDate = new Date('2020 07 01 01:00:00');
  const endDate = new Date('2020 07 01 15:00:00');
  let wrapper; let inputTimeStart; let
    inputTimeTo;

  beforeEach(() => {
    wrapper = mount(CalendarDialog, {
      data() {
        return {
          selectedStartDate: startDate,
          selectedEndDate: endDate,
        };
      },
    });
    const inputs = wrapper.findAllComponents(CalendarInputTime);

    inputTimeStart = inputs.at(0);

    inputTimeTo = inputs.at(1);
  });

  it('set date when input time start submitted', () => {
    const e = 'on-change';

    inputTimeStart.vm.$emit(e, new Date('2020 07 01 02:00:00'));

    expect(wrapper.vm.selectedStartDate).toEqual(new Date('2020 07 01 02:00:00'));
    expect(wrapper.vm.selectedEndDate).toEqual(endDate);

    inputTimeStart.vm.$emit(e, new Date('2020 07 01 24:00:00'));

    expect(wrapper.vm.selectedStartDate).toEqual(endDate);
    expect(wrapper.vm.selectedEndDate).toEqual(new Date('2020 07 02 00:00:00'));
  });

  it('set date when input time end submitted', () => {
    const e = 'on-change';

    inputTimeTo.vm.$emit(e, new Date('2020 07 01 20:00:00'));

    expect(wrapper.vm.selectedStartDate).toEqual(startDate);
    expect(wrapper.vm.selectedEndDate).toEqual(new Date('2020 07 01 20:00:00'));

    inputTimeTo.vm.$emit(e, new Date('2020 07 01 24:00:00'));

    expect(wrapper.vm.selectedStartDate).toEqual(startDate);
    expect(wrapper.vm.selectedEndDate).toEqual(new Date('2020 07 02 00:00:00'));
  });

  it('set date when input time start change', () => {
    const e = 'on-change';

    inputTimeStart.vm.$emit(e, new Date('2020 07 01 00:00:00'));

    expect(wrapper.vm.selectedStartDate).toEqual(new Date('2020 07 01 00:00:00'));
    expect(wrapper.vm.selectedEndDate).toEqual(endDate);

    inputTimeStart.vm.$emit(e, new Date('2020 07 01 18:00:00'));

    expect(wrapper.vm.selectedStartDate).toEqual(endDate);
    expect(wrapper.vm.selectedEndDate).toEqual(new Date('2020 07 01 18:00:00'));
  });

  it('set date when input time end change', () => {
    const e = 'on-change';

    inputTimeTo.vm.$emit(e, new Date('2020 07 01 16:00:00'));

    expect(wrapper.vm.selectedStartDate).toEqual(startDate);
    expect(wrapper.vm.selectedEndDate).toEqual(new Date('2020 07 01 16:00:00'));

    inputTimeTo.vm.$emit(e, new Date('2020 07 01 00:00:00'));
    expect(wrapper.vm.selectedStartDate).toEqual(new Date('2020 07 01 00:00:00'));
    expect(wrapper.vm.selectedEndDate).toEqual(startDate);
  });
});
