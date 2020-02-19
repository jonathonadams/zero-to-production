module.exports = {
  name: 'common-ui-card',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/common/ui/card',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
