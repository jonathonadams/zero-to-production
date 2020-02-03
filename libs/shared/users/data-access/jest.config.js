module.exports = {
  name: 'shared-users-data-access',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/data-access/users',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
