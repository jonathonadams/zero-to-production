module.exports = {
  name: 'common-animations',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/common/animations',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
