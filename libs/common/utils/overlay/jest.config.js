module.exports = {
  name: 'common-utils-overlay',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/common/utils/overlay',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
