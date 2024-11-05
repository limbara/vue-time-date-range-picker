import { shallowMount, mount } from "@vue/test-utils";
import CalendarDialog from "@components/CalendarDialog/CalendarDialog.vue";
import Calendar from "@components/Calendar/Calendar.vue";
import SwitchButton from "@components/SwitchButton/SwitchButton.vue";
import CalendarInputDate from "@components/CalendarInputDate/CalendarInputDate.vue";
import CalendarInputTime from "@components/CalendarInputTime/CalendarInputTime.vue";
import "regenerator-runtime";
import "@testing-library/jest-dom";

describe("Calendar Dialog", () => {
  const datePickerDialogClass = ".vdpr-datepicker__calendar-dialog";
  const datePickerActionsClass = ".vdpr-datepicker__calendar-actions";
  const datePickerHelperButtons = ".vdpr-datepicker__calendar-button-helper";
  const datePickerButtonSubmit = ".vdpr-datepicker__button-submit";
  const datePickerButtonReset = ".vdpr-datepicker__button-reset";

  it("should have correct default data", () => {
    const wrapper = shallowMount(CalendarDialog);

    expect(wrapper.vm.selectedStartDate).toEqual(null);
    expect(wrapper.vm.selectedEndDate).toEqual(null);
    expect(wrapper.vm.isAllDayChecked).toEqual(false);
  });

  it("should set correct data if initialized dates", () => {
    const from = new Date("2020 08 01 15:00:00");
    const to = new Date("2020 08 02 00:00:00");

    const wrapper = shallowMount(CalendarDialog, {
      props: {
        initialDates: [from, to],
      },
    });

    expect(wrapper.vm.selectedStartDate).toEqual(from);
    expect(wrapper.vm.selectedEndDate).toEqual(to);
    expect(wrapper.vm.isAllDayChecked).toEqual(false);
  });

  it("should set correct data if initialDates is all days", () => {
    const from = new Date("2020 08 01 00:00:00");
    const to = new Date("2020 08 02 23:59:59");

    const wrapper = shallowMount(CalendarDialog, {
      props: {
        initialDates: [from, to],
      },
    });

    expect(wrapper.vm.selectedStartDate).toEqual(from);
    expect(wrapper.vm.selectedEndDate).toEqual(to);
    expect(wrapper.vm.isAllDayChecked).toEqual(true);
  });

  it("should render correct contents", () => {
    const wrapper = mount(CalendarDialog, {
      props: {
        initialDates: [
          new Date("2020 08 01 00:00:00"),
          new Date("2020 08 02 23:59:59"),
        ],
        dateInput: {
          format: "DD/MM/YYYY",
        },
      },
    });

    expect(wrapper.find(datePickerDialogClass).exists()).toBe(true);
    expect(wrapper.find(datePickerHelperButtons).exists()).toBe(true);
    expect(wrapper.find(datePickerActionsClass).exists()).toBe(true);
    expect(wrapper.find(datePickerButtonSubmit).exists()).toBe(true);
    expect(wrapper.find(datePickerButtonReset).exists()).toBe(true);

    const comCalendar = wrapper.findComponent(Calendar);
    const inputDates = wrapper.findAllComponents(CalendarInputDate);
    const comSwitchButton = wrapper.findComponent(SwitchButton);
    const inputTimes = wrapper.findAllComponents(CalendarInputTime);

    expect(comCalendar.exists()).toBe(true);
    expect(comSwitchButton.exists()).toBe(true);
    expect(inputDates).toHaveLength(2);
    expect(inputTimes).toHaveLength(2);

    const inputDateStart = inputDates?.at(0)?.find("input");
    const inputDateEnd = inputDates?.at(1)?.find("input");
    const inputTimeStart = inputTimes?.at(0)?.find("input");
    const inputTimeEnd = inputTimes?.at(1)?.find("input");

    expect(inputDateStart?.element.value).toEqual("01/08/2020");
    expect(inputDateEnd?.element.value).toEqual("02/08/2020");
    expect(inputTimeStart?.element.value).toEqual("00:00");
    expect(inputTimeEnd?.element.value).toEqual("23:59");
  });

  it("should change switch button checked with switchButtonInitial", async () => {
    const wrapper = mount(CalendarDialog, {
      attachTo: document.body,
      props: {
        switchButtonInitial: true,
      },
    });

    const comSwitchButton = wrapper.findComponent(SwitchButton);
    const inputCheckbox = comSwitchButton.find("input");

    expect(inputCheckbox.element).toBeChecked();

    await wrapper.setProps({
      switchButtonInitial: false,
    });

    expect(inputCheckbox.element).not.toBeChecked();
  });

  it("should change switch button label", () => {
    const wrapper = shallowMount(CalendarDialog, {
      props: {
        switchButtonLabel: "Seharian",
      },
    });

    expect(wrapper.find(datePickerActionsClass).html()).toContain("Seharian");
  });

  it("should change apply button label", () => {
    const wrapper = shallowMount(CalendarDialog, {
      props: {
        applyButtonLabel: "Use",
      },
    });

    expect(wrapper.find(datePickerButtonSubmit).html()).toContain("Use");
  });

  it("should change reset button label", () => {
    const wrapper = shallowMount(CalendarDialog, {
      props: {
        resetButtonLabel: "Restart",
      },
    });

    expect(wrapper.find(datePickerButtonReset).html()).toContain("Restart");
  });

  it("emit on-apply when button apply clicked", async () => {
    const from = new Date("2024 07 26");
    const to = new Date("2024 07 26");

    const wrapper = shallowMount(CalendarDialog, {
      props: {
        initialDates: [from, to],
      },
    });
    const button = wrapper.find(datePickerButtonSubmit);

    await button.trigger("click");

    const onApplyEvent = wrapper.emitted("on-apply");

    expect(onApplyEvent).toHaveLength(1);
    expect(onApplyEvent?.[0]).toEqual([from, to]);
  });
});
