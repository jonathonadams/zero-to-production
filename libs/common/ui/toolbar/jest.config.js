module.exports = {
  name: 'common-ui-toolbar',
  preset: '../../../../../jest.config.js',
  coverageDirectory: '../../../../../coverage/libs/common/ui/toolbar',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
