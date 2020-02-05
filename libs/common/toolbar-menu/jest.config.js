module.exports = {
  name: 'common-toolbar-menu',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/common/toolbar-menu',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
