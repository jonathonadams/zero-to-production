module.exports = {
  name: 'frontend-todos-feature-shell',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/frontend/todos/feature-shell',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
