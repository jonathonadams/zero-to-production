module.exports = {
  name: 'frontends-todos-todos',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/apps/frontends/todos/todos',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
