module.exports = {
  name: 'shared-utils-overlay',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/utils/overlay',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
