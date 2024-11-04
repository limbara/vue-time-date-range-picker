
import { mount, VueWrapper } from '@vue/test-utils';
import CalendarDialog from '@components/CalendarDialog/CalendarDialog.vue';
import CalendarInputDate from '@components/CalendarInputDate/CalendarInputDate.vue';

describe('Calendar Dialog : Calendar Input Date Implementation', () => {
  const startDate = new Date('2020 07 01');
  const endDate = new Date('2020 07 15');
  
  let wrapper: ReturnType<typeof mount<typeof CalendarDialog>>; 
  let inputDateFrom: VueWrapper<InstanceType<typeof CalendarInputDate>>; 
  let inputDateTo: VueWrapper<InstanceType<typeof CalendarInputDate>>;

  beforeEach(() => {
    wrapper = mount(CalendarDialog, {
      props: {
        initialDates: [startDate, endDate],
      }
    });
    const inputDates = wrapper.findAllComponents(CalendarInputDate);

    inputDateFrom = inputDates.at(0)!;
    inputDateTo = inputDates.at(1)!;
  });

  it('set date when input from date submitted', () => {
    const e = 'change';
    inputDateFrom.vm.$emit(e, new Date('2020 07 02'));

    expect(wrapper.vm.selectedStartDate).toEqual(new Date('2020 07 02'));
    expect(wrapper.vm.selectedEndDate).toEqual(new Date('2020 07 15'));

    inputDateFrom.vm.$emit(e, new Date('2020 07 16'));

    expect(wrapper.vm.selectedStartDate).toEqual(new Date('2020 07 15'));
    expect(wrapper.vm.selectedEndDate).toEqual(new Date('2020 07 16'));
  });

  it('set date when input to date submitted', () => {
    const e = 'change';
    inputDateTo.vm.$emit(e, new Date('2020 07 02'));

    expect(wrapper.vm.selectedStartDate).toEqual(new Date('2020 07 01'));
    expect(wrapper.vm.selectedEndDate).toEqual(new Date('2020 07 02'));

    inputDateTo.vm.$emit(e, new Date('2020 07 16'));

    expect(wrapper.vm.selectedStartDate).toEqual(new Date('2020 07 01'));
    expect(wrapper.vm.selectedEndDate).toEqual(new Date('2020 07 16'));
  });
});
