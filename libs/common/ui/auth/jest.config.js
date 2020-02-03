module.exports = {
  name: 'common-ui-auth',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/common/ui/auth',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
