module.exports = {
  name: 'todos-data-access',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/todos/data-access',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
