export default {
  /**
   * Check if value is Date Object
   *
   * @param {*} value
   * @returns {Boolean}
   */
  isObjectDate: (value) => Object.prototype.toString.call(value) === '[object Date]',

  /**
   * Get Object Length
   *
   * @param {Object} value
   * @returns {Number}
   */
  getObjectLength: (value) => Object.keys(value).length,
};
