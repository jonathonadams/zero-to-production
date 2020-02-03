module.exports = {
  name: 'examples-live-demos',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/examples/live-demos',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
