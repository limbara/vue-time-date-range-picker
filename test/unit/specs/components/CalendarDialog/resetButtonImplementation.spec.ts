import { mount, shallowMount } from "@vue/test-utils";
import CalendarDialog from "@components/CalendarDialog/CalendarDialog.vue";
import CalendarInputDate from "@components/CalendarInputDate/CalendarInputDate.vue";
import CalendarInputTime from "@components/CalendarInputTime/CalendarInputTime.vue";
import Calendar from "@components/Calendar/Calendar.vue";
import "regenerator-runtime";

describe("Calendar Dialog : Reset Button Implementation", () => {
  const datePickerButtonReset = ".vdpr-datepicker__button-reset";
  const startDate = new Date("2021 06 01");
  const endDate = new Date("2021 06 30");

  type MountCalendarDialogFN = typeof shallowMount<typeof CalendarDialog>;

  const mountCalendarDialog = (
    options?: Parameters<MountCalendarDialogFN>[1]
  ) => {
    const wrapper = mount(CalendarDialog, {
      ...options,
      props: {
        initialDates: [startDate, endDate],
        switchButtonInitial: false,
        ...options?.props,
      },
    });

    const resetButton = wrapper.find(datePickerButtonReset);

    return {
      wrapper,
      resetButton,
    };
  };

  it("reset calendar dialog data", async () => {
    const { wrapper, resetButton } = mountCalendarDialog();

    await resetButton.trigger("click");

    expect(wrapper.vm.selectedStartDate).toBeNull();
    expect(wrapper.vm.selectedEndDate).toBeNull();
    expect(wrapper.vm.isAllDayChecked).toBe(false);
  });

  it("emit on-reset event", async () => {
    const { wrapper, resetButton } = mountCalendarDialog();

    await resetButton.trigger("click");

    expect(wrapper.emitted("on-reset")).toHaveLength(1);
  });

  it("reset input date value", async () => {
    const { wrapper, resetButton } = mountCalendarDialog();

    const inputDates = wrapper.findAllComponents(CalendarInputDate);
    const inputStartDate = inputDates.at(0);
    const inputEndDate = inputDates.at(1);

    await resetButton.trigger("click");

    expect(inputStartDate?.find("input").element.value).toBe("");
    expect(inputEndDate?.find("input").element.value).toBe("");
  });

  it("reset input time value", async () => {
    const { wrapper, resetButton } = mountCalendarDialog();

    const inputTimes = wrapper.findAllComponents(CalendarInputTime);
    const inputStartTime = inputTimes.at(0);
    const inputEndTime = inputTimes.at(1);

    await resetButton.trigger("click");

    expect(inputStartTime?.find("input").element.value).toBe("");
    expect(inputEndTime?.find("input").element.value).toBe("");
  });

  it("reset calendar highlighted day", async () => {
    const { wrapper, resetButton } = mountCalendarDialog();

    const calendar = wrapper.findComponent(Calendar);

    await resetButton.trigger("click");

    expect(calendar.findAll(".highlighted").length).toBe(0);
  });
});
