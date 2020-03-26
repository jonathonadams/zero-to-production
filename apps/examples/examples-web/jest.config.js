module.exports = {
  name: 'examples-web',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/examples/examples-web',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
