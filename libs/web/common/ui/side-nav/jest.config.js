module.exports = {
  name: 'frontend-common-ui-side-nav',
  preset: '../../../../../jest.config.js',
  coverageDirectory: '../../../../../coverage/libs/web/common/ui/side-nav',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
