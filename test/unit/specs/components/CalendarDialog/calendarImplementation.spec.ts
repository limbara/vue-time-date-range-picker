import { shallowMount } from "@vue/test-utils";
import moment from "moment";
import CalendarDialog from "@components/CalendarDialog/CalendarDialog.vue";
import Calendar from "@components/Calendar/Calendar.vue";
import { InitialDate } from "@composables/useSelectedDates";

describe("Calendar Dialog : Calendar Implementation", () => {
  describe("emit event select-date correctly", () => {
    it("when no initial dates, select start & end date with the same date", () => {
      const date = new Date("2024 07 23");

      const wrapper = shallowMount(CalendarDialog);
      const calendar = wrapper.findComponent(Calendar);

      calendar.vm.$emit("select-date", date);

      const selectDateEvent = wrapper.emitted("select-date");

      expect(selectDateEvent).toHaveLength(1);
      expect(selectDateEvent?.[0]).toEqual([date, date]);
    });

    it("when only initial end date supplied", () => {
      const from = new Date("2024 07 23");
      const to = new Date("2024 07 26");
      const initialDates: InitialDate = [null, to];

      const wrapper = shallowMount(CalendarDialog, {
        props: {
          initialDates,
        },
      });
      const calendar = wrapper.findComponent(Calendar);

      calendar.vm.$emit("select-date", from);

      const selectDateEvent = wrapper.emitted("select-date");

      expect(selectDateEvent).toHaveLength(1);
      expect(selectDateEvent?.[0]).toEqual([from, to]);
    });

    it("when only initial start date supplied", () => {
      const from = new Date("2024 07 23");
      const to = new Date("2024 07 26");
      const initialDates: InitialDate = [from, null];

      const wrapper = shallowMount(CalendarDialog, {
        props: {
          initialDates,
        },
      });
      const calendar = wrapper.findComponent(Calendar);

      calendar.vm.$emit("select-date", to);

      const selectDateEvent = wrapper.emitted("select-date");

      expect(selectDateEvent).toHaveLength(1);
      expect(selectDateEvent?.[0]).toEqual([from, to]);
    });

    it("when from date is less than to date", () => {
      const from = new Date("2024 07 23");
      const to = new Date("2024 07 26");

      const wrapper = shallowMount(CalendarDialog);
      const calendar = wrapper.findComponent(Calendar);

      calendar.vm.$emit("select-date", from);

      const selectDateEvent = wrapper.emitted("select-date");

      expect(selectDateEvent).toHaveLength(1);
      expect(selectDateEvent?.[0]).toEqual([from, from]);

      calendar.vm.$emit("select-date", to);

      expect(selectDateEvent).toHaveLength(2);
      expect(selectDateEvent?.[1]).toEqual([from, to]);
    });

    it("when to date less than from date", () => {
      const from = new Date("2024 07 26");
      const to = new Date("2024 07 23");

      const wrapper = shallowMount(CalendarDialog);
      const calendar = wrapper.findComponent(Calendar);

      calendar.vm.$emit("select-date", from);

      const selectDateEvent = wrapper.emitted("select-date");

      expect(selectDateEvent).toHaveLength(1);
      expect(selectDateEvent?.[0]).toEqual([from, from]);

      calendar.vm.$emit("select-date", to);

      expect(selectDateEvent).toHaveLength(2);
      expect(selectDateEvent?.[1]).toEqual([to, from]);
    });

    it("when all days is checked", () => {
      const date = new Date("2024 07 26");

      const wrapper = shallowMount(CalendarDialog, {
        attachTo: document.body,
        props: {
          switchButtonInitial: true,
        },
      });

      const calendar = wrapper.findComponent(Calendar);

      calendar.vm.$emit("select-date", date);

      const selectDateEvent = wrapper.emitted("select-date");

      expect(selectDateEvent).toHaveLength(1);
      expect(selectDateEvent?.[0]).toEqual([
        moment(date).startOf("day").toDate(),
        moment(date).endOf("day").toDate(),
      ]);
    });
  });

  it("emit select-disabled-date event", () => {
    const date = new Date("2024 08 01");

    const wrapper = shallowMount(CalendarDialog);
    const calendar = wrapper.findComponent(Calendar);

    calendar.vm.$emit("select-disabled-date", date);

    const selectDisabledDateEvent = wrapper.emitted("select-disabled-date");

    expect(selectDisabledDateEvent).toHaveLength(1);
    expect(selectDisabledDateEvent?.[0]).toEqual([date]);
  });

  it("emit on-prev-calendar event", () => {
    const wrapper = shallowMount(CalendarDialog);
    const calendar = wrapper.findComponent(Calendar);

    calendar.vm.$emit("on-prev-calendar");

    expect(wrapper.emitted("on-prev-calendar")).toHaveLength(1);
  });

  it("emit on-next-calendar event", () => {
    const wrapper = shallowMount(CalendarDialog);
    const calendar = wrapper.findComponent(Calendar);

    calendar.vm.$emit("on-next-calendar");

    expect(wrapper.emitted("on-next-calendar")).toHaveLength(1);
  });
});
