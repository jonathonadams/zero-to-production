module.exports = {
  name: 'examples-live-demos',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/examples/live-demos',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
