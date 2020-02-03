module.exports = {
  name: 'shared-dashboard',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/dashboard',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
