module.exports = {
  name: 'web-common-ui-auth',
  preset: '../../../../../jest.config.js',
  coverageDirectory: '../../../../../coverage/libs/web/common/ui/auth',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
