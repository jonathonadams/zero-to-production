module.exports = {
  name: 'frontend-common-utils-overlay',
  preset: '../../../../../jest.config.js',
  coverageDirectory:
    '../../../../../coverage/libs/frontend/common/utils/overlay',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
