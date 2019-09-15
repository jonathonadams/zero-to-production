module.exports = {
  name: 'frontend-todos-todo-detail',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/web/todos/todo-detail',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
