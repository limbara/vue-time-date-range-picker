/* eslint-disable import/no-unresolved */
import { mount } from '@vue/test-utils';
import CalendarDialog from '@/Components/CalendarDialog.vue';
import CalendarInputDate from '@/Components/CalendarInputDate.vue';

describe('Calendar Dialog : Calendar Input Date Implementation', () => {
  const startDate = new Date('2020 07 01');
  const endDate = new Date('2020 07 15');
  let wrapper; let inputDateFrom; let
    inputDateTo;

  beforeEach(() => {
    wrapper = mount(CalendarDialog, {
      data() {
        return {
          selectedStartDate: startDate,
          selectedEndDate: endDate,
        };
      },
    });
    const inputDates = wrapper.findAllComponents(CalendarInputDate);

    inputDateFrom = inputDates.at(0);
    inputDateTo = inputDates.at(1);
  });

  it('set date when input from date submitted', () => {
    const e = 'on-change';
    inputDateFrom.vm.$emit(e, new Date('2020 07 02'));

    expect(wrapper.vm.selectedStartDate).toEqual(new Date('2020 07 02'));
    expect(wrapper.vm.selectedEndDate).toEqual(new Date('2020 07 15'));

    inputDateFrom.vm.$emit(e, new Date('2020 07 16'));

    expect(wrapper.vm.selectedStartDate).toEqual(new Date('2020 07 15'));
    expect(wrapper.vm.selectedEndDate).toEqual(new Date('2020 07 16'));
  });

  it('set date when input to date submitted', () => {
    const e = 'on-change';
    inputDateTo.vm.$emit(e, new Date('2020 07 02'));

    expect(wrapper.vm.selectedStartDate).toEqual(new Date('2020 07 01'));
    expect(wrapper.vm.selectedEndDate).toEqual(new Date('2020 07 02'));

    inputDateTo.vm.$emit(e, new Date('2020 07 16'));

    expect(wrapper.vm.selectedStartDate).toEqual(new Date('2020 07 01'));
    expect(wrapper.vm.selectedEndDate).toEqual(new Date('2020 07 16'));
  });
});
