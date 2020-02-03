module.exports = {
  name: 'common-theme',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/common/theme',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
