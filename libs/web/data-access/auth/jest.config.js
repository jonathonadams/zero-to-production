module.exports = {
  name: 'frontend-shared-auth',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/web/shared/auth',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
