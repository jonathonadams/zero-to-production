module.exports = {
  name: 'web-examples-make-it-your-own',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/web/examples/make-it-your-own',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
