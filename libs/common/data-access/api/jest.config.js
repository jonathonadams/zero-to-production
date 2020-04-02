module.exports = {
  name: 'common-data-access-api',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/common/data-access/api',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
