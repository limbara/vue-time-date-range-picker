import { shallowMount } from "@vue/test-utils";
import CalendarDialog from "@components/CalendarDialog/CalendarDialog.vue";
import CalendarInputTime from "@components/CalendarInputTime/CalendarInputTime.vue";

describe("Calendar Dialog : Calendar Input Time Implementation", () => {
  type MountCalendarDialogFN = typeof shallowMount<typeof CalendarDialog>;

  const mountCalendarDialog = (
    options: Parameters<MountCalendarDialogFN>[1]
  ) => {
    const wrapper = shallowMount(CalendarDialog, options);
    const inputs = wrapper.findAllComponents(CalendarInputTime);

    const inputTimeStart = inputs.at(0)!;
    const inputTimeTo = inputs.at(1)!;

    return {
      wrapper,
      inputTimeStart,
      inputTimeTo,
    };
  };

  it("set date when input time start submitted", () => {
    const from = new Date("2024 07 01 01:00:00");
    const to = new Date("2024 07 01 15:00:00");

    const { wrapper, inputTimeStart } = mountCalendarDialog({
      props: {
        initialDates: [from, to],
      },
    });

    inputTimeStart.vm.$emit("change", new Date("2024 07 01 02:00:00"));

    expect(wrapper.vm.selectedStartDate).toEqual(
      new Date("2024 07 01 02:00:00")
    );
    expect(wrapper.vm.selectedEndDate).toEqual(to);

    inputTimeStart.vm.$emit("change", new Date("2024 07 01 24:00:00"));

    expect(wrapper.vm.selectedStartDate).toEqual(to);
    expect(wrapper.vm.selectedEndDate).toEqual(new Date("2024 07 02 00:00:00"));
  });

  it("set date when input time end submitted", () => {
    const from = new Date("2024 07 01 01:00:00");
    const to = new Date("2024 07 01 15:00:00");

    const { wrapper, inputTimeTo } = mountCalendarDialog({
      props: {
        initialDates: [from, to],
      },
    });

    inputTimeTo.vm.$emit("change", new Date("2024 07 01 20:00:00"));

    expect(wrapper.vm.selectedStartDate).toEqual(from);
    expect(wrapper.vm.selectedEndDate).toEqual(new Date("2024 07 01 20:00:00"));

    inputTimeTo.vm.$emit("change", new Date("2024 07 01 24:00:00"));

    expect(wrapper.vm.selectedStartDate).toEqual(from);
    expect(wrapper.vm.selectedEndDate).toEqual(new Date("2024 07 02 00:00:00"));
  });

  it("set date when input time start change", () => {
    const from = new Date("2024 07 01 01:00:00");
    const to = new Date("2024 07 01 15:00:00");

    const { wrapper, inputTimeStart } = mountCalendarDialog({
      props: {
        initialDates: [from, to],
      },
    });

    inputTimeStart.vm.$emit("change", new Date("2024 07 01 00:00:00"));

    expect(wrapper.vm.selectedStartDate).toEqual(
      new Date("2024 07 01 00:00:00")
    );
    expect(wrapper.vm.selectedEndDate).toEqual(to);

    inputTimeStart.vm.$emit("change", new Date("2024 07 01 18:00:00"));

    expect(wrapper.vm.selectedStartDate).toEqual(to);
    expect(wrapper.vm.selectedEndDate).toEqual(new Date("2024 07 01 18:00:00"));
  });

  it("set date when input time end change", () => {
    const from = new Date("2024 07 01 01:00:00");
    const to = new Date("2024 07 01 15:00:00");

    const { wrapper, inputTimeTo } = mountCalendarDialog({
      props: {
        initialDates: [from, to],
      },
    });

    inputTimeTo.vm.$emit("change", new Date("2024 07 01 16:00:00"));

    expect(wrapper.vm.selectedStartDate).toEqual(from);
    expect(wrapper.vm.selectedEndDate).toEqual(new Date("2024 07 01 16:00:00"));

    inputTimeTo.vm.$emit("change", new Date("2024 07 01 00:00:00"));
    expect(wrapper.vm.selectedStartDate).toEqual(
      new Date("2024 07 01 00:00:00")
    );
    expect(wrapper.vm.selectedEndDate).toEqual(from);
  });
});
