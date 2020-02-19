module.exports = {
  name: 'examples-secure-todos',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/examples/secure-todos',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
