module.exports = {
  name: 'frontend-todos-all-todos',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/web/todos/all-todos',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
