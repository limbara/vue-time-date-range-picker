import { isEmptyLiteralObject, isObjectDate, omit } from "@utils/helpers";

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

  describe("isEmptyLiteralObject", () => {
    it("should return true if literal object is empty", () => {
      expect(isEmptyLiteralObject({})).toBe(true);
    });

    it("should return false if literal object is not empty", () => {
      expect(isEmptyLiteralObject({ value: true })).toBe(false);
    });
  });

  describe("omit", () => {
    it("should omit certain exclude keys from object", () => {
      expect(
        omit(
          {
            a: 1,
            b: 2,
            c: 3,
          },
          ["a"]
        )
      ).toEqual({
        b: 2,
        c: 3,
      });
    });
  });
});
