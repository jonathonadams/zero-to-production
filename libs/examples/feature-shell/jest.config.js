module.exports = {
  name: 'examples-feature-shell',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/examples/feature-shell',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
