module.exports = {
  name: 'frontend-data-access-users',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/frontend/data-access/users',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
