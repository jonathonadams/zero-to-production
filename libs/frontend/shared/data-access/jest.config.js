module.exports = {
  name: 'frontend-shared-data-access',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/frontend/shared/data-access',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
