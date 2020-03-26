module.exports = {
  name: 'todos-todo-detail',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/todos/todo-detail',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
