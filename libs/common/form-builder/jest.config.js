module.exports = {
  name: 'common-form-builder',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/common/form-builder',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
