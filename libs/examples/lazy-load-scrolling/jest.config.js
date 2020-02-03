module.exports = {
  name: 'examples-lazy-load-scrolling',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/examples/lazy-load-scrolling',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
