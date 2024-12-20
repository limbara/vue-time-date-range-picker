import {
  HelperButtonShape,
} from "@components/CalendarDialog/types";

import { isEmptyLiteralObject, isObjectDate } from "./helpers";
import { SameDateFormatConfig } from "@components/DateInput/types";
import { DatesAvailabilityConfig } from "@composables/useCalendarDateUtil";
import { InitialDate } from "@composables/useSelectedDates";

export const isValidInitialDate = (value: InitialDate | undefined | null) => {
  if (!value || (value as Array<unknown>).length === 0) return true;

  const [from, to] = value;  

  if (from && to) {
    return isObjectDate(from) && isObjectDate(to) && to.getTime() >= from.getTime()
  }

  if (from) {
    return isObjectDate(from)
  }

  if (to) {
    return isObjectDate(to)
  }

  return true
};

export const isValidHelperButtons = (
  value: Array<HelperButtonShape> | undefined | null
) => {
  if (!value || value.length === 0) return true;

  return value.every((v) => {
    const isButtonNameValid = typeof v.name === "string" && v.name !== "";
    const isButtonFromDateValid = isObjectDate(v.from);
    const isButtonToDateValid = isObjectDate(v.to);

    return isButtonNameValid && isButtonFromDateValid && isButtonToDateValid;
  });
};

export const isValidDateAvailabilityConfig = (
  value: DatesAvailabilityConfig | undefined | null
) => {
  if (!value || isEmptyLiteralObject(value)) return true;

  const { dates, from, to, ranges, custom } = value;

  if (Array.isArray(dates) && dates.some((v) => !isObjectDate(v))) return false;

  if (from && !isObjectDate(from)) return false;

  if (to && !isObjectDate(to)) return false;

  if (
    Array.isArray(ranges) &&
    ranges.some((r) => !isObjectDate(r.from) || !isObjectDate(r.to))
  )
    return false;

  if (custom && typeof custom !== "function") return false;

  return true;
};

export const isValidSameDateFormat = (
  value: SameDateFormatConfig | undefined | null
) => {
  if (!value) return true;

  if (isEmptyLiteralObject(value)) return false;

  const { from, to } = value;

  return (
    typeof from === "string" &&
    from !== "" &&
    typeof to === "string" &&
    to !== ""
  );
};
