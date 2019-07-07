module.exports = {
  name: 'frontend-dashboard',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/frontend/dashboard',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
