module.exports = {
  name: 'examples-theming',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/examples/theming',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
