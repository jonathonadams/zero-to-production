module.exports = {
  name: 'demo-web-functions',
  setupFilesAfterEnv: ['jest-extended'],
  testEnvironment: 'node',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/demo/demo-web-functions',
  globals: { 'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' } },
};
