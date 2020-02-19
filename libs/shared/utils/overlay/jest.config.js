module.exports = {
  name: 'shared-utils-overlay',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/utils/overlay',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
