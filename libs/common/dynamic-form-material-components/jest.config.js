module.exports = {
  name: 'common-dynamic-form-material-components',
  preset: '../../../jest.config.js',
  coverageDirectory:
    '../../../coverage/libs/common/dynamic-form-material-components',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
