module.exports = {
  name: 'web-examples-live-demos',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/web/examples/live-demos',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
