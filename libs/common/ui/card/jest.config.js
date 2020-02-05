module.exports = {
  name: 'common-ui-card',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/common/ui/card',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
