import { shallowMount } from "@vue/test-utils";
import CalendarDialog from "@components/CalendarDialog/CalendarDialog.vue";
import CalendarInputDate from "@components/CalendarInputDate/CalendarInputDate.vue";

describe("Calendar Dialog : Calendar Input Date Implementation", () => {
  type MountCalendarDialogFN = typeof shallowMount<typeof CalendarDialog>;
  const mountCalendarDialog = (
    options: Parameters<MountCalendarDialogFN>[1]
  ) => {
    const wrapper = shallowMount(CalendarDialog, options);

    const inputDates = wrapper.findAllComponents(CalendarInputDate);

    const inputDateFrom = inputDates.at(0)!;
    const inputDateTo = inputDates.at(1)!;

    return {
      wrapper,
      inputDateFrom,
      inputDateTo,
    };
  };

  it("set date when input from date change", () => {
    const from = new Date("2024 07 01");
    const to = new Date("2024 07 15");

    const { wrapper, inputDateFrom } = mountCalendarDialog({
      props: {
        initialDates: [from, to],
      },
    });

    inputDateFrom.vm.$emit("change", new Date("2024 07 02"));

    expect(wrapper.vm.selectedStartDate).toEqual(new Date("2024 07 02"));
    expect(wrapper.vm.selectedEndDate).toEqual(to);

    inputDateFrom.vm.$emit("change", new Date("2024 07 16"));

    expect(wrapper.vm.selectedStartDate).toEqual(to);
    expect(wrapper.vm.selectedEndDate).toEqual(new Date("2024 07 16"));
  });

  it("set date when input to date change", () => {
    const from = new Date("2024 07 01");
    const to = new Date("2024 07 15");

    const { wrapper, inputDateTo } = mountCalendarDialog({
      props: {
        initialDates: [from, to],
      },
    });

    inputDateTo.vm.$emit("change", new Date("2024 07 02"));

    expect(wrapper.vm.selectedStartDate).toEqual(from);
    expect(wrapper.vm.selectedEndDate).toEqual(new Date("2024 07 02"));

    inputDateTo.vm.$emit("change", new Date("2024 07 16"));

    expect(wrapper.vm.selectedStartDate).toEqual(from);
    expect(wrapper.vm.selectedEndDate).toEqual(new Date("2024 07 16"));
  });
});
