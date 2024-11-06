import { shallowMount } from "@vue/test-utils";
import DatePicker from "@components/DatePicker/DatePicker.vue";
import CalendarDialog from "@components/CalendarDialog/CalendarDialog.vue";
import DateInput from "@components/DateInput/DateInput.vue";
import "regenerator-runtime";
import "@testing-library/jest-dom";

describe("Date Picker", () => {
  const datePickerClass = ".vdpr-datepicker";

  type MountDatePickerFN = typeof shallowMount<typeof DatePicker>;

  const mountDatePicker = (options?: Parameters<MountDatePickerFN>[1]) => {
    const wrapper = shallowMount(DatePicker, options);

    const calendarDialog = wrapper.findComponent(CalendarDialog);
    const dateInput = wrapper.findComponent(DateInput);

    return {
      wrapper,
      calendarDialog,
      dateInput,
    };
  };

  it("should render correct contents", () => {
    const { wrapper, calendarDialog, dateInput } = mountDatePicker();

    expect(wrapper.find(datePickerClass).exists()).toBe(true);
    expect(calendarDialog.exists()).toBe(true);
    expect(dateInput.exists()).toBe(true);
  });

  it("toggle calendar dialog", async () => {
    const { wrapper, calendarDialog, dateInput } = mountDatePicker();

    await dateInput.trigger("click");

    expect(calendarDialog.isVisible()).toBe(true);

    await dateInput.trigger("click");

    await wrapper.vm.$nextTick();

    expect(calendarDialog.isVisible()).toBe(false);
  });

  it("should close calendar dialog when applied", async () => {
    const fromDate = new Date("2024 08 01");
    const endDate = new Date("2024 08 02");

    const { wrapper, calendarDialog, dateInput } = mountDatePicker();

    await dateInput.trigger("click");

    expect(calendarDialog.isVisible()).toBe(true);

    calendarDialog.vm.$emit("on-apply", fromDate, endDate);

    await wrapper.vm.$nextTick();

    expect(calendarDialog.isVisible()).toBe(false);
  });

  it("emit date-applied event", () => {
    const fromDate = new Date("2024 08 01");
    const endDate = new Date("2024 08 02");

    const { wrapper, calendarDialog } = mountDatePicker();

    calendarDialog.vm.$emit("on-apply", fromDate, endDate);

    const dateAppliedEvent = wrapper.emitted("date-applied");

    expect(dateAppliedEvent).toHaveLength(1);
    expect(dateAppliedEvent?.[0]).toEqual([fromDate, endDate]);
  });

  it("emit event datepicker-opened & datepicker-closed", async () => {
    const { wrapper, dateInput } = mountDatePicker();

    await dateInput.trigger("click");
    expect(wrapper.emitted("datepicker-opened")).toBeTruthy();

    await dateInput.trigger("click");
    expect(wrapper.emitted("datepicker-closed")).toBeTruthy();
  });

  it("emit on-prev-calendar event", () => {
    const { wrapper, calendarDialog } = mountDatePicker();

    calendarDialog.vm.$emit("on-prev-calendar");
    expect(wrapper.emitted("on-prev-calendar")).toHaveLength(1);
  });

  it("emit on-next-calendar event", () => {
    const { wrapper, calendarDialog } = mountDatePicker();

    calendarDialog.vm.$emit("on-next-calendar");
    expect(wrapper.emitted("on-next-calendar")).toHaveLength(1);
  });

  it("emit select-date event", () => {
    const { wrapper, calendarDialog } = mountDatePicker();
    const fromDate = new Date("2024 08 01");
    const endDate = new Date("2024 08 03");

    calendarDialog.vm.$emit("select-date", fromDate, endDate);

    const selectDateEvent = wrapper.emitted("select-date");
    expect(selectDateEvent).toHaveLength(1);
    expect(selectDateEvent?.[0]).toEqual([fromDate, endDate]);
  });

  it("emit select-disabled-date event", () => {
    const { wrapper, calendarDialog } = mountDatePicker();

    const date = new Date("2024 09 01");

    calendarDialog.vm.$emit("select-disabled-date", date);

    const selectDisabledDateEvent = wrapper.emitted("select-disabled-date");
    expect(selectDisabledDateEvent).toHaveLength(1);
    expect(selectDisabledDateEvent?.[0]).toEqual([date]);
  });

  it("emit on-reset", () => {
    const { wrapper, calendarDialog } = mountDatePicker();

    calendarDialog.vm.$emit("on-reset");
    expect(wrapper.emitted("on-reset")).toBeTruthy();
  });

  describe("update v-model:modelValue correctly", () => {
    it("emit event update:model-value, when select date is triggered", () => {
      const { wrapper, calendarDialog } = mountDatePicker();

      const from = new Date("2024 11 01");
      const to = new Date("2024 11 10");

      calendarDialog.vm.$emit("select-date", from, to);

      const updateModelValueEvent = wrapper.emitted("update:model-value");

      expect(updateModelValueEvent).toHaveLength(1);
      expect(updateModelValueEvent?.[0]).toEqual([[from, to]]);
    });

    it("emit event update:model-value, when event date apply triggered", () => {
      const { wrapper, calendarDialog } = mountDatePicker();

      const from = new Date("2024 11 01");
      const to = new Date("2024 11 10");

      calendarDialog.vm.$emit("on-apply", from, to);

      const updateModelValueEvent = wrapper.emitted("update:model-value");

      expect(updateModelValueEvent).toHaveLength(1);
      expect(updateModelValueEvent?.[0]).toEqual([[from, to]]);
    });

    it("emit event update:model-value, when event reset triggered", () => {
      const { wrapper, calendarDialog } = mountDatePicker();

      calendarDialog.vm.$emit("on-reset");

      const updateModelValueEvent = wrapper.emitted("update:model-value");

      expect(updateModelValueEvent).toHaveLength(1);
      expect(updateModelValueEvent?.[0]).toEqual([null]);
    });
  });
});
