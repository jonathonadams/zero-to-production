module.exports = {
  name: 'todos-todo-detail',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/todos/todo-detail',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
