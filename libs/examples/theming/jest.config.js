module.exports = {
  name: 'examples-theming',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/examples/theming',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
