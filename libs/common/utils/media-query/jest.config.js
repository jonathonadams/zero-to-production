module.exports = {
  name: 'common-utils-media-query',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/common/utils/media-query',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
