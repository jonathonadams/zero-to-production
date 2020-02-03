module.exports = {
  name: 'examples-form-builder',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/examples/form-builder',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
