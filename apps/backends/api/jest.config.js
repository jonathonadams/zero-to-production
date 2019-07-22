module.exports = {
  name: 'backends-api',
  setupFilesAfterEnv: ['jest-extended'],
  testEnvironment: 'node',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/backends/api'
};
