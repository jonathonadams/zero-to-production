module.exports = {
  name: 'frontend-shared-floating-menu',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/web/shared/floating-menu',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
