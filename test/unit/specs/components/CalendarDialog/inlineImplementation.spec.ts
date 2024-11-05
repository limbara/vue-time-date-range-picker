import { shallowMount } from "@vue/test-utils";
import CalendarDialog from "@components/CalendarDialog/CalendarDialog.vue";
import "regenerator-runtime";
import "@testing-library/jest-dom";
import CalendarInputDate from "@components/CalendarInputDate/CalendarInputDate.vue";
import CalendarInputTime from "@components/CalendarInputTime/CalendarInputTime.vue";
import SwitchButton from "@components/SwitchButton/SwitchButton.vue";
import moment from "moment";

describe("Calendar Dialog : inline Implementation", () => {
  const datePickerButtonSubmit = ".vdpr-datepicker__button-submit";
  const inlineClass = ".vdpr-datepicker__calendar-dialog--inline";

  it("should render correct contents", () => {
    const wrapper = shallowMount(CalendarDialog, {
      props: {
        inline: true,
      },
    });

    expect(wrapper.find(inlineClass).exists()).toBe(true);
    expect(wrapper.find(datePickerButtonSubmit).element).not.toBeVisible();
  });

  describe("doesn't emit on-apply if", () => {
    it("only start input date time changes", () => {
      const from = new Date("2024 07 12");

      const wrapper = shallowMount(CalendarDialog, {
        props: {
          inline: true,
        },
      });

      const inputDates = wrapper.findAllComponents(CalendarInputDate);
      const [startInput] = inputDates;
      const inputTimes = wrapper.findAllComponents(CalendarInputTime);
      const [startTimeInput] = inputTimes;

      const onApplyEvent = wrapper.emitted("on-apply");

      startInput.vm.$emit("change", from);
      expect(onApplyEvent).toBeUndefined();

      from.setHours(10, 0);
      startTimeInput.vm.$emit("change", from);
      expect(onApplyEvent).toBeUndefined();
    });

    it("only end input date time changes", async () => {
      const to = new Date("2024 07 12");

      const wrapper = shallowMount(CalendarDialog, {
        props: {
          inline: true,
        },
      });

      const inputDates = wrapper.findAllComponents(CalendarInputDate);
      const [, endInput] = inputDates;
      const inputTimes = wrapper.findAllComponents(CalendarInputTime);
      const [, endTimeInput] = inputTimes;

      endInput.vm.$emit("change", to);
      expect(wrapper.emitted("on-apply")).toBeUndefined();

      to.setHours(12, 0);
      endTimeInput.vm.$emit("change", to);
      expect(wrapper.emitted("on-apply")).toBeUndefined();
    });
  });

  describe("emit on-apply if inline", () => {
    it("when start & end input date changes", async () => {
      const from = new Date("2024 07 12");
      const to = new Date("2024 07 14");

      const wrapper = shallowMount(CalendarDialog, {
        props: {
          inline: true,
        },
      });

      const inputDates = wrapper.findAllComponents(CalendarInputDate);
      const [startInput, endInput] = inputDates;

      startInput.vm.$emit("change", from);
      endInput.vm.$emit("change", to);

      const onApplyEvent = wrapper.emitted("on-apply");

      expect(onApplyEvent).toHaveLength(1);
      expect(onApplyEvent?.[0]).toEqual([from, to]);
    });

    it("when start & end input time changes", () => {
      const from = new Date("2024 07 12");
      const to = new Date("2024 07 14");

      const wrapper = shallowMount(CalendarDialog, {
        props: {
          inline: true,
        },
      });

      const inputDates = wrapper.findAllComponents(CalendarInputDate);
      const [startInput, endInput] = inputDates;
      const inputTimes = wrapper.findAllComponents(CalendarInputTime);
      const [startTimeInput, endTimeInput] = inputTimes;

      startInput.vm.$emit("change", from);
      endInput.vm.$emit("change", to);

      const onApplyEvent = wrapper.emitted("on-apply");

      expect(onApplyEvent).toHaveLength(1);
      expect(onApplyEvent?.[0]).toEqual([from, to]);

      from.setHours(10, 0);
      startTimeInput.vm.$emit("change", from);
      expect(onApplyEvent).toHaveLength(2);
      expect(onApplyEvent?.[1]).toEqual([from, to]);

      to.setHours(12, 0);
      endTimeInput.vm.$emit("change", to);
      expect(onApplyEvent).toHaveLength(3);
      expect(onApplyEvent?.[2]).toEqual([from, to]);
    });

    it("when all day check changes", () => {
      const from = new Date("2024 07 12");
      const to = new Date("2024 07 14");

      const wrapper = shallowMount(CalendarDialog, {
        attachTo: document.body,
        props: {
          inline: true,
          switchButtonInitial: false,
        },
      });

      const inputDates = wrapper.findAllComponents(CalendarInputDate);
      const [startInput, endInput] = inputDates;
      const switchButton = wrapper.findComponent(SwitchButton);

      startInput.vm.$emit("change", from);
      endInput.vm.$emit("change", to);

      const onApplyEvent = wrapper.emitted("on-apply");

      expect(onApplyEvent).toHaveLength(1);

      switchButton.vm.$emit("change", { target: { checked: true } });
      expect(onApplyEvent).toHaveLength(2);
      expect(onApplyEvent?.[1]).toEqual([
        moment(from).startOf("day").toDate(),
        moment(to).endOf("day").toDate(),
      ]);

      switchButton.vm.$emit("change", { target: { checked: false } });
      expect(onApplyEvent).toHaveLength(3);
      expect(onApplyEvent?.[2]).toEqual([
        moment(from).startOf("day").toDate(),
        moment(to).startOf("day").toDate(),
      ]);
    });

    it("when helper button clicked", async () => {
      const name = "Custom Button";
      const from = new Date("2020 07 01 00:00:00");
      const to = new Date("2020 07 31 23:59:59");

      const wrapper = shallowMount(CalendarDialog, {
        props: {
          inline: true,
          helperButtons: [
            {
              name,
              from,
              to,
            },
          ],
        },
      });

      const helpersButton = wrapper
        .find(".vdpr-datepicker__calendar-button-helper")
        .findAll("button");

      const customHelperButton = helpersButton.find((b) => b.text() === name);

      await customHelperButton?.trigger("click");

      const onApplyEvent = wrapper.emitted("on-apply");

      expect(onApplyEvent).toBeDefined();
      expect(onApplyEvent).toHaveLength(1);
      expect(onApplyEvent?.[0]).toEqual([from, to]);
    });
  });
});
