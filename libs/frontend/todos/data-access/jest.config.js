module.exports = {
  name: 'frontend-todos-data-access',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/frontend/todos/data-access',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
