import { SameDateFormatConfig } from "@components/DateInput/types";
import { DatesAvailabilityConfig } from "@composables/useCalendarDateUtil";
import { InitialDate } from "@composables/useSelectedDates";
import * as PropsValidator from "@utils/propsValidator";

describe("Props Validator", () => {
  describe("isValidInitialDates", () => {
    it("should return true if value is undefined or null", () => {
      expect(PropsValidator.isValidInitialDate(undefined)).toBe(true);

      expect(PropsValidator.isValidInitialDate(null)).toBe(true);
    });

    it("should return true if value is empty array", () => {
      expect(
        PropsValidator.isValidInitialDate([] as unknown as InitialDate)
      ).toBe(true);
    });

    it("should return true if value contain only startDate", () => {
      expect(
        PropsValidator.isValidInitialDate([new Date("2024-12-12"), null])
      ).toBe(true);
    });

    it("should return true if value contain only endDate", () => {
      expect(
        PropsValidator.isValidInitialDate([null, new Date("2024-12-12")])
      ).toBe(true);
    });

    it("should return false if value is not a Date", () => {
      const isValid = PropsValidator.isValidInitialDate([
        "2024-12-12",
        "2024-12-12",
      ] as unknown as InitialDate);

      expect(isValid).toBe(false);
    });

    it("should return false if from date greater than to date", () => {
      const isValid = PropsValidator.isValidInitialDate([
        new Date("2024-10-02"),
        new Date("2024-10-01"),
      ]);

      expect(isValid).toBe(false);
    });
  });

  describe("isValidHelperButtons", () => {
    it("should return true if value is undefined or null", () => {
      expect(PropsValidator.isValidHelperButtons(undefined)).toBe(true);

      expect(PropsValidator.isValidHelperButtons(null)).toBe(true);
    });

    it("should return true if array is empty", () => {
      expect(PropsValidator.isValidHelperButtons([])).toBe(true);
    });

    it("should return false if button name empty", () => {
      const isValid = PropsValidator.isValidHelperButtons([
        {
          name: "",
          from: new Date("2020-10-01"),
          to: new Date("2020-10-02"),
        },
      ]);

      expect(isValid).toBe(false);
    });

    it("should return false if button from not date", () => {
      const isValid = PropsValidator.isValidHelperButtons([
        {
          name: "This Day",
          from: "2020-10-02" as unknown as Date,
          to: new Date("2020-10-02"),
        },
      ]);

      expect(isValid).toBe(false);
    });

    it("should return false if button to not date", () => {
      const isValid = PropsValidator.isValidHelperButtons([
        {
          name: "This Day",
          from: new Date("2020-10-02"),
          to: "2020-10-02" as unknown as Date,
        },
      ]);

      expect(isValid).toBe(false);
    });
  });

  describe("isValidDateAvailabilityConfig", () => {
    it("should return true if value is undefined or null", () => {
      expect(PropsValidator.isValidDateAvailabilityConfig(undefined)).toBe(
        true
      );

      expect(PropsValidator.isValidDateAvailabilityConfig(null)).toBe(true);
    });

    it("should return true if value is empty object", () => {
      expect(PropsValidator.isValidDateAvailabilityConfig({})).toBe(true);
    });

    it("should return false if dates items is not date", () => {
      const isValid = PropsValidator.isValidDateAvailabilityConfig({
        dates: ["2020-10-15"] as unknown as Array<Date>,
      });

      expect(isValid).toBe(false);
    });

    it("should return false if from is not date", () => {
      const isValid = PropsValidator.isValidDateAvailabilityConfig({
        from: "2020-10-15" as unknown as Date,
      });

      expect(isValid).toBe(false);
    });

    it("should return false if to is not date", () => {
      const isValid = PropsValidator.isValidDateAvailabilityConfig({
        to: "2020-10-15" as unknown as Date,
      });

      expect(isValid).toBe(false);
    });

    it("should return false if ranges is not valid", () => {
      let isValid = PropsValidator.isValidDateAvailabilityConfig({
        ranges: [
          {
            from: "2020-10-15" as unknown as Date,
            to: new Date("2020-10-20"),
          },
        ],
      });

      expect(isValid).toBe(false);

      isValid = PropsValidator.isValidDateAvailabilityConfig({
        ranges: [
          {
            from: new Date("2020-10-15"),
            to: "2020-10-20" as unknown as Date,
          },
        ],
      });

      expect(isValid).toBe(false);
    });

    it("should return false if custom is not function", () => {
      const isValid = PropsValidator.isValidDateAvailabilityConfig({
        custom: new Date(
          "2020-10-15"
        ) as unknown as DatesAvailabilityConfig["custom"],
      });

      expect(isValid).toBe(false);
    });

    it("should return true if all props is valid", () => {
      const isValid = PropsValidator.isValidDateAvailabilityConfig({
        dates: [new Date("2020-10-15")],
        from: new Date("2020-12-01"),
        to: new Date("2020-07-30"),
        ranges: [
          {
            from: new Date("2020-08-01"),
            to: new Date("2020-08-10"),
          },
        ],
        custom() {
          return true;
        },
      });

      expect(isValid).toBe(true);
    });
  });

  describe("isValidSameDateFormat", () => {
    it("shoud return true if value is undefined or null", () => {
      expect(PropsValidator.isValidSameDateFormat(undefined)).toBe(true);

      expect(PropsValidator.isValidSameDateFormat(null)).toBe(true);
    });

    it("shoud return false if is empty object", () => {
      expect(
        PropsValidator.isValidSameDateFormat({} as SameDateFormatConfig)
      ).toBe(false);
    });

    it("should return false if from or to is not string", () => {
      let isValid = PropsValidator.isValidSameDateFormat({
        from: 1 as unknown as string,
        to: "DD/MM/YYYY HH:mm",
      });

      expect(isValid).toBe(false);

      isValid = PropsValidator.isValidSameDateFormat({
        from: "DD/MM/YYYY HH:mm",
        to: 1 as unknown as string,
      });

      expect(isValid).toBe(false);
    });
  });
});
