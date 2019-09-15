module.exports = {
  name: 'frontend-shared-examples-form-builder',
  preset: '../../../../../jest.config.js',
  coverageDirectory:
    '../../../../../coverage/libs/web/shared/examples/form-builder',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
