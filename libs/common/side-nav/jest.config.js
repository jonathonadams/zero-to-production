module.exports = {
  name: 'common-side-nav',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/common/side-nav',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
