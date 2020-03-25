module.exports = {
  name: 'examples-form-builder',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/examples/form-builder',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
