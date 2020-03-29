module.exports = {
  name: 'common-grid',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/common/grid',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
