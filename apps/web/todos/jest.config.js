module.exports = {
  name: 'web-todos-todos',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/web/todos/todos',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
