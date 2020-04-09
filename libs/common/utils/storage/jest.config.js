module.exports = {
  name: 'common-utils-storage',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/common/utils/storage',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
