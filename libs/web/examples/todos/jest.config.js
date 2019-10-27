module.exports = {
  name: 'web-examples-todos',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/web/examples/todos',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
