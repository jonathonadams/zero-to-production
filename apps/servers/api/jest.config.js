module.exports = {
  name: 'servers-api',
  setupFilesAfterEnv: ['jest-extended'],
  testEnvironment: 'node',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/servers/api'
};
