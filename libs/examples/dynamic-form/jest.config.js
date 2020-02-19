module.exports = {
  name: 'examples-dynamic-form',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/examples/dynamic-form',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
