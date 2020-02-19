module.exports = {
  name: 'shared-auth-components',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/auth/components',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
