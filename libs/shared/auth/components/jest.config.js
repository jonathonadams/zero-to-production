module.exports = {
  name: 'shared-auth-components',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/auth/components',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
