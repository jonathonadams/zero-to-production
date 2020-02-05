module.exports = {
  name: 'examples-data-access',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/examples/data-access',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
