module.exports = {
  name: 'frontend-shared-examples-feature-shell',
  preset: '../../../../../jest.config.js',
  coverageDirectory:
    '../../../../../coverage/libs/frontend/shared/examples/feature-shell',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
