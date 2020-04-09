module.exports = {
  name: 'common-utils-notifications',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/common/utils/notifications',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
