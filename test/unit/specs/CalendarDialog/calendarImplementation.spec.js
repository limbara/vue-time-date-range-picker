import { mount } from "@vue/test-utils";
import moment from "moment";
import CalendarDialog from "@/components/CalendarDialog.vue";
import Calendar from "@/components/Calendar/Calendar.vue";

describe("Calendar Dialog : Calendar Implementation", () => {
  let wrapper;
  let calendar;

  beforeEach(() => {
    wrapper = mount(CalendarDialog);
    calendar = wrapper.findComponent(Calendar);
  });

  it("emit select-date event & apply correct date", () => {
    calendar.vm.$emit("select-date", new Date("2020 07 26"));

    expect(wrapper.emitted("select-date")[0]).toEqual([
      new Date("2020 07 26"),
      new Date("2020 07 26"),
    ]);

    calendar.vm.$emit("select-date", new Date("2020 07 23"));

    expect(wrapper.emitted("select-date")[1]).toEqual([
      new Date("2020 07 23"),
      new Date("2020 07 26"),
    ]);
  });

  it("emit select-date event & apply correct date when allDays is true", () => {
    wrapper = mount(CalendarDialog, {
      data() {
        return {
          selectedStartDate: null,
          selectedEndDate: null,
          isAllDay: true,
        };
      },
    });

    calendar = wrapper.findComponent(Calendar);
    calendar.vm.$emit("select-date", new Date("2020 07 26"));

    expect(wrapper.emitted("select-date")[0]).toEqual([
      moment(new Date("2020 07 26")).startOf("day").toDate(),
      moment(new Date("2020 07 26")).endOf("day").toDate(),
    ]);
  });

  it("emit select-disabled-date event", () => {
    const e = "select-disabled-date";

    calendar.vm.$emit(e, new Date("2020 08 01"));
    expect(wrapper.emitted(e)[0][0]).toEqual(new Date("2020 08 01"));
  });

  it("emit on-prev-calendar event", () => {
    const e = "on-prev-calendar";

    calendar.vm.$emit(e);
    expect(wrapper.emitted(e)).toBeTruthy();
  });

  it("emit on-next-calendar event", () => {
    const e = "on-next-calendar";

    calendar.vm.$emit(e);
    expect(wrapper.emitted(e)).toBeTruthy();
  });
});
