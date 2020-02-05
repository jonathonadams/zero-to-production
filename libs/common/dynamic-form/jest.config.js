module.exports = {
  name: 'common-dynamic-form',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/common/dynamic-form',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
