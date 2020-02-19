module.exports = {
  name: 'shared-data-access-api',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/data-access/api',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
