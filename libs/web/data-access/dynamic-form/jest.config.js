module.exports = {
  name: 'frontend-data-access-dynamic-form',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/web/data-access/dynamic-form',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
