import { shallowMount } from "@vue/test-utils";
import Calendar from "@components/Calendar/Calendar.vue";
import "regenerator-runtime";
import { createDays } from "@composables/useCalendarDateUtil";
import { ComputedDay } from "@components/Calendar/types";
import DateUtil from "@utils/DateUtil";
import moment from "moment";

const createDaysFunction = (...params: Parameters<typeof createDays>) => {
  return (
    disabledDatesNumber: Set<number> = new Set(),
    highlightedDatesNumber: Set<number> = new Set()
  ) => {
    return createDays(...params).map<ComputedDay>((d) => ({
      ...d,
      isDisabled: disabledDatesNumber.has(d.dateNumber),
      isHighlighted: highlightedDatesNumber.has(d.dateNumber),
    }));
  };
};

describe("Calendar", () => {
  const calendarMonthYearClass = ".vdpr-datepicker__calendar-month-year";
  const calendarPrevButtonClass = ".vdpr-datepicker__calendar-control-prev";
  const calendarNextButtonClass = ".vdpr-datepicker__calendar-control-next";
  const calendarTableClass = ".vdpr-datepicker__calendar-table";

  const now = new Date("2024 11 01");
  const dateUtil = new DateUtil("en");
  const dayNames = dateUtil.getDayNames();

  it("Should render days and dayNames correctly", () => {
    const days = createDaysFunction(now, false, dateUtil)();

    const wrapper = shallowMount(Calendar, {
      props: {
        pageDate: now,
        days: days,
        dayNames: dayNames,
      },
    });

    const calendarTable = wrapper.find(calendarTableClass);
    const calendarHeader = calendarTable.get("thead");

    const calendarDayNamesTh = calendarHeader.findAll("th");

    calendarDayNamesTh.forEach((th, i) => {
      expect(th.text()).toEqual(dayNames[i]);
    });

    const calendarBody = calendarTable.get("tbody");
    const calendarDayTr = calendarBody.findAll("tr");

    expect(calendarDayTr).toBeDefined();

    calendarDayTr.forEach((tr, rowIndex) => {
      const calendarDayTh = tr.findAll("td");

      calendarDayTh.forEach((th, index) => {
        const data = days[rowIndex * 7 + index];

        expect(th.text()).toEqual(
          days[rowIndex * 7 + index].dateNumber.toString()
        );

        if (data.isFaded) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(th.classes()).toContain("faded");
        } else {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(th.classes()).not.toContain("faded");
        }
      });
    });
  });

  it("should render disabled days correctly", () => {
    const disabledDateSet = new Set([1, 2, 3, 8, 25]);
    const days = createDaysFunction(now, false, dateUtil)(disabledDateSet);

    const wrapper = shallowMount(Calendar, {
      props: {
        pageDate: now,
        days: days,
        dayNames: dayNames,
      },
    });

    const calendarTable = wrapper.find(calendarTableClass);
    const calendarBody = calendarTable.get("tbody");
    const calendarDayTr = calendarBody.findAll("tr");

    expect(calendarDayTr).toBeDefined();

    calendarDayTr.forEach((tr) => {
      const calendarDayTh = tr.findAll("td");

      calendarDayTh.forEach((th) => {
        const dayNumber = parseInt(th.text());

        if (disabledDateSet.has(dayNumber)) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(th.classes()).toContain("disabled");
        } else {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(th.classes()).not.toContain("disabled");
        }
      });
    });
  });

  it("should render hightlighed days correctly", () => {
    const highlightedDatesNumber = new Set([1, 2, 3, 4, 5]);
    const days = createDaysFunction(
      now,
      false,
      dateUtil
    )(undefined, highlightedDatesNumber);

    const wrapper = shallowMount(Calendar, {
      props: {
        pageDate: now,
        days: days,
        dayNames: dayNames,
      },
    });

    const calendarTable = wrapper.find(calendarTableClass);
    const calendarBody = calendarTable.get("tbody");
    const calendarDayTr = calendarBody.findAll("tr");

    expect(calendarDayTr).toBeDefined();

    calendarDayTr.forEach((tr) => {
      const calendarDayTh = tr.findAll("td");

      calendarDayTh.forEach((th) => {
        const dayNumber = parseInt(th.text());

        if (highlightedDatesNumber.has(dayNumber)) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(th.classes()).toContain("highlighted");
        } else {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(th.classes()).not.toContain("highlighted");
        }
      });
    });
  });

  it("should render prev & next button default state correctly", () => {
    const wrapper = shallowMount(Calendar, {
      props: {
        pageDate: now,
      },
    });

    const prevButton = wrapper.find(calendarPrevButtonClass);
    const nextButton = wrapper.find(calendarNextButtonClass);

    expect(prevButton.classes()).not.toContain(
      "vdpr-datepicker__calendar-control-disabled"
    );
    expect(nextButton.classes()).not.toContain(
      "vdpr-datepicker__calendar-control-disabled"
    );
  });

  it("should render disabled prev & next button state correctly", () => {
    const wrapper = shallowMount(Calendar, {
      props: {
        pageDate: now,
        isNextPageDisabled: true,
        isPrevPageDisabled: true,
      },
    });

    const prevButton = wrapper.find(calendarPrevButtonClass);
    const nextButton = wrapper.find(calendarNextButtonClass);

    expect(prevButton.classes()).toContain(
      "vdpr-datepicker__calendar-control-disabled"
    );
    expect(nextButton.classes()).toContain(
      "vdpr-datepicker__calendar-control-disabled"
    );
  });

  it("should render current month year", () => {
    const wrapper = shallowMount(Calendar, {
      props: {
        pageDate: now,
      },
    });

    const currentMonthYear = moment(now).format("MMM YYYY");

    const calendarMonthYear = wrapper.find(calendarMonthYearClass);

    expect(calendarMonthYear.text()).toEqual(currentMonthYear);
  });

  it("should emit event on-prev-calendar", async () => {
    const wrapper = shallowMount(Calendar, {
      props: {
        pageDate: now,
      },
    });

    const prevButton = wrapper.find(calendarPrevButtonClass);
    await prevButton.trigger("click");

    expect(wrapper.emitted("on-prev-calendar")).toBeTruthy();
  });

  it("should not emit event on-prev-calendar when disabled", async () => {
    const wrapper = shallowMount(Calendar, {
      props: {
        pageDate: now,
        isPrevPageDisabled: true,
      },
    });

    const prevButton = wrapper.find(calendarPrevButtonClass);
    await prevButton.trigger("click");

    expect(wrapper.emitted("on-prev-calendar")).toBeFalsy();
  });

  it("should emit event on-next-calendar", async () => {
    const wrapper = shallowMount(Calendar, {
      props: {
        pageDate: now,
      },
    });

    const nextButton = wrapper.find(calendarNextButtonClass);
    await nextButton.trigger("click");

    expect(wrapper.emitted("on-next-calendar")).toBeTruthy();
  });

  it("should not emit event on-next-calendar when disabled", async () => {
    const wrapper = shallowMount(Calendar, {
      props: {
        pageDate: now,
        isNextPageDisabled: true,
      },
    });

    const nextButton = wrapper.find(calendarNextButtonClass);
    await nextButton.trigger("click");

    expect(wrapper.emitted("on-next-calendar")).toBeFalsy();
  });

  it("should emit event select-date when selected", async () => {
    const days = createDaysFunction(now, false, dateUtil)();

    const wrapper = shallowMount(Calendar, {
      props: {
        pageDate: now,
        days: days,
        dayNames: dayNames,
      },
    });

    const calendarTable = wrapper.find(calendarTableClass);

    const calendarBody = calendarTable.get("tbody");
    const calendarDayTr = calendarBody
      .findAll("tr")
      .flatMap((tr) => tr.findAll("td"));

    const date7 = calendarDayTr.find((tr) => tr.text() === "7");
    expect(date7).toBeDefined();
    await date7?.trigger("click");

    expect(wrapper.emitted("select-date")?.at(0)?.toString()).toEqual(
      expect.stringContaining("Thu Nov 07 2024 00:00:00")
    );
  });

  it("should emit event select-date when selected disabled dates", async () => {
    const days = createDaysFunction(now, false, dateUtil)(new Set([7]));

    const wrapper = shallowMount(Calendar, {
      props: {
        pageDate: now,
        days: days,
        dayNames: dayNames,
      },
    });

    const calendarTable = wrapper.find(calendarTableClass);

    const calendarBody = calendarTable.get("tbody");
    const calendarDayTr = calendarBody
      .findAll("tr")
      .flatMap((tr) => tr.findAll("td"));

    const date7 = calendarDayTr.find((tr) => tr.text() === "7");
    expect(date7).toBeDefined();
    await date7?.trigger("click");

    expect(wrapper.emitted("select-date")).not.toBeDefined();
  });
});
