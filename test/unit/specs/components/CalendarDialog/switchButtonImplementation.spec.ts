import { shallowMount } from "@vue/test-utils";
import moment from "moment";
import CalendarDialog from "@components/CalendarDialog/CalendarDialog.vue";
import SwitchButton from "@components/SwitchButton/SwitchButton.vue";

describe("Calendar Dialog : Switch Button Implementation", () => {
  const startDate = new Date("2020 07 01");
  const endDate = new Date("2020 07 15");

  it("change date to start of day & end of day if check true", () => {
    const wrapper = shallowMount(CalendarDialog, {
      props: {
        initialDates: [startDate, endDate],
        switchButtonInitial: false,
      },
    });

    const switchButton = wrapper.findComponent(SwitchButton);
    switchButton.vm.$emit("change", { target: { checked: true } });

    expect(wrapper.vm.isAllDayChecked).toEqual(true);
    expect(wrapper.vm.selectedStartDate).toEqual(
      moment(startDate).startOf("day").toDate()
    );
    expect(wrapper.vm.selectedEndDate).toEqual(
      moment(endDate).endOf("day").toDate()
    );
  });

  it("change date to start of day & start of day if check false", () => {
    const wrapper = shallowMount(CalendarDialog, {
      props: {
        initialDates: [startDate, endDate],
        isAllDay: true,
      },
    });

    const switchButton = wrapper.findComponent(SwitchButton);
    switchButton.vm.$emit("change", { target: { checked: false } });

    expect(wrapper.vm.isAllDayChecked).toEqual(false);
    expect(wrapper.vm.selectedStartDate).toEqual(
      moment(startDate).startOf("day").toDate()
    );
    expect(wrapper.vm.selectedEndDate).toEqual(
      moment(endDate).startOf("day").toDate()
    );
  });
});
