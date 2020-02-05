module.exports = {
  name: 'todos-all-todos',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/todos/all-todos',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
