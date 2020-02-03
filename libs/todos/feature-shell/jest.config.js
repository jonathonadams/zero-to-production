module.exports = {
  name: 'todos-feature-shell',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/todos/feature-shell',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
