module.exports = {
  name: 'common-dynamic-form-material-components',
  preset: '../../../jest.config.js',
  coverageDirectory:
    '../../../coverage/libs/common/dynamic-form-material-components',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
