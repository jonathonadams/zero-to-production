module.exports = {
  name: 'frontend-data-access-user-auth',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/frontend/data-access/user-auth',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
