import { isObjectDate } from "@utils/helpers";

describe("helpers", () => {
  describe("isObjectDate", () => {
    it("should return true if value is Date object", () => {
      const value = new Date("2024 11 2");

      expect(isObjectDate(value)).toEqual(true);
    });

    it("should return false if value is not a Date object", () => {
      const value: Array<any> = [
        Date.now(),
        "2024 11 02",
        "2024 11 02 12:00:00",
        null,
        undefined,
        JSON.stringify(new Date()),
        JSON.parse(JSON.stringify(new Date())),
        [new Date()],
      ];

      value.forEach((v) => {
        expect(isObjectDate(v)).toEqual(false);
      });
    });
  });
});
