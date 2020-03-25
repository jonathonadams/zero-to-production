module.exports = {
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  resolver: '@nrwl/jest/plugins/resolver',
  verbose: true,
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageReporters: ['html'],
};
