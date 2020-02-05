module.exports = {
  name: 'shared-users-profile',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/users/profile',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
