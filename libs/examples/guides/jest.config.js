module.exports = {
  name: 'examples-guides',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/examples/guides',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
