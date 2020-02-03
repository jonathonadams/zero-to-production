module.exports = {
  name: 'shared-data-access-api',
  preset: '../../../../../jest.config.js',
  coverageDirectory: '../../../../../coverage/libs/shared/data-access/api',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
