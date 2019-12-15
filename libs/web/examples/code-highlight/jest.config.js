module.exports = {
  name: 'web-examples-code-highlight',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/web/examples/code-highlight',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
