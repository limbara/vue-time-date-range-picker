import moment from "moment";
import { isObjectDate } from "./helpers";

export default class {
  private lang: string;
  private localMoment: moment.Moment;

  constructor(lang: string = "") {
    this.lang = lang;
    this.localMoment = moment().locale(lang);
  }

  createDate(...param: Parameters<typeof moment>) {
    return moment(...param)
      .locale(this.lang)
      .toDate();
  }

  now(): Date {
    return moment().locale(this.lang).toDate();
  }

  getDayNames() {
    return this.localMoment.localeData().weekdays();
  }

  /**
   * Get Abbreviated Day Names
   */
  getAbbrDayNames() {
    return this.localMoment.localeData().weekdaysShort();
  }

  getMonthNames() {
    return this.localMoment.localeData().months();
  }

  /**
   * Get Abbreviated Month Names
   */
  getAbbrMonthNames() {
    return this.localMoment.localeData().monthsShort();
  }

  formatDate(date: Date, format: string) {
    return moment(date).locale(this.lang).format(format);
  }

  /**
   * Check if date is the same on DD MM YYYY level
   * @param date1 
   * @param date2 
   * @returns 
   */
  isSameDate(date1: Date, date2: Date) {
    return (
      moment(date1).format("DD MM YYYY") === moment(date2).format("DD MM YYYY")
    );
  }

  isAllDay(fromDate: Date, toDate: Date) {
    const startFromDate = moment(fromDate).startOf("day");
    const endToDate = moment(toDate).endOf("day");

    return (
      moment(fromDate).format("DD MM YYYY HH:mm:ss") ===
        startFromDate.format("DD MM YYYY HH:mm:ss") &&
      moment(toDate).format("DD MM YYYY HH:mm:ss") ===
        endToDate.format("DD MM YYYY HH:mm:ss")
    );
  }

  isValidDate(date: any): date is Date {
    return isObjectDate(date) && moment(date).isValid();
  }

  toUnix(date: Date) {
    return moment(date).unix();
  }

  fromUnix(unixTimestamp: number) {
    return moment.unix(unixTimestamp).toDate();
  }

  startOf(date: Date, of: moment.unitOfTime.StartOf) {
    return moment(date).locale(this.lang).startOf(of).toDate();
  }

  endOf(date: Date, of: moment.unitOfTime.StartOf) {
    return moment(date).locale(this.lang).endOf(of).toDate();
  }

  /**
   * Check if date is the same as comparing date
   * @param date 
   * @param comparingDate 
   * @returns 
   */
  isSame(date: Date, comparingDate: Date) {
    return moment(date).isSame(comparingDate)
  }

  /**
   * Check if date is before a comparingDate
   */
  isBefore(date: Date, comparingDate: Date) {
    return moment(date).isBefore(comparingDate);
  }

  /**
   * Check if date is same or before a comparingDate
   */
  isSameOrBefore(date: Date, comparingDate: Date) {
    return moment(date).isSameOrBefore(comparingDate);
  }

  /**
   * Check if date is after a comparingDate
   */
  isAfter(date: Date, comparingDate: Date) {
    return moment(date).isAfter(comparingDate);
  }

  /**
   * Check if date is same or after a comparingDate
   */
  isSameOrAfter(date: Date, comparingDate: Date) {
    return moment(date).isSameOrAfter(comparingDate);
  }

  /**
   * Check if a date is between fromDate and toDate
   */
  isBetween(date: Date, fromDate: Date, toDate: Date) {
    return moment(date).isBetween(fromDate, toDate);
  }

  /**
   * Check if a date is same or between as fromDate and toDate
   */
  isSameOrBetween(date: Date, fromDate: Date, toDate: Date) {
    const theDate = moment(date);

    return theDate.isSameOrAfter(fromDate) && theDate.isSameOrBefore(toDate);
  }

  /**
   * Add number of timeKey to date
   */
  add(
    date: Date,
    number: moment.DurationInputArg1,
    timeKey: moment.DurationInputArg2
  ) {
    return moment(date).locale(this.lang).add(number, timeKey).toDate();
  }

  /**
   * Subtract number of timeKey to date
   */
  subtract(
    date: Date,
    number: moment.DurationInputArg1,
    timeKey: moment.DurationInputArg2
  ) {
    return moment(date).locale(this.lang).subtract(number, timeKey).toDate();
  }

  /**
   * Get Number of Day in A month from A Date
   */
  daysInMonth(date: Date) {
    return moment(date).daysInMonth();
  }

  /**
   * Get Day 0 - 6 from A Date
   */
  day(date: Date) {
    return moment(date).day();
  }

  /**
   * Get Month 0 - 11 from A Date
   */
  month(date: Date) {
    return moment(date).month();
  }

  /**
   * Get Year from A Date
   */
  year(date: Date) {
    return moment(date).year();
  }
}
