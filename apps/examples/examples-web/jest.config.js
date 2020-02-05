module.exports = {
  name: 'examples-web',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/examples/examples-web',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
