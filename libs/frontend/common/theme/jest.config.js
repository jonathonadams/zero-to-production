module.exports = {
  name: 'frontend-common-theme',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/frontend/common/theme',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
