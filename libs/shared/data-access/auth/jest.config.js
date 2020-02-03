module.exports = {
  name: 'shared-data-access-auth',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/data-access/auth',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
