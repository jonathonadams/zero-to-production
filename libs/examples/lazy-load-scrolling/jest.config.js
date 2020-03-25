module.exports = {
  name: 'examples-lazy-load-scrolling',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/examples/lazy-load-scrolling',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
