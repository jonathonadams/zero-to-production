module.exports = {
  name: 'examples-secure-todos',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/examples/secure-todos',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
