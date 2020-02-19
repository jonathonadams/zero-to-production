module.exports = {
  name: 'todos-web',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/todos/todos-web/todos',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
