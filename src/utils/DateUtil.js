import moment from "moment";
import Util from "./Util";

export default class {
  /**
   * @param {String} lang
   */
  constructor(lang = "") {
    this.lang = lang;
    this.localMoment = moment().locale(lang);
  }

  /**
   * Create Date
   * @returns {Date}
   */
  createDate(...param) {
    return moment(...param)
      .locale(this.lang)
      .toDate();
  }

  /**
   * Get Day Names
   *
   * @returns {Array}
   */
  getDayNames() {
    return this.localMoment.localeData().weekdays();
  }

  /**
   * Get Abbreviated Day Names
   *
   * @returns {Array}
   */
  getAbbrDayNames() {
    return this.localMoment.localeData().weekdaysShort();
  }

  /**
   * Get Month Names
   * @returns {Array}
   */
  getMonthNames() {
    return this.localMoment.localeData().months();
  }

  /**
   * Get Abbreviated Month Names
   *
   * @returns {Array}
   */
  getAbbrMonthNames() {
    return this.localMoment.localeData().monthsShort();
  }

  /**
   * format a date
   *
   * @param {Date} date
   * @param {String} format
   * @returns {String}
   */
  formatDate(date, format) {
    return moment(date).locale(this.lang).format(format);
  }

  /**
   * check for same date only
   *
   * @param {Date} date1
   * @param {Date} date2
   * @return {Boolean}
   */
  isSameDate(date1, date2) {
    return (
      moment(date1).format("DD MM YYYY") === moment(date2).format("DD MM YYYY")
    );
  }

  /**
   * Check for is All Day.
   *
   * @param {Date} fromDate
   * @param {Date} toDate
   * @returns {Boolean}
   */
  isAllDay(fromDate, toDate) {
    const startFromDate = moment(fromDate).startOf("day");
    const endToDate = moment(toDate).endOf("day");

    return (
      moment(fromDate).format("DD MM YYYY HH:mm") ===
      startFromDate.format("DD MM YYYY HH:mm") &&
      moment(toDate).format("DD MM YYYY HH:mm") ===
      endToDate.format("DD MM YYYY HH:mm")
    );
  }

  /**
   * check if date is valid
   *
   * @param {Date} date
   * @returns {Boolean}
   */
  isValidDate(date) {
    return Util.isObjectDate(date) && moment(date).isValid();
  }

  /**
   * convert date to unix timestamp
   *
   * @param {Date} date
   * @returns {Number}
   */
  toUnix(date) {
    return moment(date).unix();
  }

  /**
   * convert unix to date
   *
   * @param {Number} unixTimestamp
   * @returns {Date}
   */
  fromUnix(unixTimestamp) {
    return moment.unix(unixTimestamp).toDate();
  }

  /**
   * Get Start Of A Date. refer to moment documentation
   *
   * @param {Date} date
   * @param {String} of
   * @returns {Date}
   */
  startOf(date, of) {
    return moment(date).locale(this.lang).startOf(of).toDate();
  }

  /**
   * Get End Of A Date. refer to moment documentation
   *
   * @param {Date} date
   * @param {String} of
   * @returns {Date}
   */
  endOf(date, of) {
    return moment(date).locale(this.lang).endOf(of).toDate();
  }

  /**
   * Check if date is before a beforeDate
   *
   * @param {Date} date
   * @param {Date} beforeDate
   * @returns {Boolean}
   */
  isBefore(date, beforeDate) {
    return moment(date).isBefore(beforeDate);
  }

  /**
   * Check if date is same or before a beforeDate
   * @param {Date} date
   * @param {Date} beforeDate
   * @returns {Boolean}
   */
  isSameOrBefore(date, beforeDate) {
    return moment(date).isSameOrBefore(beforeDate);
  }

  /**
   * Check if date is after a afterDate
   *
   * @param {Date} date
   * @param {Date} beforeDate
   * @returns {Boolean}
   */
  isAfter(date, afterDate) {
    return moment(date).isAfter(afterDate);
  }

  /**
   * Check if date is same or after a afterDate
   * @param {Date} date
   * @param {Date} afterDate
   * @returns {Boolean}
   */
  isSameOrAfter(date, afterDate) {
    return moment(date).isSameOrAfter(afterDate);
  }

  /**
   * Check if a date is between fromDate and toDate
   * @param {Date} date
   * @param {Date} fromDate
   * @param {Date} toDate
   */
  isBetween(date, fromDate, toDate) {
    return moment(date).isBetween(fromDate, toDate);
  }

  /**
   * Check if a date is same or between as fromDate and toDate
   *
   * @param {Date} date
   * @param {Date} fromDate
   * @param {Date} toDate
   * @returns {Boolean}
   */
  isSameOrBetween(date, fromDate, toDate) {
    const theDate = moment(date);

    return theDate.isSameOrAfter(fromDate) && theDate.isSameOrBefore(toDate);
  }

  /**
   * Add Number of timeKey to A Date. refer to moment documentation
   *
   * @param {Date} date
   * @param {Number} number
   * @param {String} timeKey
   * @returns {Date}
   */
  add(date, number, timeKey) {
    return moment(date).locale(this.lang).add(number, timeKey).toDate();
  }

  /**
   * Subtract Number of timeKey to A Date. refer to moment documentation
   *
   * @param {Date} date
   * @param {Number} number
   * @param {String} timeKey
   * @returns {Date}
   */
  subtract(date, number, timeKey) {
    return moment(date).locale(this.lang).subtract(number, timeKey).toDate();
  }

  /**
   * Get Number of Day in A month from A Date
   *
   * @param {Date} date
   * @returns {Number}
   */
  daysInMonth(date) {
    return moment(date).daysInMonth();
  }

  /**
   * Get Day 0 - 6 from A Date
   *
   * @param {Date} date
   * @returns {Number}
   */
  day(date) {
    return moment(date).day();
  }

  /**
   * Get Month 0 - 11 from A Date
   *
   * @param {Date} date
   * @returns {Number}
   */
  month(date) {
    return moment(date).month();
  }

  /**
   * Get Year from A Date
   * @param {Date} date
   * @returns {Number}
   */
  year(date) {
    return moment(date).year();
  }
}
