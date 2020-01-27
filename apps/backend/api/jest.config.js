require('dotenv').config({ path: `${process.cwd()}/apps/backend/api/.env` });

module.exports = {
  name: 'backend-api',
  setupFilesAfterEnv: ['jest-extended'],
  runner: './single-thread.js',
  testEnvironment: 'node',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/backend/api'
};
