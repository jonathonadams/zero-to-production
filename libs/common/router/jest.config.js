module.exports = {
  name: 'common-router',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/common/router',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
