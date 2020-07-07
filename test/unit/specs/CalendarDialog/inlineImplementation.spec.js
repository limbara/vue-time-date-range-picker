/* eslint-disable import/no-unresolved */
import CalendarDialog from '@/Components/CalendarDialog';
import { mount } from '@vue/test-utils';
import 'regenerator-runtime';
import '@testing-library/jest-dom';

describe('Calendar Dialog : inline Implementation', () => {
  const datePickerButtonSubmit = '.vdpr-datepicker__button-submit';
  const inlineClass = '.vdpr-datepicker__calendar-dialog--inline';

  let wrapper;

  beforeEach(() => {
    wrapper = mount(CalendarDialog, {
      propsData: {
        inline: true,
      },
    });
  });

  it('should render correct contents', () => {
    expect(wrapper.find(inlineClass).exists()).toBe(true);
    expect(wrapper.find(datePickerButtonSubmit).element).not.toBeVisible();
  });

  it('emit on-apply if inline', () => {
    wrapper.vm.emitOnApplyIfInline();

    expect(wrapper.emitted('on-apply')).toBeTruthy();
  });
});
