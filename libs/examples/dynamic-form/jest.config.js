module.exports = {
  name: 'examples-dynamic-form',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/examples/dynamic-form',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
