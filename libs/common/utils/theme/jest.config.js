module.exports = {
  name: 'common-utils-theme',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/common/utils/theme',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
