module.exports = {
  name: 'common-ui-toolbar-menu',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/common/ui/toolbar-menu',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
