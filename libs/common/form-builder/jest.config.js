module.exports = {
  name: 'common-form-builder',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/common/form-builder',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
