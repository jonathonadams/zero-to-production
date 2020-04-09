module.exports = {
  name: 'common-auth-data-access',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/common/auth/data-access',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
