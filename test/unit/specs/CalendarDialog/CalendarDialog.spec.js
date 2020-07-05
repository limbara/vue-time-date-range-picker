/* eslint-disable import/no-unresolved */
import CalendarDialog from '@/Components/CalendarDialog';
import Calendar from '@/Components/Calendar.vue';
import SwitchButton from '@/Components/SwitchButton.vue';
import CalendarInputDate from '@/Components/CalendarInputDate.vue';
import CalendarInputTime from '@/Components/CalendarInputTime.vue';
import { shallowMount, mount } from '@vue/test-utils';
import 'regenerator-runtime';

describe('Calendar Dialog', () => {
  const datePickerDialogClass = '.vdpr-datepicker__calendar-dialog';
  const datePickerActionsClass = '.vdpr-datepicker__calendar-actions';
  const datePickerHelperButtons = '.vdpr-datepicker__calendar-button-helper';
  const datePickerButtonSubmit = '.vdpr-datepicker__button-submit';

  let wrapper;

  it('should have correct default data', () => {
    wrapper = shallowMount(CalendarDialog);

    expect(wrapper.vm.selectedStartDate).toEqual(null);
    expect(wrapper.vm.selectedEndDate).toEqual(null);
    expect(wrapper.vm.isAllDay).toEqual(false);
  });

  it('should set correct data if initialized dates', () => {
    wrapper = shallowMount(CalendarDialog, {
      propsData: {
        initialDates: [
          new Date('2020 08 01 15:00'),
          new Date('2020 08 02 00:00'),
        ],
      },
    });

    expect(wrapper.vm.selectedStartDate).toEqual(new Date('2020 08 01 15:00'));
    expect(wrapper.vm.selectedEndDate).toEqual(new Date('2020 08 02 00:00'));
    expect(wrapper.vm.isAllDay).toEqual(false);

    wrapper = shallowMount(CalendarDialog, {
      propsData: {
        initialDates: [
          new Date('2020 08 01 00:00:00'),
          new Date('2020 08 02 23:59:59'),
        ],
      },
    });

    expect(wrapper.vm.isAllDay).toEqual(true);
  });

  it('should render correct contents', () => {
    wrapper = mount(CalendarDialog);

    expect(wrapper.find(datePickerDialogClass).exists()).toBe(true);
    expect(wrapper.find(datePickerHelperButtons).exists()).toBe(true);
    expect(wrapper.find(datePickerActionsClass).exists()).toBe(true);
    expect(wrapper.find(datePickerButtonSubmit).exists()).toBe(true);

    expect(wrapper.findComponent(Calendar).exists()).toBe(true);
    expect(wrapper.findComponent(SwitchButton).exists()).toBe(true);
    expect(wrapper.findAllComponents(CalendarInputDate)).toHaveLength(2);
    expect(wrapper.findAllComponents(CalendarInputTime)).toHaveLength(2);
  });

  it('should change switch button label', () => {
    wrapper = shallowMount(CalendarDialog, {
      propsData: {
        switchButtonLabel: 'Seharian',
      },
    });

    expect(wrapper.find(datePickerActionsClass).html()).toContain('Seharian');
  });

  it('emit on-apply when button apply clicked', async () => {
    wrapper = mount(CalendarDialog);

    const button = wrapper.find(datePickerButtonSubmit);

    await button.trigger('click');

    expect(wrapper.emitted('on-apply')).toBeTruthy();
  });
});
