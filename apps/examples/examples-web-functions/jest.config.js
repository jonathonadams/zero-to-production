module.exports = {
  name: 'examples-web-functions',
  setupFilesAfterEnv: ['jest-extended'],
  testEnvironment: 'node',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/examples/examples-web-functions'
};
