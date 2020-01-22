require('dotenv').config({ path: `${process.cwd()}/apps/servers/api/.env` });

module.exports = {
  name: 'servers-api',
  setupFilesAfterEnv: ['jest-extended'],
  runner: './single-thread.js',
  testEnvironment: 'node',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/servers/api'
};
