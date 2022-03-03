// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

const path = require('path');

module.exports = {
  testEnvironment: 'jsdom',

  collectCoverageFrom: ['src/**/*.{js,vue}', '!**/node_modules/**'],

  coverageDirectory: '<rootDir>/test/unit/coverage',

  moduleFileExtensions: ['js', 'vue'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  rootDir: path.resolve(__dirname, '../../'),

  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': '@vue/vue3-jest',
  },
};
