module.exports = {
  name: 'common-toolbar-menu',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/common/toolbar-menu',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
