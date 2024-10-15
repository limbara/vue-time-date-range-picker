import { shallowMount } from "@vue/test-utils";
import moment from "moment";
import Calendar from "@/components/Calendar.vue";
import "regenerator-runtime";

describe("Calendar : Initialized Dates", () => {
  const startDate = new Date("2020 08 01");
  const endDate = new Date("2020 08 05");

  let wrapper;
  let vm;

  beforeEach(() => {
    wrapper = shallowMount(Calendar, {
      props: {
        selectedStartDate: startDate,
        selectedEndDate: endDate,
      },
    });

    vm = wrapper.vm;
  });

  it("should show initialized calendar page", () => {
    const index = vm.days.find(
      (day) =>
        day.date.getFullYear() === startDate.getFullYear() &&
        day.date.getMonth() === startDate.getMonth() &&
        day.date.getDate() === startDate.getDate()
    );

    expect(index !== -1).toBe(true);
  });

  it("should show initialized month year", () => {
    const monthYear = moment(startDate).format("MMM YYYY");

    expect(vm.monthYear === monthYear).toBe(true);
  });
});
