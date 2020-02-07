module.exports = {
  name: 'examples-start-your-own',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/examples/start-your-own',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
