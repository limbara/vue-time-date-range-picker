export default class Language {
  constructor(lang, months, monthsAbbr, days) {
    this.lang = lang;
    this.months = months;
    this.monthsAbbr = monthsAbbr;
    this.days = days;
  }

  get language() {
    return this.language;
  }

  set language(language) {
    if (typeof language !== 'string') {
      throw new TypeError('Language must be a string');
    }
    this.language = language;
  }

  get months() {
    return this.months;
  }

  set months(months) {
    if (months.length !== 12) {
      throw new RangeError(`There must be 12 months for ${this.language} language`);
    }
    this.months = months;
  }

  get monthsAbbr() {
    return this.monthsAbbr;
  }

  set monthsAbbr(monthsAbbr) {
    if (monthsAbbr.length !== 12) {
      throw new RangeError(`There must be 12 abbreviated months for ${this.language} language`);
    }
    this.monthsAbbr = monthsAbbr;
  }

  get days() {
    return this.days;
  }

  set days(days) {
    if (days.length !== 7) {
      throw new RangeError(`There must be 7 days for ${this.language} language`);
    }
    this.days = days;
  }
}
