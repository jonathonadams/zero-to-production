module.exports = {
  name: 'frontend-common-ui-toolbar',
  preset: '../../../../../jest.config.js',
  coverageDirectory: '../../../../../coverage/libs/web/common/ui/toolbar',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
