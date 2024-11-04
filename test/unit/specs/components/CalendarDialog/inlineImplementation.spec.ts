import { mount } from "@vue/test-utils";
import CalendarDialog from "@components/CalendarDialog/CalendarDialog.vue";
import "regenerator-runtime";
import "@testing-library/jest-dom";
import CalendarInputDate from "@components/CalendarInputDate/CalendarInputDate.vue";

describe("Calendar Dialog : inline Implementation", () => {
  const datePickerButtonSubmit = ".vdpr-datepicker__button-submit";
  const inlineClass = ".vdpr-datepicker__calendar-dialog--inline";

  it("should render correct contents", () => {
    const wrapper = mount(CalendarDialog, {
      props: {
        inline: true,
      },
    });

    expect(wrapper.find(inlineClass).exists()).toBe(true);
    expect(wrapper.find(datePickerButtonSubmit).element).not.toBeVisible();
  });

  describe("emit on-apply if inline", () => {
    it("input date changes", async () => {
      const wrapper = mount(CalendarDialog, {
        props: {
          inline: true,
        },
      });

      const inputDates = wrapper.findAllComponents(CalendarInputDate);
      const [startInput, endInput] = inputDates;

      await startInput.vm.$emit("change", new Date("2024 07 12"));
      await endInput.vm.$emit("change", new Date("2024 07 14"));

      await wrapper.vm.$nextTick();

      expect(wrapper.emitted("on-apply")).toBeTruthy();
    });
  });
});
