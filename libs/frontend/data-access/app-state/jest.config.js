module.exports = {
  name: 'frontend-data-access-app-state',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/frontend/data-access/app-state',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
