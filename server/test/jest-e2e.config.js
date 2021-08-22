// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require('path');

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^src/(.*)$': resolve(__dirname, '..', './src/$1'),
  },
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['../**/*.(t|j)s'],
  setupFiles: [resolve(__dirname, './setup.ts')],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  verbose: true,
};
