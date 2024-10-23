import { shallowMount } from "@vue/test-utils";
import moment from "moment";
import Calendar from "@components/Calendar/Calendar.vue";
import "regenerator-runtime";

describe("Calendar : Disabled Dates", () => {
  const now = new Date();
  const startOfMonth = moment(now).startOf("month").toDate();
  const endOfMonth = moment(now).endOf("month").toDate();

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Calendar);
  });

  it("emit an event select-disabled-date when selected", () => {
    wrapper.vm.selectDate({ isDisabled: true });

    expect(wrapper.emitted("select-disabled-date")).toBeTruthy();
  });

  it("should disable dates 'from' a date & 'to' a date from disabledDates", async () => {
    await wrapper.setProps({
      disabledDates: {
        from: endOfMonth,
        to: startOfMonth,
      },
    });

    const future = moment(now).add(12, "y").toDate();
    const past = moment(now).subtract(20, "y").toDate();
    const middleOfMonth = moment(startOfMonth).add(14, "d");

    expect(wrapper.vm.isNextDisabled).toEqual(true);
    expect(wrapper.vm.isPrevDisabled).toEqual(true);

    expect(wrapper.vm.isDisabledDate(startOfMonth)).toEqual(true);
    expect(wrapper.vm.isDisabledDate(future)).toEqual(true);
    expect(wrapper.vm.isDisabledDate(middleOfMonth)).toEqual(false);
    expect(wrapper.vm.isDisabledDate(endOfMonth)).toEqual(true);
    expect(wrapper.vm.isDisabledDate(past)).toEqual(true);
  });

  it("should not disable next button and previous button if disabled 'to' is after disabled 'from'", async () => {
    await wrapper.setProps({
      disabledDates: {
        from: startOfMonth,
        to: endOfMonth,
      },
    });

    expect(wrapper.vm.isNextDisabled).toEqual(false);
    expect(wrapper.vm.isPrevDisabled).toEqual(false);
  });

  it("can't change to disabled 'from' date & 'to' date", async () => {
    await wrapper.setProps({
      disabledDates: {
        from: endOfMonth,
        to: startOfMonth,
      },
    });

    wrapper.vm.onPrevClick();
    expect(wrapper.emitted()["on-prev-calendar"]).toBeFalsy();
    wrapper.vm.onNextClick();
    expect(wrapper.emitted()["on-next-calendar"]).toBeFalsy();
  });

  it("should disable dates 'dates' from disabledDates", async () => {
    await wrapper.setProps({
      disabledDates: {
        dates: [
          new Date("2020 08 01"),
          new Date("2020 08 05"),
          new Date("2020 07 31"),
        ],
      },
    });

    expect(wrapper.vm.isDisabledDate(new Date("2020 08 02"))).toEqual(false);
    expect(wrapper.vm.isDisabledDate(new Date("2020 08 05"))).toEqual(true);
    expect(wrapper.vm.isDisabledDate(new Date("2020 07 31"))).toEqual(true);
  });

  it("should disabled dates 'ranges' from disabledDates", async () => {
    await wrapper.setProps({
      disabledDates: {
        ranges: [
          {
            from: new Date("2020 07 08"),
            to: new Date("2020 07 18"),
          },
          {
            from: new Date("2023 05 05"),
            to: new Date("2025 07 27"),
          },
        ],
      },
    });

    expect(wrapper.vm.isDisabledDate(new Date("2021 01 01"))).toEqual(false);
    expect(wrapper.vm.isDisabledDate(new Date("2020 07 03"))).toEqual(false);
    expect(wrapper.vm.isDisabledDate(new Date("2020 07 15"))).toEqual(true);
    expect(wrapper.vm.isDisabledDate(new Date("2023 08 01"))).toEqual(true);
  });

  it("should disabled date 'custom' function from disabledDates", async () => {
    await wrapper.setProps({
      disabledDates: {
        custom: (date) => date.getDate() % 2 === 0, // disable every even date
      },
    });

    expect(wrapper.vm.isDisabledDate(new Date("2020 01 01"))).toEqual(false);
    expect(wrapper.vm.isDisabledDate(new Date("2020 01 02"))).toEqual(true);
    expect(wrapper.vm.isDisabledDate(new Date("2045 05 07"))).toEqual(false);
  });
});
