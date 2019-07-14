module.exports = {
  name: 'frontend-common-animations',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/frontend/common/animations',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
