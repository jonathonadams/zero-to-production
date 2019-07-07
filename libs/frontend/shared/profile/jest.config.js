module.exports = {
  name: 'frontend-profile',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/frontend/profile',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
